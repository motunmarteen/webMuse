import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import { subscribeToMaintenanceRetainer, getProjectById } from '@/lib/server/store';
import type { MaintenanceTier } from '@/lib/types/portal';

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, tier, paymentRef, annualCostUsd, annualCostNgn } = body;

    if (!projectId || !tier) {
      return NextResponse.json({ error: 'Missing projectId or tier' }, { status: 400 });
    }

    if (clientSession && clientSession.projectId && clientSession.projectId !== projectId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const ref = paymentRef || `RETAINER_SETTLE_${Date.now()}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const updated = await subscribeToMaintenanceRetainer(
      projectId,
      tier as MaintenanceTier,
      ref,
      annualCostUsd,
      annualCostNgn
    );

    return NextResponse.json({
      success: true,
      project: updated,
      message: 'Yearly maintenance retainer active and SLA guarantee locked.',
    });
  } catch (error) {
    console.error('[Maintenance Subscribe API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
