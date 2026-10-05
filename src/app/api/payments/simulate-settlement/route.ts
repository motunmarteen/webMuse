import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import { getProjectById, confirmPaymentAndUnlockMilestone } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, milestoneId, gateway, currency, txHashOrRef } = body;

    if (!projectId || !milestoneId) {
      return NextResponse.json({ error: 'Missing projectId or milestoneId' }, { status: 400 });
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const milestone = project.milestones.find((m) => m.id === milestoneId);
    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    const payerEmail = clientSession?.email || adminSession?.email || 'client@webmuse.tech';
    const chosenCurrency = currency || (gateway === 'nowpayments' ? 'USDT' : gateway === 'paystack' ? 'NGN' : 'USD');
    const amount = chosenCurrency === 'NGN' ? milestone.costNgn : milestone.costUsd;

    const ref =
      txHashOrRef ||
      (gateway === 'nowpayments'
        ? `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
        : `PAYSTACK_REF_${Date.now()}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`);

    const result = await confirmPaymentAndUnlockMilestone({
      projectId,
      milestoneId,
      amount,
      currency: chosenCurrency,
      gateway: gateway || 'nowpayments',
      txHashOrRef: ref,
      payerEmail,
      metadata: { simulation: true, confirmedVia: 'multi-rail-checkout' },
    });

    return NextResponse.json({
      success: true,
      project: result.project,
      payment: result.payment,
      alreadyConfirmed: result.alreadyConfirmed,
      message: `Milestone 0${milestone.phaseNumber} (${milestone.title}) successfully unlocked!`,
    });
  } catch (error) {
    console.error('[Simulate Settlement API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
