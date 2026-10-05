import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import {
  getProjectReviewPins,
  createReviewPin,
  resolveReviewPin,
  deleteReviewPin,
  getProjectById,
  getClientById,
} from '@/lib/server/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const milestoneId = searchParams.get('milestoneId') || undefined;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (clientSession && clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const pins = await getProjectReviewPins(projectId, milestoneId);
    return NextResponse.json({ success: true, pins });
  } catch (error) {
    console.error('[Staging Pins API Error - GET]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, milestoneId, comment, xPercent, yPercent, viewportWidth, severity } = body;

    if (
      !projectId ||
      !comment ||
      typeof xPercent !== 'number' ||
      typeof yPercent !== 'number' ||
      !viewportWidth
    ) {
      return NextResponse.json(
        { error: 'Missing required pin fields (projectId, comment, xPercent, yPercent, viewportWidth)' },
        { status: 400 }
      );
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Determine author info
    let authorEmail = 'developer@webmuse.dev';
    let authorName = 'WebMuse Engineering';

    if (clientSession) {
      authorEmail = clientSession.email;
      const client = clientSession.clientId ? await getClientById(clientSession.clientId) : null;
      authorName = client?.name || clientSession.email.split('@')[0];
    } else if (adminSession) {
      authorEmail = adminSession.email;
      authorName = 'WebMuse Lead Architect';
    }

    const activeMilestoneId = milestoneId || project.milestones[project.currentPhaseIndex]?.id || 'ms_general';

    const newPin = await createReviewPin({
      projectId,
      milestoneId: activeMilestoneId,
      authorEmail,
      authorName,
      xPercent,
      yPercent,
      viewportWidth,
      comment: comment.trim(),
      severity: severity || 'tweak',
    });

    return NextResponse.json({ success: true, pin: newPin }, { status: 201 });
  } catch (error) {
    console.error('[Staging Pins API Error - POST]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pinId, status } = body;

    if (!pinId || !status || !['open', 'resolved'].includes(status)) {
      return NextResponse.json({ error: 'Valid pinId and status ("open"|"resolved") required' }, { status: 400 });
    }

    const resolverName = adminSession ? 'WebMuse Lead Engineer' : clientSession?.email.split('@')[0] || 'Client User';
    const updated = await resolveReviewPin(pinId, status, resolverName);

    if (!updated) {
      return NextResponse.json({ error: 'Pin not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, pin: updated });
  } catch (error) {
    console.error('[Staging Pins API Error - PATCH]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pinId = searchParams.get('pinId');

    if (!pinId) {
      return NextResponse.json({ error: 'Pin ID required' }, { status: 400 });
    }

    const actorName = adminSession ? adminSession.email : clientSession?.email || 'User';
    const success = await deleteReviewPin(pinId, actorName);

    if (!success) {
      return NextResponse.json({ error: 'Pin not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review pin deleted' });
  } catch (error) {
    console.error('[Staging Pins API Error - DELETE]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
