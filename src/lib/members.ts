"use client";

/**
 * The browser half of the member account system.
 *
 * An account is a SpacetimeDB identity. The token that proves it lives in this
 * browser's local storage and nowhere else, which is why there is no password
 * to forget and no reset email to wait for, and also why moving to a second
 * device needs the sign-in code that `issueLinkCode` mints.
 *
 * Everything private is read through the `myAccount` procedure rather than a
 * subscription. The module's tables for members and entries are not public, so
 * there is no query a client could write that would return somebody else's row.
 * Only `tally` and `window` are subscribed to, and neither carries a name.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { DbConnection } from "@/module_bindings";
import type { Account, EntryView, Profile } from "@/module_bindings/types";

const HOST = "wss://maincloud.spacetimedb.com";
const TOKEN_KEY = "ies:stdb-token";

const moduleName = process.env.NEXT_PUBLIC_STDB_MODULE;
export const isConfigured = Boolean(moduleName);

export type { Account, EntryView, Profile };

/** Public headcount for one competition. */
export interface Count {
  slug: string;
  entries: number;
  people: number;
}

export type MemberState =
  | { status: "loading" }
  /** No module configured. The member area says so rather than spinning. */
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  /** Connected, but this identity has not joined yet. */
  | { status: "guest" }
  | { status: "member"; profile: Profile; entries: EntryView[] };

// ---------------------------------------------------------------------------
// Connection
//
// One connection per tab, created on first use. The SDK touches `window` on
// import, so the import itself is deferred until we are certainly in a browser.
// ---------------------------------------------------------------------------

let pending: Promise<DbConnection> | null = null;

function connect(): Promise<DbConnection> {
  if (pending) return pending;
  pending = (async () => {
    const { DbConnection } = await import("@/module_bindings");
    return new Promise<DbConnection>((resolve, reject) => {
      let settled = false;
      const saved = window.localStorage.getItem(TOKEN_KEY) ?? undefined;
      DbConnection.builder()
        .withUri(HOST)
        .withDatabaseName(moduleName as string)
        .withToken(saved)
        .onConnect((conn, _identity, token) => {
          try {
            window.localStorage.setItem(TOKEN_KEY, token);
          } catch {
            // A browser refusing storage still gets a working session, it just
            // will not be the same account on the next visit.
          }
          conn
            .subscriptionBuilder()
            .onApplied(() => {
              if (!settled) {
                settled = true;
                resolve(conn);
              }
            })
            .subscribe(["SELECT * FROM tally", "SELECT * FROM window"]);
        })
        .onConnectError((_ctx, err) => {
          pending = null;
          if (!settled) {
            settled = true;
            reject(err);
          }
        })
        .build();
    });
  })();
  return pending;
}

/** Forget this browser's account entirely, locally as well as remotely. */
function dropToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Nothing to do. The next connection will simply reuse the old identity.
  }
  pending = null;
}

/** A rejected reducer or procedure arrives as an Error carrying the module's
 *  own message. Anything else is a network problem, said plainly. */
function reason(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err) return err;
  return "We could not reach the membership database. Check your connection and try again.";
}

/**
 * A procedure returning Rust's `Result` decodes to the tagged sum `{ ok }` or
 * `{ err }`. The SDK's own `ResultBuilder` declares its TypeScript type as the
 * flattened union `Ok | Err` instead, which for `Result<String, String>`
 * collapses to plain `string` and loses the tag. The runtime value is the
 * tagged one, so these calls are cast through `unknown` and read by tag.
 */
type Outcome<T> = { ok: T } | { err: string };

function unwrap<T>(value: Outcome<T>): T {
  if (value && typeof value === "object" && "err" in value) {
    throw new Error(value.err);
  }
  return (value as { ok: T }).ok;
}

// ---------------------------------------------------------------------------
// The hook
// ---------------------------------------------------------------------------

export interface MemberApi {
  state: MemberState;
  counts: Count[];
  /** True while a write is in flight, so buttons can say so. */
  busy: boolean;
  join(input: JoinInput): Promise<void>;
  enroll(input: EnrollInput): Promise<void>;
  withdraw(slug: string): Promise<void>;
  signOut(): Promise<void>;
  issueCode(): Promise<string>;
  redeemCode(code: string): Promise<void>;
  refresh(): Promise<void>;
}

export interface JoinInput {
  name: string;
  email: string;
  institution: string;
  year: string;
  country: string;
  chapter?: string;
  discord?: string;
  interests?: string;
}

export interface EnrollInput {
  slug: string;
  entryType: "individual" | "team";
  teamName?: string;
  teammates?: string[];
  extras?: Record<string, string>;
}

