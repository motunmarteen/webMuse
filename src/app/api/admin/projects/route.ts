import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/session';
import {
  getProjectsWithClients,
  getAgencyStats,
  createFullProject,
} from '@/lib/server/store';

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const projects = await getProjectsWithClients();
    const stats = await getAgencyStats();

    return NextResponse.json({
      success: true,
      projects,
      stats,
      adminEmail: admin.email,
    });
  } catch (error) {
    console.error('[API /api/admin/projects GET] Error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.client?.name || !body.client?.email || !body.client?.company) {
      return NextResponse.json(
        { success: false, error: 'Client name, email, and company are required.' },
        { status: 400 }
      );
    }

    if (!body.project?.title || !body.project?.description) {
      return NextResponse.json(
        { success: false, error: 'Project title and description are required.' },
        { status: 400 }
      );
    }

    const result = await createFullProject(body);

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
    const fullMagicUrl = `${protocol}://${host}/portal/verify?token=${result.rawToken}`;

    return NextResponse.json({
      success: true,
      project: result.project,
      client: result.client,
      rawToken: result.rawToken,
      magicLink: fullMagicUrl,
      message: `Project "${result.project.title}" created successfully and magic link generated.`,
    });
  } catch (error) {
    console.error('[API /api/admin/projects POST] Error:', error);
    return NextResponse.json({ success: false, error: 'CREATION_FAILED' }, { status: 500 });
  }
}
