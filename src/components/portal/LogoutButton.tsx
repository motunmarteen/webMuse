'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/portal/login');
      router.refresh();
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-text-muted hover:text-foreground hover:border-electric-blue/40 transition-all cursor-pointer disabled:opacity-50"
      title="Secure Logout"
    >
      <LogOut className="w-3.5 h-3.5 text-electric-blue" />
      <span>{loading ? 'Disconnecting...' : 'Logout'}</span>
    </button>
  );
}
