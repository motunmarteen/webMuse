'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  'PARSING CRYPTOGRAPHIC TOKEN...',
  'VALIDATING SHA-256 INTEGRITY HASH...',
  'CONSUMING SINGLE-USE NONCE...',
  'PROVISIONING ENCRYPTED SESSION COOKIE...',
  'ESTABLISHING WEBMUSE WORKSPACE TUNNEL...',
];

function VerifyHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(
    !token ? 'No verification token provided in URL.' : null
  );

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    // Simulated terminal progression for UX fidelity before session navigation
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 350);

    const executeVerification = async () => {
      try {
        // Direct browser navigation to let server route handler set HTTP-only cookie and perform 307 redirect
        window.location.href = `/api/auth/verify?token=${encodeURIComponent(token)}`;
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Verification failed.');
        }
      }
    };

    const timer = setTimeout(executeVerification, 1200);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [token, router]);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 overflow-hidden selection:bg-white/10 selection:text-white">
      {/* Background Subtle Meshes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[25%] h-[350px] w-[350px] rounded-full bg-mesh-blue opacity-20 blur-[130px]" aria-hidden="true" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-2xl glassmorphism-card shadow-2xl text-center"
      >
        {!error ? (
          <div>
            {/* Minimalist Professional Pulse Indicator */}
            <div className="relative w-16 h-16 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-card-border animate-ping opacity-30" />
              <div className="w-12 h-12 rounded-full border border-card-border bg-card-bg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-electric-blue" />
              </div>
            </div>

            <span className="text-[11px] font-semibold tracking-widest text-electric-blue uppercase font-mono block mb-2">
              AUTHORIZATION GATEWAY
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-text-title mb-2 font-display">
              Verifying Credentials
            </h1>
            <p className="text-xs text-text-muted mb-8 font-mono">
              Authenticating encrypted session and preparing workspace...
            </p>

            {/* Terminal Step Progress */}
            <div className="space-y-2.5 text-left p-4 rounded-xl border border-card-border bg-card-bg font-mono text-[11px]">
              {STEPS.map((text, idx) => {
                const isCurrent = idx === step;
                const isDone = idx < step;
                return (
                  <div
                    key={text}
                    className={`flex items-center gap-2 transition-opacity duration-300 ${
                      isDone
                        ? 'text-foreground opacity-90'
                        : isCurrent
                        ? 'text-electric-blue font-semibold'
                        : 'text-zinc-600 opacity-40'
                    }`}
                  >
                    <span className="shrink-0 text-electric-blue">
                      {isDone ? '✓' : isCurrent ? '❯' : '·'}
                    </span>
                    <span className="truncate">{text}</span>
                    {isCurrent && (
                      <RefreshCw className="w-3 h-3 text-electric-blue animate-spin ml-auto shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="w-14 h-14 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center mx-auto mb-6 text-foreground">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-text-title mb-2 font-display">
              Verification Failed
            </h2>
            <p className="text-xs text-text-muted mb-6 leading-relaxed font-light">
              {error}
            </p>

            <Link
              href="/portal/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Login</span>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function PortalVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-text-muted font-mono text-xs">
          LOADING VERIFICATION MODULE...
        </div>
      }
    >
      <VerifyHandler />
    </Suspense>
  );
}
