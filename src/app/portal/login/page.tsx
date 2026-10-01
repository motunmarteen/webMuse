'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Mail,
  ArrowRight,
  Sparkles,
  Lock,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

function LoginFormContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const initialError = errorParam
    ? errorParam === 'MISSING_TOKEN'
      ? 'Verification token was missing. Please request a new link.'
      : errorParam.includes('expired') || errorParam === 'INVALID_OR_EXPIRED_TOKEN'
      ? 'The magic link has expired or has already been used. Please request a new one.'
      : decodeURIComponent(errorParam)
    : '';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'restricted' | 'error'>(
    initialError ? 'error' : 'idle'
  );
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 mins in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work or corporate email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setPreviewUrl(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setCountdown(900);
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
      } else if (res.status === 403) {
        setStatus('restricted');
        setErrorMessage(
          data.message ||
            'Access Restricted: This email is not associated with an initiated WebMuse project.'
        );
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'An unexpected error occurred. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection lost. Please check your internet connection.');
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-12 overflow-hidden selection:bg-white/10 selection:text-white">
      {/* Background Subtle Mesh (Exact WebMuse landing page style) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-20 blur-[130px]" aria-hidden="true" />
        <div className="absolute bottom-[10%] right-[15%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-15 blur-[140px]" aria-hidden="true" />
      </div>

      {/* Top Brand Link */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 z-10 flex items-center gap-3"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-electric-blue" />
          <span>Return to WebMuse.tech</span>
        </Link>
      </motion.div>

      {/* Auth Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glassmorphism-card rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Header Badge */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] font-semibold tracking-widest text-electric-blue uppercase font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
              CLIENT WORKSPACE // AUTH
            </span>
            <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono">
              <Lock className="w-3 h-3 text-text-muted" />
              <span>SECURE ACCESS</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-text-title mb-3 font-display">
                    Sign in with Magic Link
                  </h1>
                  <p className="text-text-muted font-light text-sm leading-relaxed">
                    Enter the authorized email address associated with your WebMuse project to receive an instant, passwordless entry link.
                  </p>
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 text-xs font-mono text-red-300"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>{errorMessage}</div>
                  </motion.div>
                )}

                {/* Restricted Access Banner (Anti-Self-Signup Rule) */}
                {status === 'restricted' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl border border-card-border bg-card-bg text-xs space-y-3"
                  >
                    <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-semibold text-foreground">
                      <ShieldAlert className="w-4 h-4 text-electric-blue" />
                      Agency-Initiated Access Only
                    </div>
                    <p className="text-text-muted font-light leading-relaxed">
                      {errorMessage}
                    </p>
                    <div className="pt-1">
                      <a
                        href="mailto:hello@webmuse.tech?subject=Project%20Workspace%20Activation"
                        className="inline-flex items-center gap-1.5 text-xs text-electric-blue hover:text-white font-mono uppercase tracking-wider transition-colors"
                      >
                        Contact WebMuse Lead <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="client-email"
                      className="text-[10px] font-mono uppercase tracking-widest text-text-muted"
                    >
                      Work Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="client-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="founder@yourcompany.com"
                        disabled={status === 'loading'}
                        className="w-full bg-card-bg border border-card-border focus:border-electric-blue/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none transition-colors placeholder-zinc-500 font-mono disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:pointer-events-none font-mono cursor-pointer shadow-lg shadow-black/20"
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>DISPATCHING MAGIC TOKEN...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send Magic Link</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Developer / Demo Quick-Fill Bar */}
                <div className="mt-8 pt-6 border-t border-card-border">
                  <div className="flex items-center justify-between text-[10px] text-text-muted mb-2.5 font-mono uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-electric-blue" />
                      ACTIVE DEMO CLIENT:
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmail('client@apexlabs.io')}
                    className="w-full text-left p-3 rounded-xl bg-card-bg hover:bg-card-bg/80 border border-card-border hover:border-electric-blue/40 transition-all text-xs font-mono text-text-muted hover:text-foreground flex items-center justify-between group cursor-pointer"
                  >
                    <span>client@apexlabs.io (Apex Labs Inc.)</span>
                    <span className="text-[10px] font-semibold text-electric-blue group-hover:underline uppercase tracking-wider">
                      1-Click Fill
                    </span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="text-center py-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center mx-auto mb-6 text-foreground">
                  <CheckCircle2 className="w-7 h-7 text-electric-blue" />
                </div>

                <h2 className="text-2xl font-bold text-text-title mb-2 font-display">
                  Magic Link Dispatched
                </h2>
                <p className="text-sm text-text-muted font-light mb-6 leading-relaxed">
                  We have dispatched a one-click entry link to{' '}
                  <span className="text-foreground font-mono font-medium">{email}</span>.
                </p>

                {/* Countdown Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-card-border bg-card-bg text-xs font-mono text-text-muted mb-6">
                  <Clock className="w-3.5 h-3.5 text-electric-blue" />
                  <span>Valid for: {formatTime(countdown)}</span>
                </div>

                {/* Local Development / Direct Test Instant Entry */}
                {previewUrl && (
                  <div className="mb-6 p-4 rounded-xl border border-card-border bg-card-bg text-left space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-electric-blue font-semibold uppercase tracking-wider">
                      <span>Instant Verification Link (Dev Mode)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                    </div>
                    <p className="text-xs text-text-muted font-light leading-normal">
                      Click below to bypass email inbox and authenticate your session directly:
                    </p>
                    <a
                      href={previewUrl}
                      className="block w-full py-2.5 px-4 rounded-full bg-electric-blue hover:bg-blue-600 text-white text-xs font-mono font-semibold uppercase tracking-wider text-center transition-colors shadow-md"
                    >
                      Authenticate & Enter Workspace →
                    </a>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setCountdown(900);
                    }}
                    className="w-full py-2 text-xs font-mono uppercase tracking-wider text-text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Didn&apos;t receive it? Enter a different email
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="mt-8 z-10 text-center text-xs text-text-muted font-mono tracking-wider">
        <p>Protected by WebMuse Security Infrastructure</p>
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-text-muted font-mono text-xs">
          INITIALIZING SECURE GATEWAY...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
