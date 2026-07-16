import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isEmailConfigured, EMAIL_TO } from "@/utils/oqumail";

export async function POST(req: NextRequest) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Newsletter signup isn't available yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const result = await sendEmail({
    to: EMAIL_TO,
    subject: `New newsletter signup: ${email}`,
    text: `New newsletter subscriber: ${email}`,
  });

  if (!result.ok) {
    console.error("[newsletter] oqumail error:", result.error);
    return NextResponse.json({ error: "We couldn't complete your signup. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
