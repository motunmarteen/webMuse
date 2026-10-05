'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, KeyRound, ShieldAlert, ArrowRight, Eye, EyeOff, Terminal, Sparkles } from 'lucide-react';

export function AdminLoginForm() {
  const router = useRouter();
  const [passphrase, setPassphrase] = useState('');
  const [email, setEmail] = useState('ops@webmuse.tech');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase, email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Access denied by Agency Enclave.');
        if (typeof data.remainingAttempts === 'number') {
          setRemainingAttempts(data.remainingAttempts);
        }
        setLoading(false);
        return;
      }

      router.push(data.redirectUrl || '/admin');
      router.refresh();
    } catch {
      setError('Connection failure: Unable to reach Admin Enclave API.');
      setLoading(false);
    }
  };

  const handleFillDemoKey = () => {
    setPassphrase('webmuse-agency-root-2026');
    setError(null);
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg text-xs font-mono text-electric-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
          MASTER ADMINISTRATIVE ACCESS
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
          Agency Command Center
        </h1>
        <p className="text-xs text-text-muted font-mono">
          Cryptographically gated terminal for WebMuse team members only
        </p>
      </div>

      {/* Main Login Deck Card */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-card-border shadow-2xl">
        {/* Terminal Status Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-card-border font-mono text-[11px] text-text-muted">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-electric-blue" />
            <span className="text-foreground font-semibold">ENCLAVE_v2.6</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">● 256-BIT GCM</span>
            <span className="text-text-muted">|</span>
            <span className="text-electric-blue">AUTH RAIL 01</span>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-500/10 text-xs font-mono text-red-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <div className="space-y-1">
              <div>{error}</div>
              {remainingAttempts !== null && remainingAttempts > 0 && (
                <div className="text-[10px] text-red-400/80">
                  Remaining attempts before lockout: {remainingAttempts}
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
              Admin Operative Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none transition-colors"
                placeholder="ops@webmuse.tech"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                Root Passphrase / Secret Key
              </label>
              <button
                type="button"
                onClick={handleFillDemoKey}
                className="text-[10px] text-electric-blue hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5" />
                Fill Agency Master Key
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 pr-10 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none transition-colors"
                placeholder="Enter agency master key..."
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground p-1"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold font-mono text-xs uppercase tracking-wider py-3.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Authenticating Enclave...
              </span>
            ) : (
              <>
                <span>Access Command Deck</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Security Terminal Notes */}
        <div className="pt-2 text-[10px] text-text-muted font-mono space-y-1 border-t border-card-border/60">
          <div className="flex items-center justify-between">
            <span>DEFENSE: Rate-limit guardrail</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span>SESSION: 24h HMAC Signed Cookie</span>
            <span className="text-electric-blue">wm_admin_session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
