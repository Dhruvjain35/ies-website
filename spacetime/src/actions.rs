//! Everything that changes an account: joining, entering, withdrawing, and
//! moving an account between devices.
//!
//! Mutations are reducers, which is what reducers are for. The two calls that
//! have to hand a value back to one caller and no one else are procedures,
//! because a private table cannot be read from a subscription.

use spacetimedb::rand::Rng;
use spacetimedb::{ProcedureContext, ReducerContext, Table, Timestamp};

use crate::{
    // The `#[table(accessor = ..)]` macro generates a trait per table, named for
    // the accessor. Calling `ctx.db.member()` from another module needs it in scope.
    entry, link_code, member, tally,
    clip, cycle, email_looks_real, entry_key, Entry, LinkCode, Member, Tally, CODE_ALPHABET,
    CODE_LEN, LINK_CODE_TTL_MICROS, MAX_EMAIL, MAX_EXTRAS, MAX_LONG, MAX_NAME, MAX_SHORT,
    MAX_TEAMMATES,
};

// ---------------------------------------------------------------------------
// Membership
// ---------------------------------------------------------------------------

/// Create the caller's membership, or edit it if they already have one. The
/// site calls this for both, because from the member's side the difference does
/// not deserve a second screen.
#[spacetimedb::reducer]
pub fn save_member(
    ctx: &ReducerContext,
    name: String,
    email: String,
    institution: String,
    year: String,
    country: String,
    chapter: String,
    discord: String,
    interests: String,
) -> Result<(), String> {
    let name = clip(&name, MAX_NAME);
    let email = clip(&email, MAX_EMAIL).to_lowercase();

    if name.is_empty() {
        return Err("Your name is needed.".to_string());
    }
    if !email_looks_real(&email) {
        return Err("That email address does not look right.".to_string());
    }

    // One address, one account. An address held by a different identity is a
    // collision; the same identity saving again is just an edit.
    if let Some(other) = ctx.db.member().email().find(email.clone()) {
        if other.identity != ctx.sender() {
            return Err(
                "That email is already registered. Use a sign-in code from your other device."
                    .to_string(),
            );
        }
    }

    let existing = ctx.db.member().identity().find(ctx.sender());
    let row = Member {
        identity: ctx.sender(),
        // Zero asks the database to allocate the next number. On an edit the
        // member keeps the one they were given.
        member_no: existing.as_ref().map(|m| m.member_no).unwrap_or(0),
        email,
        name,
        institution: clip(&institution, MAX_SHORT),
        year: clip(&year, MAX_SHORT),
        country: clip(&country, MAX_SHORT),
        chapter: clip(&chapter, MAX_SHORT),
        discord: clip(&discord, MAX_SHORT),
        interests: clip(&interests, MAX_LONG),
        joined_at: existing
            .as_ref()
            .map(|m| m.joined_at)
            .unwrap_or(ctx.timestamp),
        updated_at: ctx.timestamp,
    };

    if existing.is_some() {
        ctx.db.member().identity().update(row);
    } else {
        ctx.db.member().insert(row);
    }
    Ok(())
}

/// Delete the caller's membership and every entry attached to it. Irreversible,
/// and the only way to hand a device back to a clean state.
#[spacetimedb::reducer]
pub fn forget_me(ctx: &ReducerContext) -> Result<(), String> {
    let slugs: Vec<String> = ctx
        .db
        .entry()
        .identity()
        .filter(ctx.sender())
        .map(|e| e.slug)
        .collect();
    for slug in slugs {
        remove_entry(ctx, &slug);
    }
    let codes: Vec<String> = ctx
        .db
        .link_code()
        .identity()
        .filter(ctx.sender())
        .map(|c| c.code)
        .collect();
    for code in codes {
        ctx.db.link_code().code().delete(code);
    }
    if ctx.db.member().identity().find(ctx.sender()).is_some() {
        ctx.db.member().identity().delete(ctx.sender());
    }
    Ok(())
}

// ---------------------------------------------------------------------------
// Entries
// ---------------------------------------------------------------------------

