import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isEmailConfigured, EMAIL_TO } from "@/utils/oqumail";

interface PartnerRegistration {
  name?: string;
  email?: string;
  code?: string;
  payoutDetails?: string;
}

export async function POST(req: NextRequest) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Registration delivery isn't configured yet. Please email hello@webmuse.tech directly." },
      { status: 503 }
    );
  }

  let body: PartnerRegistration;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const code = (body.code || "").trim();
  const payoutDetails = (body.payoutDetails || "").trim();

  if (!name || !email || !code) {
    return NextResponse.json({ error: "Name, email, and referral code are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!/^[a-zA-Z0-9_-]{2,40}$/.test(code)) {
    return NextResponse.json({ error: "Referral code can only contain letters, numbers, - and _." }, { status: 400 });
  }

  const lines = [
    `New WEBMUSE Partners registration`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Referral code: ${code}`,
    `Referral link: https://www.webmuse.tech/?ref=${encodeURIComponent(code)}`,
    ``,
    `Payout details:`,
    payoutDetails || "— not provided yet —",
  ];

  const result = await sendEmail({
    to: EMAIL_TO,
    subject: `New Partners registration: ${name} (${code})`,
    text: lines.join("\n"),
  });

  if (!result.ok) {
    console.error("[partners] oqumail error:", result.error);
    return NextResponse.json({ error: "We couldn't submit your registration. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
