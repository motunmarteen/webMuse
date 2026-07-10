import { NextRequest, NextResponse } from "next/server";
import { getResendClient, isEmailConfigured, EMAIL_FROM, EMAIL_TO } from "@/utils/resend";

interface BookingPayload {
  name?: string;
  email?: string;
  projectType?: string;
  consultationType?: string;
  consultationTitle?: string;
  selectedDate?: string;
  selectedTime?: string;
  platform?: string;
  description?: string;
  ticketId?: string;
}

export async function POST(req: NextRequest) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Booking delivery isn't configured yet. Please email hello@webmuse.tech directly to schedule." },
      { status: 503 }
    );
  }

  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: "Booking delivery isn't configured yet. Please email hello@webmuse.tech directly to schedule." },
      { status: 503 }
    );
  }

  const lines = [
    `New consultation booking request`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${body.projectType || "—"}`,
    `Consultation type: ${body.consultationTitle || body.consultationType || "—"}`,
    `Requested date: ${body.selectedDate || "—"}`,
    `Requested time: ${body.selectedTime || "—"}`,
    `Platform: ${body.platform || "—"}`,
    `Ticket ID: ${body.ticketId || "—"}`,
    ``,
    `Project description:`,
    body.description || "—",
  ];

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `New booking request from ${name} (${body.ticketId || "no ticket id"})`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[booking] resend error:", error);
      return NextResponse.json({ error: "We couldn't submit your booking. Please try again or email us directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[booking] unexpected error:", err);
    return NextResponse.json({ error: "We couldn't submit your booking. Please try again or email us directly." }, { status: 502 });
  }
}
