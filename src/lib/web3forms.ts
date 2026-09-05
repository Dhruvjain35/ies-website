const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "9f893dcc-01bd-4e27-94ed-0c4247683a35";

export type FormStatus = "idle" | "submitting" | "success" | "error";

/** Posts a flat field map to Web3Forms. Returns false on any network or API failure. */
export async function submitToWeb3Forms(
  formData: Record<string, string>,
): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        ...formData,
      }),
    });
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

export const inputClass =
  "w-full bg-transparent border border-border px-4 py-3 text-sm text-arch-white placeholder:text-text-muted focus:border-gold focus:ring-0 focus:outline-none transition-colors duration-200";

export const labelClass =
  "block text-xs font-medium tracking-wider uppercase text-text-secondary mb-2";
