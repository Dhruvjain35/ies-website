//! IES members.
//!
//! SpacetimeDB is the whole account system for the International Economic
//! Society site. A member is an identity, a profile row, and a set of entries
//! across the three competitions. Both the site and the module hold the dates,
//! and the module has the final say: a browser can be stale, cached, or lying,
//! and `enroll` still refuses outside the window.
//!
//! # Why nothing here is a public table
//!
//! A SpacetimeDB table marked `public` is readable by any client that
//! subscribes to it. Row-level security would normally narrow that to the rows
//! you own, but as of 2.4.1 the `client_visibility_filter` macro is still
//! feature-gated and carries `RLS filters are currently unimplemented, and are
//! not enforced` in its own source. Declaring these tables public with a filter
//! would look private and read every member's email address to anyone who
//! opened a socket.
//!
//! So `member`, `entry` and `link_code` are private. They are unreachable from
//! a subscription at all, and the only way in is `my_account`, a procedure
//! whose return value goes to the calling client and nowhere else. It reads
//! rows belonging to `ctx.sender()` and cannot be asked for anyone else's.
//!
//! `window` and `tally` stay public because they are meant to be: the schedule
//! and a headcount, with no name attached to either.

use spacetimedb::{Identity, ProcedureContext, ReducerContext, SpacetimeType, Table, Timestamp};

mod actions;

// ---------------------------------------------------------------------------
// The cycle
//
// Mirrors of the three windows in `src/lib/competition.ts`. They are written as
// microseconds since the Unix epoch because that is what `Timestamp` stores,
// and because an integer literal cannot drift the way a re-parsed date string
// can. `npm run check:windows` fails if these stop matching the TypeScript
// catalogue, so the two can only move together.
// ---------------------------------------------------------------------------

pub(crate) struct Cycle {
    pub slug: &'static str,
    pub opens_at: i64,
    pub closes_at: i64,
    pub ends_at: i64,
}

pub(crate) const CYCLES: &[Cycle] = &[
    Cycle {
        slug: "gec",
        opens_at: 1788271200000000,
        closes_at: 1795327140000000,
        ends_at: 1796623140000000,
    },
    Cycle {
        slug: "epr",
        opens_at: 1789221600000000,
        closes_at: 1791089940000000,
        ends_at: 1792299540000000,
    },
    Cycle {
        slug: "grp",
        opens_at: 1791208800000000,
        closes_at: 1800165540000000,
        ends_at: 1803794340000000,
    },
];

pub(crate) fn cycle(slug: &str) -> Option<&'static Cycle> {
    CYCLES.iter().find(|c| c.slug == slug)
}

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

/// One person. The identity is the account; everything else is what they told
/// us and can change whenever they like. Private: see the module docs.
#[spacetimedb::table(accessor = member)]
pub struct Member {
    #[primary_key]
    pub identity: Identity,
    /// Membership number, handed out in order of joining.
    #[unique]
    #[auto_inc]
    pub member_no: u64,
    /// Lower-cased. Unique across the society, so one address is one account.
    #[unique]
    pub email: String,
    pub name: String,
    pub institution: String,
    pub year: String,
    pub country: String,
    pub chapter: String,
    pub discord: String,
    pub interests: String,
    pub joined_at: Timestamp,
    pub updated_at: Timestamp,
}

/// One member's entry into one competition. Private: see the module docs.
#[spacetimedb::table(accessor = entry)]
pub struct Entry {
    #[primary_key]
    #[auto_inc]
    pub id: u64,
    /// `"<slug>:<identity hex>"`. Puts the one-entry-per-competition rule in the
    /// schema itself rather than in a check somebody could forget to write.
    #[unique]
    pub key: String,
    #[index(btree)]
    pub identity: Identity,
    #[index(btree)]
    pub slug: String,
    /// `"individual"` or `"team"`.
    pub entry_type: String,
    pub team_name: String,
    pub teammates: Vec<String>,
    /// Per-competition answers, held as two parallel arrays so that adding a
    /// question to a competition never needs a schema change. Index `i` of
    /// `extra_keys` pairs with index `i` of `extra_values`.
    pub extra_keys: Vec<String>,
    pub extra_values: Vec<String>,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
}

/// A short code that moves an account onto another device. One live code per
/// member; issuing a new one retires the old. Private: see the module docs.
#[spacetimedb::table(accessor = link_code)]
pub struct LinkCode {
    #[primary_key]
    pub code: String,
    #[index(btree)]
    pub identity: Identity,
    pub created_at: Timestamp,
    pub expires_at: Timestamp,
}

/// Headcount per competition. Public on purpose: the site shows how many have
/// entered, and no row here says who any of them are.
#[spacetimedb::table(accessor = tally, public)]
pub struct Tally {
    #[primary_key]
    pub slug: String,
    /// Number of entries, where a team counts once.
    pub entries: u64,
    /// Number of people, counting every named teammate.
    pub people: u64,
}

