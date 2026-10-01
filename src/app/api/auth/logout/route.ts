import { NextResponse } from 'next/server';
import { clearClientSession } from '@/lib/server/session';

export async function POST() {
  try {
    await clearClientSession();
    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    console.error('[API /api/auth/logout] Error:', error);
    return NextResponse.json({ success: false, error: 'LOGOUT_ERROR' }, { status: 500 });
  }
}
