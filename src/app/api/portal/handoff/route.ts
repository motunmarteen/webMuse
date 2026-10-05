import { NextRequest, NextResponse } from 'next/server';
import { getHandoffPackage, generateEnvProductionText } from '@/lib/server/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const format = searchParams.get('format');

    if (!projectId) {
      return NextResponse.json({ ok: false, error: 'Missing projectId parameter' }, { status: 400 });
    }

    if (format === 'env') {
      const envText = await generateEnvProductionText(projectId);
      return new NextResponse(envText, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': 'attachment; filename=".env.production"',
        },
      });
    }

    const handoffPackage = await getHandoffPackage(projectId);
    return NextResponse.json({ ok: true, data: handoffPackage });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || 'Failed to retrieve handoff package' },
      { status: 500 }
    );
  }
}
