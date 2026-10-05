import { NextRequest, NextResponse } from 'next/server';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import { getProjectById, createPaymentIntent } from '@/lib/server/store';
import {
  getDepositWalletDetails,
  getVirtualBankAccountDetails,
  getWireTransferInstructions,
} from '@/lib/server/payments';

export async function POST(request: NextRequest) {
  try {
    const clientSession = await getClientSession();
    const adminSession = await getAdminSession();

    if (!clientSession && !adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, milestoneId, gateway, currency, network } = body;

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

    const amountUsd = milestone.costUsd;
    const amountNgn = milestone.costNgn;
    const payerEmail = clientSession?.email || adminSession?.email || 'client@webmuse.dev';
    const txRef = `WM_${gateway ? gateway.toUpperCase() : 'INTENT'}_${milestone.phaseNumber}_${Date.now().toString(36).toUpperCase()}`;

    // Record pending intent in store
    const payment = await createPaymentIntent({
      projectId,
      milestoneId,
      amount: currency === 'NGN' ? amountNgn : amountUsd,
      currency: currency || (gateway === 'nowpayments' ? 'USDT' : gateway === 'paystack' ? 'NGN' : 'USD'),
      gateway: gateway || 'nowpayments',
      payerEmail,
      txHashOrRef: txRef,
      metadata: { network, milestoneTitle: milestone.title },
    });

    const cryptoDetails = getDepositWalletDetails(network || 'TRC20');
    const fiatDetails = getVirtualBankAccountDetails(project.title);
    const wireDetails = getWireTransferInstructions(project.slug);

    return NextResponse.json({
      success: true,
      payment,
      milestone: {
        id: milestone.id,
        phaseNumber: milestone.phaseNumber,
        title: milestone.title,
        costUsd: amountUsd,
        costNgn: amountNgn,
      },
      rails: {
        crypto: {
          ...cryptoDetails,
          amountDue: amountUsd,
          txRef,
        },
        fiatVirtualAccount: {
          ...fiatDetails,
          amountDueNgn: amountNgn,
          txRef,
        },
        wire: {
          ...wireDetails,
          amountDueUsd: amountUsd,
        },
      },
    });
  } catch (error) {
    console.error('[Create Payment Intent API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
