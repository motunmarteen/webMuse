import { redirect } from 'next/navigation';
import { getClientSession } from '@/lib/server/session';

export default async function PortalIndexPage() {
  const session = await getClientSession();

  if (session && session.projectSlug) {
    redirect(`/portal/${session.projectSlug}`);
  }

  redirect('/portal/login');
}
