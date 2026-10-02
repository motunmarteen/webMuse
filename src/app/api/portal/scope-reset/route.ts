import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, upsertProject } from '@/lib/server/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId required' }, { status: 400 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    project.prd.signedOffAt = undefined;
    project.prd.signedOffBy = undefined;
    project.prd.signedOffIp = undefined;
    project.prd.signatureHash = undefined;

    // Reset PRD deliverable if present
    const m1 = project.milestones[0];
    if (m1) {
      const prdDel = m1.deliverables.find(
        (d) => d.id === 'del_02' || d.title.toLowerCase().includes('prd')
      );
      if (prdDel) {
        prdDel.status = 'ready_for_review';
      }
    }

    await upsertProject(project);

    return NextResponse.json({
      success: true,
      prd: project.prd,
      message: 'Scope sign-off reset for demonstration.',
    });
  } catch (error) {
    console.error('[API /api/portal/scope-reset] Error:', error);
    return NextResponse.json({ success: false, error: 'RESET_FAILED' }, { status: 500 });
  }
}
