import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import { getProjectById, signOffPRDScope } from '@/lib/server/store';

export async function POST(req: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();
    const session = clientSession || adminSession;

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED: Valid session required for scope sign-off.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { projectId, signerName } = body;

    if (!projectId || !signerName?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Project ID and Signer Name are required.' },
        { status: 400 }
      );
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project workspace not found.' },
        { status: 404 }
      );
    }

    // Security check: client session must belong to this project
    if (clientSession && clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'FORBIDDEN: Session not authorized for this project scope.' },
        { status: 403 }
      );
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const updatedProject = await signOffPRDScope(
      projectId,
      signerName.trim(),
      session.email,
      clientIp
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Failed to record digital scope sign-off.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
      prd: updatedProject.prd,
      message: `Scope v${updatedProject.prd.version} successfully signed and cryptographically baseline-locked.`,
    });
  } catch (error) {
    console.error('[API /api/portal/scope-signoff] Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR: Unable to sign off scope.' },
      { status: 500 }
    );
  }
}
