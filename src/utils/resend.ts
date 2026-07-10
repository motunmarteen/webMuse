import { Resend } from "resend";

// Sandbox default: Resend's shared onboarding sender works without a verified
// domain, useful until webmuse.tech + hello@webmuse.tech are live. Once the
// domain is verified in Resend, set EMAIL_FROM to an address on that domain.
const DEFAULT_FROM = "WEBMUSE <onboarding@resend.dev>";

export const EMAIL_FROM = process.env.EMAIL_FROM || DEFAULT_FROM;
export const EMAIL_TO = process.env.EMAIL_TO || "motunmarteen@gmail.com";

let client: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
