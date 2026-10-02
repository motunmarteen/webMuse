import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/session';
import { generateProjectInvite } from '@/lib/server/store';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const invite = await generateProjectInvite(id);

    if (!invite) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate invite. Project or client not found.' },
        { status: 404 }
      );
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
    const fullMagicUrl = `${protocol}://${host}${invite.magicLink}`;

    return NextResponse.json({
      success: true,
      rawToken: invite.rawToken,
      magicLink: fullMagicUrl,
      clientEmail: invite.client.email,
      message: `Fresh single-use magic link generated for ${invite.client.name} (${invite.client.email}).`,
    });
  } catch (error) {
    console.error('[API /api/admin/projects/[id]/dispatch-invite] Error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
