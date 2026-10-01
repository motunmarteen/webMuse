import { NextRequest, NextResponse } from 'next/server';
import { verifyAndConsumeMagicToken, getClientByEmail, getProjectForClient } from '@/lib/server/store';
import { setClientSession } from '@/lib/server/session';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/portal/login?error=MISSING_TOKEN', req.url));
    }

    const verification = await verifyAndConsumeMagicToken(token);

    if (!verification.valid || !verification.email) {
      const reasonCode = encodeURIComponent(verification.reason || 'INVALID_OR_EXPIRED_TOKEN');
      return NextResponse.redirect(new URL(`/portal/login?error=${reasonCode}`, req.url));
    }

    const client = await getClientByEmail(verification.email);
    if (!client) {
      return NextResponse.redirect(new URL('/portal/login?error=CLIENT_NOT_FOUND', req.url));
    }

    const project = await getProjectForClient(client.id);
    if (!project) {
      return NextResponse.redirect(new URL('/portal/login?error=NO_ACTIVE_PROJECT', req.url));
    }

    // Set HTTP-only secure signed session cookie
    await setClientSession(client, project);

    // Redirect to the client's dedicated project workspace
    const targetUrl = new URL(`/portal/${project.slug}`, req.url);
    return NextResponse.redirect(targetUrl);
  } catch (error) {
    console.error('[API /api/auth/verify] Verification Error:', error);
    return NextResponse.redirect(new URL('/portal/login?error=VERIFICATION_FAILED', req.url));
  }
}
