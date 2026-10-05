import { NextRequest, NextResponse } from 'next/server';
import { getClientSession } from '@/lib/server/session';
import { reportEmergencyIncident, getProjectById } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    if (!clientSession) {
      return NextResponse.json({ error: 'Unauthorized: Client session required' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, title, description, severity } = body;

    if (!projectId || !title || !description) {
      return NextResponse.json({ error: 'Missing required incident fields' }, { status: 400 });
    }

    if (clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const incident = await reportEmergencyIncident({
      projectId,
      reportedBy: clientSession.email,
      title: title.trim(),
      description: description.trim(),
      severity: severity || 'high',
    });

    return NextResponse.json({
      success: true,
      incident,
      message: 'Critical incident dispatched. On-call leads paged and logged in active telemetry.',
    }, { status: 201 });
  } catch (error) {
    console.error('[Incident API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
