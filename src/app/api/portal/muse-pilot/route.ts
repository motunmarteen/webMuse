import { NextRequest, NextResponse } from 'next/server';
import { queryMusePilot } from '@/lib/server/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, question } = body;

    if (!projectId || !question) {
      return NextResponse.json(
        { ok: false, error: 'Missing projectId or question' },
        { status: 400 }
      );
    }

    const response = await queryMusePilot(projectId, question);
    return NextResponse.json({ ok: true, data: response });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
