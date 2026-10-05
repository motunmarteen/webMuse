import { NextRequest, NextResponse } from 'next/server';
import { verifyNowPaymentsSignature } from '@/lib/server/payments';
import { confirmPaymentAndUnlockMilestone, getProjectById } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-nowpayments-sig');

    // 1. Validate Cryptographic HMAC-SHA512 Signature
    const isValid = verifyNowPaymentsSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[Webhook NOWPayments] Rejected invalid signature attempt');
      return NextResponse.json({ error: 'Invalid cryptographic signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const {
      payment_status,
      payment_id,
      actually_paid,
      pay_currency,
      order_description,
      invoice_id,
    } = payload;

    // We proceed if the transaction has finished or is confirmed on-chain
    if (payment_status !== 'finished' && payment_status !== 'confirmed') {
      return NextResponse.json({
        success: true,
        message: `Status "${payment_status}" received, awaiting final block confirmation.`,
      });
    }

    // Extract metadata or parse from custom order tags
    // e.g. order_id: "proj_apex_01:ms_02"
    const orderId = payload.order_id || '';
    const [projectId, milestoneId] = orderId.includes(':')
      ? orderId.split(':')
      : ['proj_apex_01', 'ms_02']; // fallback for demo webhook test

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Target project not found' }, { status: 404 });
    }

    const milestone = project.milestones.find((m) => m.id === milestoneId) || project.milestones[1];
    const amount = Number(actually_paid) || milestone.costUsd;
    const txHash = payload.purchase_id || payment_id?.toString() || `NOW_TX_${Date.now()}`;
    const payerEmail = payload.customer_email || 'client@crypto-payer.io';

    // 2. Perform Idempotent Unlock & Invoice Execution
    const result = await confirmPaymentAndUnlockMilestone({
      projectId: project.id,
      milestoneId: milestone.id,
      amount,
      currency: (pay_currency?.toUpperCase() === 'USDT' ? 'USDT' : 'USD') as 'USD' | 'USDT',
      gateway: 'nowpayments',
      txHashOrRef: txHash,
      payerEmail,
      metadata: {
        nowpaymentsId: payment_id,
        invoiceId: invoice_id,
        blockchainNetwork: payload.pay_currency,
      },
    });

    return NextResponse.json({
      success: true,
      milestoneId: milestone.id,
      unlocked: true,
      alreadyConfirmed: result.alreadyConfirmed,
    });
  } catch (error) {
    console.error('[Webhook NOWPayments Handler Error]:', error);
    return NextResponse.json({ error: 'Internal server error processing webhook' }, { status: 500 });
  }
}