function toState(account: Account): MemberState {
  const profile = account.profile;
  if (!profile) return { status: "guest" };
  return { status: "member", profile, entries: account.entries };
}

export function useMembers(): MemberApi {
  const [state, setState] = useState<MemberState>(
    isConfigured ? { status: "loading" } : { status: "unconfigured" },
  );
  const [counts, setCounts] = useState<Count[]>([]);
  const [busy, setBusy] = useState(false);
  const alive = useRef(true);

  const readCounts = useCallback((conn: DbConnection) => {
    const rows: Count[] = [];
    for (const row of conn.db.tally.iter()) {
      rows.push({
        slug: row.slug,
        entries: Number(row.entries),
        people: Number(row.people),
      });
    }
    rows.sort((a, b) => a.slug.localeCompare(b.slug));
    if (alive.current) setCounts(rows);
  }, []);

  const refresh = useCallback(async () => {
    if (!isConfigured) return;
    try {
      const conn = await connect();
      const account = await conn.procedures.myAccount({});
      if (!alive.current) return;
      setState(toState(account));
      readCounts(conn);
    } catch (err) {
      if (alive.current) setState({ status: "error", message: reason(err) });
    }
  }, [readCounts]);

  useEffect(() => {
    alive.current = true;
    void refresh();
    return () => {
      alive.current = false;
    };
  }, [refresh]);

  /** Every write follows the same shape: run it, then re-read the account,
   *  because the private tables cannot push a change down a subscription. */
  const write = useCallback(
    async (run: (conn: DbConnection) => Promise<void>) => {
      setBusy(true);
      try {
        const conn = await connect();
        await run(conn);
        const account = await conn.procedures.myAccount({});
        if (alive.current) {
          setState(toState(account));
          readCounts(conn);
        }
      } catch (err) {
        throw new Error(reason(err));
      } finally {
        if (alive.current) setBusy(false);
      }
    },
    [readCounts],
  );

  const join = useCallback(
    (input: JoinInput) =>
      write((conn) =>
        conn.reducers.saveMember({
          name: input.name,
          email: input.email,
          institution: input.institution,
          year: input.year,
          country: input.country,
          chapter: input.chapter ?? "",
          discord: input.discord ?? "",
          interests: input.interests ?? "",
        }),
      ),
    [write],
  );

  const enroll = useCallback(
    (input: EnrollInput) =>
      write((conn) => {
        const extras = Object.entries(input.extras ?? {}).filter(
          ([, v]) => v.trim() !== "",
        );
        return conn.reducers.enroll({
          slug: input.slug,
          entryType: input.entryType,
          teamName: input.teamName ?? "",
          teammates: (input.teammates ?? []).map((t) => t.trim()).filter(Boolean),
          extraKeys: extras.map(([k]) => k),
          extraValues: extras.map(([, v]) => v.trim()),
        });
      }),
    [write],
  );

  const withdraw = useCallback(
    (slug: string) => write((conn) => conn.reducers.withdraw({ slug })),
    [write],
  );

  const signOut = useCallback(async () => {
    await write((conn) => conn.reducers.forgetMe({}));
    dropToken();
    if (alive.current) setState({ status: "loading" });
    await refresh();
  }, [write, refresh]);

  const issueCode = useCallback(async () => {
    setBusy(true);
    try {
      const conn = await connect();
      return unwrap<string>(
        (await conn.procedures.issueLinkCode({})) as unknown as Outcome<string>,
      );
    } catch (err) {
      throw new Error(reason(err));
    } finally {
      if (alive.current) setBusy(false);
    }
  }, []);

  const redeemCode = useCallback(
    async (code: string) => {
      setBusy(true);
      try {
        const conn = await connect();
        unwrap<void>(
          (await conn.procedures.redeemLinkCode({
            code,
          })) as unknown as Outcome<void>,
        );
        const account = await conn.procedures.myAccount({});
        if (alive.current) setState(toState(account));
      } catch (err) {
        throw new Error(reason(err));
      } finally {
        if (alive.current) setBusy(false);
      }
    },
    [],
  );

  return {
    state,
    counts,
    busy,
    join,
    enroll,
    withdraw,
    signOut,
    issueCode,
    redeemCode,
    refresh,
  };
}

/** Find a member's entry for one competition, if they have one. */
export function entryFor(
  state: MemberState,
  slug: string,
): EntryView | undefined {
  if (state.status !== "member") return undefined;
  return state.entries.find((e) => e.slug === slug);
}

/** Turn an entry's parallel answer arrays back into an object. */
export function extrasOf(entry: EntryView | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!entry) return out;
  entry.extraKeys.forEach((key, i) => {
    out[key] = entry.extraValues[i] ?? "";
  });
  return out;
}
