'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-card-border bg-card-bg text-text-muted hover:text-white hover:border-red-500/40 text-xs font-mono transition-all disabled:opacity-50"
      title="Terminate Admin Session"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-electric-blue" />
      ) : (
        <LogOut className="w-3.5 h-3.5 text-red-400" />
      )}
      <span>Exit Deck</span>
    </button>
  );
}
