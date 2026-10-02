import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/session';
import {
  getProjectById,
  getClientById,
  getVaultSecrets,
  getActivityLogs,
  overrideMilestone,
  upsertProject,
} from '@/lib/server/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'PROJECT_NOT_FOUND' }, { status: 404 });
    }

    const client = await getClientById(project.clientId);
    const secrets = await getVaultSecrets(project.id, false); // admin sees all secrets
    const activityLogs = await getActivityLogs(project.id);

    return NextResponse.json({
      success: true,
      project,
      client,
      secrets,
      activityLogs,
    });
  } catch (error) {
    console.error('[API /api/admin/projects/[id] GET] Error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    if (body.action === 'override_milestone') {
      const { milestoneId, updates } = body;
      if (!milestoneId || !updates) {
        return NextResponse.json(
          { success: false, error: 'milestoneId and updates are required' },
          { status: 400 }
        );
      }

      const updatedProject = await overrideMilestone(id, milestoneId, updates);
      if (!updatedProject) {
        return NextResponse.json(
          { success: false, error: 'Failed to update milestone' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        project: updatedProject,
        message: 'Milestone override executed successfully.',
      });
    }

    // Generic project update
    const existing = await getProjectById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'PROJECT_NOT_FOUND' }, { status: 404 });
    }

    const updated = await upsertProject({
      ...existing,
      ...body.project,
    });

    return NextResponse.json({
      success: true,
      project: updated,
      message: 'Project updated successfully.',
    });
  } catch (error) {
    console.error('[API /api/admin/projects/[id] PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
