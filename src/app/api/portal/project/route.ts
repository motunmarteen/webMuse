import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, getProjectBySlug } from '@/lib/server/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    let project = null;
    if (id) {
      project = await getProjectById(id);
    } else if (slug) {
      project = await getProjectBySlug(slug);
    }

    if (!project) {
      return NextResponse.json({ ok: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
