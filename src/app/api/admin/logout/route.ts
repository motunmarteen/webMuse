import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/server/session';

export async function POST() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true, message: 'Agency Admin session terminated.' });
  } catch (error) {
    console.error('[API /api/admin/logout] Error:', error);
    return NextResponse.json({ success: false, error: 'LOGOUT_ERROR' }, { status: 500 });
  }
}
