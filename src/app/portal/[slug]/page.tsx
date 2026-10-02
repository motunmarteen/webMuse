import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getClientSession, getAdminSession } from '@/lib/server/session';
import { getProjectBySlug, getClientById } from '@/lib/server/store';
import { ClientWorkspaceView } from '@/components/portal/ClientWorkspaceView';
import { LogoutButton } from '@/components/portal/LogoutButton';
import { Lock } from 'lucide-react';

export default async function ProjectPortalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clientSession = await getClientSession();
  const adminSession = await getAdminSession();
  const session = clientSession || adminSession;

  if (!session) {
    redirect(`/portal/login?redirect=/portal/${slug}`);
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-red-400 mb-4">
          !
        </div>
        <h1 className="text-xl font-bold mb-2 font-display text-text-title">Project Not Found</h1>
        <p className="text-xs text-text-muted max-w-sm mb-6">
          The requested project workspace slug &quot;{slug}&quot; could not be located in the WebMuse database.
        </p>
        <Link
          href="/portal/login"
          className="text-xs text-electric-blue uppercase tracking-wider hover:underline"
        >
          Return to Portal Login
        </Link>
      </div>
    );
  }

  // Authorization check: if client session, ensure matching slug
  const isImpersonating = !!adminSession && !clientSession;
  if (!isImpersonating && session.role === 'client' && session.projectSlug && session.projectSlug !== slug) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-muted mb-4">
          <Lock className="w-6 h-6 text-electric-blue" />
        </div>
        <h1 className="text-xl font-bold mb-2 font-display text-text-title">Workspace Access Restricted</h1>
        <p className="text-xs text-text-muted max-w-sm mb-6">
          Your active session does not have access permissions for &quot;{slug}&quot;.
        </p>
        <div className="flex gap-4">
          <Link
            href={`/portal/${session.projectSlug}`}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors"
          >
            Go to Your Project ({session.projectSlug})
          </Link>
          <LogoutButton />
        </div>
      </div>
    );
  }

  const client = await getClientById(project.clientId);

  return (
    <ClientWorkspaceView
      initialProject={project}
      client={client}
      clientEmail={session.email}
      isImpersonating={isImpersonating}
    />
  );
}