/// Enter a competition, or amend an entry already made. Refuses outside the
/// registration window whatever the browser believes the date to be.
#[spacetimedb::reducer]
pub fn enroll(
    ctx: &ReducerContext,
    slug: String,
    entry_type: String,
    team_name: String,
    teammates: Vec<String>,
    extra_keys: Vec<String>,
    extra_values: Vec<String>,
) -> Result<(), String> {
    let c = cycle(&slug).ok_or_else(|| format!("No competition called {slug}."))?;

    if ctx.db.member().identity().find(ctx.sender()).is_none() {
        return Err("Join IES before entering a competition.".to_string());
    }

    let now = ctx.timestamp.to_micros_since_unix_epoch();
    if now < c.opens_at {
        return Err("Registration for this competition has not opened yet.".to_string());
    }
    if now >= c.closes_at {
        return Err("Registration for this competition has closed.".to_string());
    }

    let is_team = entry_type == "team";
    let teammates: Vec<String> = if is_team {
        teammates
            .iter()
            .map(|t| clip(t, MAX_NAME))
            .filter(|t| !t.is_empty())
            .take(MAX_TEAMMATES)
            .collect()
    } else {
        Vec::new()
    };
    let team_name = if is_team {
        clip(&team_name, MAX_NAME)
    } else {
        String::new()
    };

    if is_team {
        if team_name.is_empty() {
            return Err("A team needs a name.".to_string());
        }
        if teammates.is_empty() {
            return Err("A team needs at least one other member.".to_string());
        }
        // The GRP is written alone or in a pair. The EPR takes up to four, which
        // is what the shared ceiling allows.
        if slug == "grp" && teammates.len() > 1 {
            return Err("The Global Research Paper is written alone or in a pair.".to_string());
        }
        if slug == "gec" {
            return Err("The Global Economics Challenge is sat individually.".to_string());
        }
    }

    if extra_keys.len() != extra_values.len() {
        return Err("Those answers did not arrive in one piece. Try again.".to_string());
    }
    let extra_keys: Vec<String> = extra_keys
        .iter()
        .take(MAX_EXTRAS)
        .map(|k| clip(k, MAX_SHORT))
        .collect();
    let extra_values: Vec<String> = extra_values
        .iter()
        .take(MAX_EXTRAS)
        .map(|v| clip(v, MAX_LONG))
        .collect();

    let key = entry_key(&slug, &ctx.sender());
    let existing = ctx.db.entry().key().find(key.clone());
    let people_before = existing
        .as_ref()
        .map(|e| 1 + e.teammates.len() as i64)
        .unwrap_or(0);
    let people_after = 1 + teammates.len() as i64;

    let row = Entry {
        id: existing.as_ref().map(|e| e.id).unwrap_or(0),
        key,
        identity: ctx.sender(),
        slug: slug.clone(),
        entry_type: if is_team { "team" } else { "individual" }.to_string(),
        team_name,
        teammates,
        extra_keys,
        extra_values,
        created_at: existing
            .as_ref()
            .map(|e| e.created_at)
            .unwrap_or(ctx.timestamp),
        updated_at: ctx.timestamp,
    };

    if existing.is_some() {
        ctx.db.entry().id().update(row);
        bump_tally(ctx, &slug, 0, people_after - people_before);
    } else {
        ctx.db.entry().insert(row);
        bump_tally(ctx, &slug, 1, people_after);
    }
    Ok(())
}

/// Take an entry back. Allowed right up to the moment entries close, and never
/// after, so a withdrawal cannot be used to dodge a judged result.
#[spacetimedb::reducer]
pub fn withdraw(ctx: &ReducerContext, slug: String) -> Result<(), String> {
    let c = cycle(&slug).ok_or_else(|| format!("No competition called {slug}."))?;
    if ctx.timestamp.to_micros_since_unix_epoch() >= c.closes_at {
        return Err("Entries are closed, so this one can no longer be withdrawn.".to_string());
    }
    if ctx
        .db
        .entry()
        .key()
        .find(entry_key(&slug, &ctx.sender()))
        .is_none()
    {
        return Err("You are not entered in that competition.".to_string());
    }
    remove_entry(ctx, &slug);
    Ok(())
}

/// Delete the caller's entry for `slug` and correct the public tally.
fn remove_entry(ctx: &ReducerContext, slug: &str) {
    let key = entry_key(slug, &ctx.sender());
    if let Some(existing) = ctx.db.entry().key().find(key.clone()) {
        let people = 1 + existing.teammates.len() as i64;
        ctx.db.entry().key().delete(key);
        bump_tally(ctx, slug, -1, -people);
    }
}

/// Move the public counters, never below zero.
fn bump_tally(ctx: &ReducerContext, slug: &str, entries: i64, people: i64) {
    let current = ctx.db.tally().slug().find(slug.to_string());
    let (e, p) = current
        .as_ref()
        .map(|t| (t.entries as i64, t.people as i64))
        .unwrap_or((0, 0));
    let row = Tally {
        slug: slug.to_string(),
        entries: (e + entries).max(0) as u64,
        people: (p + people).max(0) as u64,
    };
    if current.is_some() {
        ctx.db.tally().slug().update(row);
    } else {
        ctx.db.tally().insert(row);
    }
}

