// oqumail transactional email client. hello@webmuse.tech is verified and
// fixed on the API key at creation time — the API only needs to/subject/text.
const OQUMAIL_API_URL = "https://api.oqumail.com/api/v1/emails";

export const EMAIL_FROM = process.env.EMAIL_FROM || "hello@webmuse.tech";
export const EMAIL_TO = process.env.EMAIL_TO || "hello@webmuse.tech";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.OQUMAIL_API_KEY);
}

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  fromName?: string;
}

interface SendEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendEmail({ to, subject, text, fromName }: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.OQUMAIL_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "not configured" };
  }

  try {
    const res = await fetch(OQUMAIL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [to],
        subject,
        text,
        fromName: fromName || "WEBMUSE",
      }),
    });

    if (res.status === 202) {
      return { ok: true };
    }

    const data = await res.json().catch(() => null);
    return { ok: false, error: data?.reason || data?.error || `oqumail responded with ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}
