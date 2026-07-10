import { NextRequest, NextResponse } from "next/server";
import { getResendClient, isEmailConfigured, EMAIL_FROM, EMAIL_TO } from "@/utils/resend";

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

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: "Newsletter signup isn't available yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New newsletter signup: ${email}`,
      text: `New newsletter subscriber: ${email}`,
    });

    if (error) {
      console.error("[newsletter] resend error:", error);
      return NextResponse.json({ error: "We couldn't complete your signup. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] unexpected error:", err);
    return NextResponse.json({ error: "We couldn't complete your signup. Please try again." }, { status: 502 });
  }
}
