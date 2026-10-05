'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Loader2, Sparkles, ExternalLink } from 'lucide-react';

interface ImpersonateButtonProps {
  projectId: string;
  projectSlug: string;
  clientName?: string;
  variant?: 'banner' | 'row';
}

export function ImpersonateButton({
  projectId,
  projectSlug,
  clientName,
  variant = 'banner',
}: ImpersonateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImpersonate = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to authenticate impersonation session.');
        return;
      }

      // Open client portal in new tab or navigate
      window.open(data.redirectUrl || `/portal/${projectSlug}`, '_blank');
    } catch (err) {
      console.error('[Impersonate Error]:', err);
      alert('Error establishing client session.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'banner') {
    return (
      <button
        onClick={handleImpersonate}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-electric-blue/50 bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 hover:border-electric-blue font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-electric-blue/10 disabled:opacity-50"
        title={`Authenticate as ${clientName || 'Client'} and launch workspace portal in new window`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 text-electric-blue animate-pulse" />
        )}
        <span>{loading ? 'Authenticating...' : 'Impersonate Client & Open Portal'}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </button>
    );
  }

  return (
    <button
      onClick={handleImpersonate}
      disabled={loading}
      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-electric-blue/40 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/20 font-mono text-[11px] font-semibold transition-colors disabled:opacity-50"
      title={`Open workspace portal as ${clientName || 'Client'}`}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Eye className="w-3 h-3" />
      )}
      <span>{loading ? 'Opening...' : 'Impersonate'}</span>
    </button>
  );
}
