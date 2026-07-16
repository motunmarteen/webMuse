import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isEmailConfigured, EMAIL_TO } from "@/utils/oqumail";

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

  const result = await sendEmail({
    to: EMAIL_TO,
    subject: `New booking request from ${name} (${body.ticketId || "no ticket id"})`,
    text: lines.join("\n"),
  });

  if (!result.ok) {
    console.error("[booking] oqumail error:", result.error);
    return NextResponse.json({ error: "We couldn't submit your booking. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
