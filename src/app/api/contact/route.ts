import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isEmailConfigured, EMAIL_TO } from "@/utils/oqumail";

export async function POST(req: NextRequest) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please reach us directly at hello@webmuse.tech." },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; message?: string; referralCode?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const referralCode = (body.referralCode || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const result = await sendEmail({
    to: EMAIL_TO,
    subject: `New contact form message from ${name}`,
    text: `From: ${name} <${email}>\nReferral code: ${referralCode || "—"}\n\n${message}`,
  });

  if (!result.ok) {
    console.error("[contact] oqumail error:", result.error);
    return NextResponse.json({ error: "We couldn't send your message. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
