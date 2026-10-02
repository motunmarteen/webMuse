import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, setClientSession } from '@/lib/server/session';
import { getProjectById, getClientById } from '@/lib/server/store';

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ success: false, error: 'PROJECT_NOT_FOUND' }, { status: 404 });
    }

    const client = await getClientById(project.clientId);
    if (!client) {
      return NextResponse.json({ success: false, error: 'CLIENT_NOT_FOUND' }, { status: 404 });
    }

    // Set client session cookie to impersonate the client view
    await setClientSession(client, project);

    return NextResponse.json({
      success: true,
      redirectUrl: `/portal/${project.slug}`,
      message: `Impersonation established as ${client.name} (${client.email}).`,
    });
  } catch (error) {
    console.error('[API /api/admin/impersonate] Error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
