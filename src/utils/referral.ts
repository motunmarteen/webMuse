const STORAGE_KEY = "webmuse_ref";

/**
 * Captures a `?ref=CODE` from the URL on first visit and persists it so it
 * survives navigation to another page before the visitor actually submits
 * a booking. Call once on mount of any page that might be a referral's
 * landing page (currently: homepage, /partners).
 */
export function captureReferralCode(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && /^[a-zA-Z0-9_-]{2,40}$/.test(ref)) {
    window.localStorage.setItem(STORAGE_KEY, ref);
  }
}

export function getStoredReferralCode(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) || "";
}

export function buildReferralLink(code: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://www.webmuse.tech";
  return `${base}/?ref=${encodeURIComponent(code)}`;
}
