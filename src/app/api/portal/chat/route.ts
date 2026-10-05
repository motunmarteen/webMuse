import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import {
  getProjectChatMessages,
  sendChatMessage,
  markChatMessagesRead,
  getProjectById,
  getClientById,
} from '@/lib/server/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
    }

    // If client session, ensure it's their project
    if (clientSession && clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const messages = await getProjectChatMessages(projectId);
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('[Chat API Error - GET]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    if (!clientSession) {
      return NextResponse.json({ error: 'Unauthorized: Client session required' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, message, attachments } = body;

    if (!projectId || !message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Valid projectId and message are required' }, { status: 400 });
    }

    if (clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden project scope' }, { status: 403 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const client = clientSession.clientId ? await getClientById(clientSession.clientId) : null;
    const senderName = client?.name || clientSession.email.split('@')[0];
    const senderRole = client?.company ? `${client.company} Partner` : 'Client Sponsor';

    const newMessage = await sendChatMessage({
      projectId,
      sender: 'client',
      senderName,
      senderRole,
      message: message.trim(),
      attachments,
    });

    // Mark incoming agency messages as read by client
    await markChatMessagesRead(projectId, 'client');

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('[Chat API Error - POST]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