// ---------------------------------------------------------------------------
// Moving an account between devices
//
// An account lives in a token in one browser's storage. Rather than ask for a
// password the society would then have to keep safe, a signed-in member mints a
// short-lived code and types it into the other device, which adopts the account
// outright. Both calls are procedures: one has to return the code to exactly
// one person, and the other has to report success to the device that asked.
// ---------------------------------------------------------------------------

/// Mint a fresh sign-in code for the caller, retiring any previous one.
/// Returns the code and the instant it stops working.
#[spacetimedb::procedure]
pub fn issue_link_code(ctx: &mut ProcedureContext) -> Result<String, String> {
    let me = ctx.sender();
    let expires_at = Timestamp::from_micros_since_unix_epoch(
        ctx.timestamp.to_micros_since_unix_epoch() + LINK_CODE_TTL_MICROS,
    );
    let created_at = ctx.timestamp;

    // Drawn out here rather than inside the transaction: `with_tx` may run its
    // body twice to retry a commit, and a body that draws new randomness each
    // time would not be the idempotent closure it is required to be.
    let candidates: Vec<String> = (0..8)
        .map(|_| {
            (0..CODE_LEN)
                .map(|_| {
                    let i = ctx.rng().gen_range(0..CODE_ALPHABET.len());
                    CODE_ALPHABET[i] as char
                })
                .collect::<String>()
        })
        .collect();

    ctx.try_with_tx(|tx| {
        if tx.db.member().identity().find(me).is_none() {
            return Err("Only a member can move an account.".to_string());
        }
        let old: Vec<String> = tx
            .db
            .link_code()
            .identity()
            .filter(me)
            .map(|c| c.code)
            .collect();
        for code in old {
            tx.db.link_code().code().delete(code);
        }

        // The alphabet is small enough that a collision, while unlikely, is not
        // impossible, so take the first candidate nobody is already holding.
        let code = candidates
            .iter()
            .find(|c| tx.db.link_code().code().find((*c).clone()).is_none())
            .cloned()
            .ok_or_else(|| "Could not mint a code. Try again.".to_string())?;

        tx.db.link_code().insert(LinkCode {
            code: code.clone(),
            identity: me,
            created_at,
            expires_at,
        });
        Ok(code)
    })
}

/// Adopt the account a code belongs to. The membership row and every entry are
/// rewritten onto the calling identity, and the code is spent.
#[spacetimedb::procedure]
pub fn redeem_link_code(ctx: &mut ProcedureContext, code: String) -> Result<(), String> {
    let me = ctx.sender();
    let code = code.trim().to_uppercase();
    let now = ctx.timestamp.to_micros_since_unix_epoch();
    let stamp = ctx.timestamp;

    ctx.try_with_tx(|tx| {
        let found = tx
            .db
            .link_code()
            .code()
            .find(code.clone())
            .ok_or_else(|| "That code is not valid.".to_string())?;

        if now > found.expires_at.to_micros_since_unix_epoch() {
            tx.db.link_code().code().delete(code.clone());
            return Err("That code has expired. Generate a fresh one.".to_string());
        }
        if found.identity == me {
            tx.db.link_code().code().delete(code.clone());
            return Err("You are already signed in to that account here.".to_string());
        }
        if tx.db.member().identity().find(me).is_some() {
            return Err(
                "This device already has an account. Sign out of it first, then use the code."
                    .to_string(),
            );
        }

        let old = tx
            .db
            .member()
            .identity()
            .find(found.identity)
            .ok_or_else(|| "The account behind that code no longer exists.".to_string())?;

        // Identity is the primary key, so moving an account means deleting the
        // row and writing it back under the new one, member number and all.
        tx.db.member().identity().delete(found.identity);
        tx.db.member().insert(Member {
            identity: me,
            member_no: old.member_no,
            email: old.email,
            name: old.name,
            institution: old.institution,
            year: old.year,
            country: old.country,
            chapter: old.chapter,
            discord: old.discord,
            interests: old.interests,
            joined_at: old.joined_at,
            updated_at: stamp,
        });

        let entries: Vec<Entry> = tx.db.entry().identity().filter(found.identity).collect();
        for e in entries {
            tx.db.entry().id().update(Entry {
                key: entry_key(&e.slug, &me),
                identity: me,
                ..e
            });
        }

        tx.db.link_code().code().delete(code.clone());
        Ok(())
    })
}
