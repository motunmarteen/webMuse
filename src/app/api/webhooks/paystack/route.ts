import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackSignature } from '@/lib/server/payments';
import { confirmPaymentAndUnlockMilestone, getProjectById } from '@/lib/server/store';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // 1. Validate Cryptographic HMAC-SHA512 Signature
    const isValid = verifyPaystackSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[Webhook Paystack] Rejected invalid signature attempt');
      return NextResponse.json({ error: 'Invalid cryptographic signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    if (event !== 'charge.success') {
      return NextResponse.json({
        success: true,
        message: `Event "${event}" acknowledged without state modification.`,
      });
    }

    // Paystack amounts are in kobo (100 kobo = 1 NGN)
    const amountKobo = data.amount || 0;
    const amountNgn = Math.round(amountKobo / 100);
    const reference = data.reference;
    const customerEmail = data.customer?.email || 'client@paystack-customer.ng';

    // Parse custom metadata if available
    const customMetadata = data.metadata || {};
    const projectId = customMetadata.projectId || 'proj_apex_01';
    const milestoneId = customMetadata.milestoneId || 'ms_02';

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const milestone = project.milestones.find((m) => m.id === milestoneId) || project.milestones[1];

    // 2. Perform Idempotent Unlock & Invoice Execution
    const result = await confirmPaymentAndUnlockMilestone({
      projectId: project.id,
      milestoneId: milestone.id,
      amount: amountNgn,
      currency: 'NGN',
      gateway: 'paystack',
      txHashOrRef: reference,
      payerEmail: customerEmail,
      metadata: {
        paystackId: data.id,
        channel: data.channel,
        ipAddress: data.ip_address,
      },
    });

    return NextResponse.json({
      success: true,
      milestoneId: milestone.id,
      unlocked: true,
      alreadyConfirmed: result.alreadyConfirmed,
    });
  } catch (error) {
    console.error('[Webhook Paystack Handler Error]:', error);
    return NextResponse.json({ error: 'Internal server error processing webhook' }, { status: 500 });
  }
}
