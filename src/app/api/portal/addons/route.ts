import { NextRequest, NextResponse } from 'next/server';
import { getAddonCatalog, purchaseAddon } from '@/lib/server/store';

export async function GET() {
  try {
    const catalog = await getAddonCatalog();
    return NextResponse.json({ ok: true, data: catalog });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, addonId, paymentMethod, txRef, payerEmail } = body;

    if (!projectId || !addonId || !paymentMethod || !txRef) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: projectId, addonId, paymentMethod, txRef' },
        { status: 400 }
      );
    }

    const result = await purchaseAddon(
      projectId,
      addonId,
      paymentMethod,
      txRef,
      payerEmail
    );

    return NextResponse.json({ ok: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to process add-on purchase' },
      { status: 500 }
    );
  }
}
