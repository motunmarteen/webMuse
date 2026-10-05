import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassphrase } from '@/lib/server/adminAuth';
import { setAdminSession } from '@/lib/server/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const passphrase = typeof body.passphrase === 'string' ? body.passphrase : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : 'ops@webmuse.tech';

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (!passphrase) {
      return NextResponse.json(
        { success: false, error: 'Passphrase is required to authenticate with the Agency Enclave.' },
        { status: 400 }
      );
    }

    const check = verifyAdminPassphrase(passphrase, clientIp);

    if (!check.success) {
      const isRateLimited = check.error?.includes('RATE_LIMITED');
      return NextResponse.json(
        {
          success: false,
          error: check.error,
          remainingAttempts: check.remainingAttempts,
          lockedSeconds: check.lockedSeconds,
        },
        { status: isRateLimited ? 429 : 401 }
      );
    }

    // Set signed, secure HTTP-only admin cookie
    await setAdminSession(email);

    return NextResponse.json({
      success: true,
      message: 'Master administrative clearance granted.',
      redirectUrl: '/admin',
    });
  } catch (error) {
    console.error('[API /api/admin/login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process admin authentication request.' },
      { status: 500 }
    );
  }
}