/// The authoritative window for each competition. Public so the site can show
/// the server's schedule rather than trusting the visitor's clock.
#[spacetimedb::table(accessor = window, public)]
pub struct Window {
    #[primary_key]
    pub slug: String,
    pub opens_at: Timestamp,
    pub closes_at: Timestamp,
    pub ends_at: Timestamp,
}

// ---------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------

pub(crate) const MAX_NAME: usize = 120;
pub(crate) const MAX_EMAIL: usize = 200;
pub(crate) const MAX_SHORT: usize = 200;
pub(crate) const MAX_LONG: usize = 1200;
pub(crate) const MAX_TEAMMATES: usize = 3;
pub(crate) const MAX_EXTRAS: usize = 8;
pub(crate) const LINK_CODE_TTL_MICROS: i64 = 15 * 60 * 1_000_000;

/// Unambiguous read aloud or written down: no I, O, 0 or 1.
pub(crate) const CODE_ALPHABET: &[u8] = b"ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
pub(crate) const CODE_LEN: usize = 8;

pub(crate) fn clip(value: &str, max: usize) -> String {
    let trimmed = value.trim();
    if trimmed.chars().count() <= max {
        return trimmed.to_string();
    }
    trimmed.chars().take(max).collect()
}

/// Deliberately loose. The address only has to be a plausible mailbox. The
/// authority on whether it works is whether the mail arrives.
pub(crate) fn email_looks_real(email: &str) -> bool {
    let at = match email.find('@') {
        Some(i) => i,
        None => return false,
    };
    let (local, rest) = email.split_at(at);
    let domain = &rest[1..];
    !local.is_empty()
        && domain.len() >= 3
        && domain.contains('.')
        && !domain.starts_with('.')
        && !domain.ends_with('.')
        && !email.contains(' ')
}

pub(crate) fn entry_key(slug: &str, identity: &Identity) -> String {
    format!("{}:{}", slug, identity.to_hex())
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

#[spacetimedb::reducer(init)]
pub fn init(ctx: &ReducerContext) {
    for c in CYCLES {
        ctx.db.window().insert(Window {
            slug: c.slug.to_string(),
            opens_at: Timestamp::from_micros_since_unix_epoch(c.opens_at),
            closes_at: Timestamp::from_micros_since_unix_epoch(c.closes_at),
            ends_at: Timestamp::from_micros_since_unix_epoch(c.ends_at),
        });
        ctx.db.tally().insert(Tally {
            slug: c.slug.to_string(),
            entries: 0,
            people: 0,
        });
    }
    log::info!("ies members: ready with {} cycles", CYCLES.len());
}

#[spacetimedb::reducer(client_connected)]
pub fn identity_connected(_ctx: &ReducerContext) {}

#[spacetimedb::reducer(client_disconnected)]
pub fn identity_disconnected(_ctx: &ReducerContext) {}

// ---------------------------------------------------------------------------
// The one read path
// ---------------------------------------------------------------------------

/// One competition entry, as the owner sees it.
#[derive(SpacetimeType)]
pub struct EntryView {
    pub slug: String,
    pub entry_type: String,
    pub team_name: String,
    pub teammates: Vec<String>,
    pub extra_keys: Vec<String>,
    pub extra_values: Vec<String>,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
}

/// The profile half of an account.
#[derive(SpacetimeType)]
pub struct Profile {
    pub member_no: u64,
    pub name: String,
    pub email: String,
    pub institution: String,
    pub year: String,
    pub country: String,
    pub chapter: String,
    pub discord: String,
    pub interests: String,
    pub joined_at: Timestamp,
}

/// Everything the signed-in member is allowed to see, which is their own
/// account and nothing else. `profile` is `None` for a visitor who has a
/// connection but has not joined yet.
#[derive(SpacetimeType)]
pub struct Account {
    pub profile: Option<Profile>,
    pub entries: Vec<EntryView>,
}

/// Read the caller's own account.
///
/// This is a procedure rather than a subscription because its result is sent
/// only to the client that asked. There is no argument for whose account to
/// fetch, so there is no version of this call that returns somebody else's.
#[spacetimedb::procedure]
pub fn my_account(ctx: &mut ProcedureContext) -> Account {
    let me = ctx.sender();
    ctx.with_tx(|tx| {
        let profile = tx.db.member().identity().find(me).map(|m| Profile {
            member_no: m.member_no,
            name: m.name,
            email: m.email,
            institution: m.institution,
            year: m.year,
            country: m.country,
            chapter: m.chapter,
            discord: m.discord,
            interests: m.interests,
            joined_at: m.joined_at,
        });

        let mut entries: Vec<EntryView> = tx
            .db
            .entry()
            .identity()
            .filter(me)
            .map(|e| EntryView {
                slug: e.slug,
                entry_type: e.entry_type,
                team_name: e.team_name,
                teammates: e.teammates,
                extra_keys: e.extra_keys,
                extra_values: e.extra_values,
                created_at: e.created_at,
                updated_at: e.updated_at,
            })
            .collect();
        entries.sort_by(|a, b| a.slug.cmp(&b.slug));

        Account { profile, entries }
    })
}
