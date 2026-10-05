import { NextRequest, NextResponse } from 'next/server';
import { getProjectWarrantyTickets, submitWarrantyTicket, updateWarrantyTicketStatus } from '@/lib/server/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ ok: false, error: 'Missing projectId' }, { status: 400 });
    }

    const tickets = await getProjectWarrantyTickets(projectId);
    return NextResponse.json({ ok: true, data: tickets });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, authorEmail, authorName, title, description, priority } = body;

    if (!projectId || !title || !description) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: projectId, title, description' },
        { status: 400 }
      );
    }

    const ticket = await submitWarrantyTicket({
      projectId,
      authorEmail: authorEmail || 'client@apexlabs.io',
      authorName: authorName || 'Client Owner',
      title,
      description,
      priority: priority || 'medium',
    });

    return NextResponse.json({ ok: true, data: ticket });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketId, status } = body;

    if (!ticketId || !status) {
      return NextResponse.json({ ok: false, error: 'Missing ticketId or status' }, { status: 400 });
    }

    const updated = await updateWarrantyTicketStatus(ticketId, status);
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
