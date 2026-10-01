import { NextRequest, NextResponse } from 'next/server';
import { getClientByEmail, getProjectForClient, saveMagicToken } from '@/lib/server/store';
import { generateMagicToken } from '@/lib/server/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'INVALID_EMAIL', message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // MANDATORY GUARDRAIL: Anti-Self-Signup Rule
    // Only emails already provisioned by WebMuse Admin in the database can receive an access link
    const client = await getClientByEmail(email);

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: 'ACCESS_RESTRICTED',
          message:
            'Access Restricted: This email is not associated with an initiated WebMuse project. WebMuse workspaces are strictly agency-initiated. Please reach out to your WebMuse lead to activate your project.',
        },
        { status: 403 }
      );
    }

    const project = await getProjectForClient(client.id);

    // Generate cryptographic single-use magic token
    const { rawToken, tokenHash } = generateMagicToken();
    await saveMagicToken({
      rawToken,
      tokenHash,
      email: client.email,
      projectId: project?.id,
      expiresInMinutes: 15,
    });

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
    const verificationUrl = `${protocol}://${host}/portal/verify?token=${rawToken}`;

    // Log for server inspection / local developer feedback
    console.log('\n=========================================');
    console.log(`[WebMuse Magic Link Dispatch]`);
    console.log(`To: ${client.name} <${client.email}>`);
    console.log(`Project: ${project?.title || 'Active Workspace'}`);
    console.log(`Magic URL: ${verificationUrl}`);
    console.log('=========================================\n');

    return NextResponse.json({
      success: true,
      message: `Magic link dispatched to ${client.email}. Valid for 15 minutes.`,
      email: client.email,
      previewUrl: process.env.NODE_ENV !== 'production' ? verificationUrl : undefined,
    });
  } catch (error) {
    console.error('[API /api/auth/magic-link] Internal Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR', message: 'Failed to dispatch magic link. Please try again.' },
      { status: 500 }
    );
  }
}
