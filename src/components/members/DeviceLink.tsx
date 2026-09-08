"use client";

/**
 * Moving an account to a second device.
 *
 * There is no password on an IES membership. The account is a key held in this
 * browser, which is why joining takes seven questions and no confirmation
 * email. The cost of that choice is that another device has no way to prove it
 * is you, so a signed-in member mints a code here and types it in over there.
 *
 * The code lasts fifteen minutes and can be spent once.
 */

import { useState } from "react";

export function IssueCode({
  issueCode,
  busy,
}: {
  issueCode: () => Promise<string>;
  busy: boolean;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="border border-border p-6">
      <h3 className="text-sm font-bold text-arch-white">Sign in on another device</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        Your membership lives in this browser. To pick it up on a phone or a
        school computer, generate a code and enter it there within fifteen
        minutes.
      </p>

      {code ? (
        <div className="mt-5">
          <p className="font-serif text-3xl font-bold text-gold tracking-[0.3em] tabular-nums">
            {code}
          </p>
          <p className="mt-3 text-xs text-text-muted">
            Good for fifteen minutes, and once only. Open this page on the other
            device and choose &quot;I already have a membership&quot;.
          </p>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setError("");
            try {
              setCode(await issueCode());
            } catch (err) {
              setError(err instanceof Error ? err.message : "Something went wrong.");
            }
          }}
          className="mt-5 px-6 py-3 text-sm font-bold text-arch-white border border-gold/50 hover:bg-gold hover:text-obsidian transition-colors disabled:opacity-50"
        >
          {busy ? "Working..." : "Generate a code"}
        </button>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export function RedeemCode({
  redeemCode,
  busy,
}: {
  redeemCode: (code: string) => Promise<void>;
  busy: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-text-secondary hover:text-arch-white underline underline-offset-4 decoration-border hover:decoration-gold transition-colors"
      >
        I already have a membership
      </button>
    );
  }

  return (
    <form
      className="step-in"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        try {
          await redeemCode(value);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      }}
    >
      <label
        htmlFor="link-code"
        className="block text-xs font-medium tracking-wider uppercase text-text-secondary mb-2"
      >
        Sign-in code
      </label>
      <p className="mb-3 text-xs text-text-muted leading-relaxed">
        Generate this on the device where you are already signed in, under
        &quot;Sign in on another device&quot;.
      </p>
      <div className="flex flex-wrap gap-3">
        <input
          id="link-code"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          maxLength={8}
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="ABCD2345"
          className="flex-1 min-w-48 bg-transparent border border-border px-4 py-3 text-sm tracking-[0.3em] text-arch-white placeholder:text-text-muted placeholder:tracking-normal focus:border-gold focus:outline-none focus:ring-0 transition-colors"
        />
        <button
          type="submit"
          disabled={busy || value.trim().length < 4}
          className="px-6 py-3 text-sm font-bold text-obsidian bg-gold hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Checking..." : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-3 text-sm text-text-muted hover:text-arch-white transition-colors"
        >
          Cancel
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </form>
  );
}
