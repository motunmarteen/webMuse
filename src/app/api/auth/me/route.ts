import { NextResponse } from 'next/server';
import { getClientSession } from '@/lib/server/session';
import { getProjectById, getClientById } from '@/lib/server/store';

export async function GET() {
  try {
    const session = await getClientSession();
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const [client, project] = await Promise.all([
      session.clientId ? getClientById(session.clientId) : null,
      session.projectId ? getProjectById(session.projectId) : null,
    ]);

    return NextResponse.json({
      authenticated: true,
      session,
      client,
      project: project
        ? {
            id: project.id,
            title: project.title,
            slug: project.slug,
            tagline: project.tagline,
            currentPhaseIndex: project.currentPhaseIndex,
            status: project.status,
          }
        : null,
    });
  } catch (error) {
    console.error('[API /api/auth/me] Error:', error);
    return NextResponse.json({ authenticated: false, error: 'SESSION_ERROR' }, { status: 500 });
  }
}
