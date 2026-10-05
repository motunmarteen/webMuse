import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/session';
import { sendChatMessage, markChatMessagesRead, getProjectById } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    const adminSession = await getAdminSession();
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized: Agency Admin session required' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, message, attachments, senderName, senderRole } = body;

    if (!projectId || !message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Valid projectId and message are required' }, { status: 400 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const newMessage = await sendChatMessage({
      projectId,
      sender: 'agency',
      senderName: senderName || 'Marteen Mubaraq',
      senderRole: senderRole || 'WebMuse Lead Architect',
      message: message.trim(),
      attachments,
    });

    // Mark client messages as read by agency
    await markChatMessagesRead(projectId, 'agency');

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('[Admin Chat API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
