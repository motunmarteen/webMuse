'use client';

import React, { useState } from 'react';
import type { Project, PRDDocument } from '@/lib/types/portal';
import {
  FileText,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Layers,
  Target,
  Users,
  Cpu,
  Lock,
  Loader2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface GenesisPRDCanvasProps {
  project: Project;
  onScopeSignedOff?: (updatedPrd: PRDDocument) => void;
}

export function GenesisPRDCanvas({ project, onScopeSignedOff }: GenesisPRDCanvasProps) {
  const [prd, setPrd] = useState<PRDDocument>(project.prd);
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'features' | 'architecture' | 'kpis'>('overview');

  const isSigned = !!prd.signedOffAt;

  const handleExecuteSignOff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/portal/scope-signoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          signerName: signerName.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to execute scope sign-off.');
        setSubmitting(false);
        return;
      }

      setPrd(data.prd);
      setIsSignOffModalOpen(false);
      if (onScopeSignedOff) {
        onScopeSignedOff(data.prd);
      }
    } catch (err) {
      console.error(err);
      alert('Error during scope sign-off.');
    } finally {
      setSubmitting(false);
    }
  };

  const copySignatureHash = () => {
    if (prd.signatureHash) {
      navigator.clipboard.writeText(prd.signatureHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleResetScope = async () => {
    try {
      const res = await fetch('/api/portal/scope-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id }),
      });
      const data = await res.json();
      if (data.success && data.prd) {
        setPrd(data.prd);
        if (onScopeSignedOff) {
          onScopeSignedOff(data.prd);
        }
      }
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Scope Creep Shield Banner */}
      <div
        className={`glassmorphism-card rounded-2xl p-6 border relative overflow-hidden transition-all shadow-xl ${
          isSigned
            ? 'border-emerald-500/40 bg-emerald-500/5'
            : 'border-amber-500/40 bg-amber-500/5'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                isSigned
                  ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                  : 'border-amber-500/40 bg-amber-500/20 text-amber-400'
              }`}
            >
              {isSigned ? <ShieldCheck className="w-6 h-6" /> : <Shield className="w-6 h-6 animate-pulse" />}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    isSigned ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {isSigned ? 'SCOPE CREEP SHIELD // IMMUTABLY LOCKED' : 'SCOPE CREEP SHIELD // PENDING CLIENT SIGN-OFF'}
                </span>
                <span className="text-[10px] text-text-muted">v{prd.version}</span>
              </div>

              <h3 className="text-lg font-bold font-display text-text-title">
                {isSigned ? 'Baseline Scope Approved & Cryptographically Locked' : 'Scope Baseline Sign-Off Required'}
              </h3>

              <p className="text-xs text-text-muted font-light leading-relaxed max-w-xl">
                {isSigned
                  ? `Signed off by ${prd.signedOffBy} on ${new Date(prd.signedOffAt!).toLocaleDateString()} at ${new Date(prd.signedOffAt!).toLocaleTimeString()}. Any scope adjustments will be tagged as change-orders.`
                  : 'Digital sign-off freezes the project scope v1.0 baseline to eradicate scope creep and authorize sprint engineering.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {isSigned ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-emerald-500/30 bg-card-bg text-xs">
                  <div className="text-right">
                    <div className="text-[9px] text-text-muted uppercase">Signature Hash</div>
                    <div className="text-emerald-400 font-mono text-[11px] truncate max-w-[140px]">
                      {prd.signatureHash?.slice(0, 14)}...
                    </div>
                  </div>
                  <button
                    onClick={copySignatureHash}
                    className="p-1.5 rounded-lg border border-card-border bg-background hover:bg-zinc-800 text-foreground transition-colors"
                    title="Copy SHA-256 signature hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={handleResetScope}
                  className="px-3 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-amber-400 text-[10px] uppercase tracking-wider transition-colors"
                  title="Reset scope sign-off to re-test the approval modal"
                >
                  Reset (Demo)
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSignOffModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-amber-400/20"
              >
                <span>Approve Scope v{prd.version}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRD Main Document Viewer */}
      <div className="glassmorphism-card rounded-2xl border border-card-border overflow-hidden shadow-2xl">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between border-b border-card-border px-6 py-4 bg-card-bg/40">
          <div className="flex items-center gap-2 text-xs font-bold text-text-title uppercase tracking-wider">
            <FileText className="w-4 h-4 text-electric-blue" />
            <span>Genesis Canvas PRD</span>
            <span className="text-card-border">/</span>
            <span className="text-text-muted text-[11px] font-normal">{project.title}</span>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {[
              { id: 'overview', label: '1. Vision & Strategy' },
              { id: 'features', label: '2. Feature Matrix' },
              { id: 'architecture', label: '3. Technical Specs' },
              { id: 'kpis', label: '4. Delivery KPIs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as typeof activeSection)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeSection === tab.id
                    ? 'bg-electric-blue/15 text-electric-blue font-semibold border border-electric-blue/30'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  EXECUTIVE SUMMARY
                </span>
                <h4 className="text-lg font-bold font-display text-text-title">{prd.title}</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  {prd.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-card-border/60">
                <div className="p-5 rounded-xl border border-card-border bg-card-bg/40 space-y-2">
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                    Core Problem Statement
                  </span>
                  <p className="text-text-muted text-xs leading-relaxed font-light">
                    {prd.problemStatement}
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-card-border bg-card-bg/40 space-y-2">
                  <span className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Target Stakeholders & Audience
                  </span>
                  <p className="text-text-muted text-xs leading-relaxed font-light">
                    {prd.targetAudience}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURE SPECIFICATION MATRIX */}
          {activeSection === 'features' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  SPECIFICATION MATRIX
                </span>
                <h4 className="text-base font-bold text-text-title mt-0.5">
                  Scope Baseline Feature Deliverables
                </h4>
                <p className="text-text-muted font-light mt-0.5">
                  All capabilities outlined below are included in the baseline sprint contract.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prd.featureMatrix.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-card-border bg-card-bg/50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-card-border">
                      <span className="text-electric-blue font-bold text-xs uppercase tracking-wider">
                        {cat.category}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {cat.features.length} capabilities
                      </span>
                    </div>

                    <div className="space-y-2">
                      {cat.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-text-muted text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue mt-1.5 shrink-0" />
                          <span className="text-foreground">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & TECH STACK */}
          {activeSection === 'architecture' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  SYSTEM TOPOLOGY
                </span>
                <h4 className="text-base font-bold text-text-title mt-0.5">
                  Technical Architecture & Infrastructure
                </h4>
              </div>

              <div className="p-5 rounded-xl border border-card-border bg-card-bg/40 space-y-2">
                <span className="text-[10px] text-text-muted uppercase">Architecture Consensus</span>
                <p className="text-foreground text-xs leading-relaxed font-light">
                  {prd.coreArchitecture}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-text-muted uppercase tracking-wider">
                  Tech Universe Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-1.5 rounded-xl border border-card-border bg-card-bg text-xs font-mono text-foreground flex items-center gap-2"
                    >
                      <Code2 className="w-3.5 h-3.5 text-electric-blue" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY KPIS */}
          {activeSection === 'kpis' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ACCEPTANCE CRITERIA
                </span>
                <h4 className="text-base font-bold text-text-title mt-0.5">
                  Milestone Quality Benchmarks
                </h4>
              </div>

              <div className="space-y-2.5">
                {prd.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-card-border bg-card-bg/40 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-foreground text-xs leading-relaxed">{kpi}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Digital Scope Sign-Off Modal */}
      {isSignOffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-amber-500/40 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Scope Baseline Digital Sign-Off</span>
              </div>
              <button
                onClick={() => setIsSignOffModalOpen(false)}
                className="text-text-muted hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-text-title">
                Approve {prd.title} (v{prd.version})
              </h4>
              <p className="text-text-muted leading-relaxed font-light">
                By executing digital sign-off, you formally approve the baseline specifications and milestone deliverables detailed in this Genesis PRD.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-card-border bg-card-bg space-y-2 text-[11px] text-text-muted font-light">
              <div className="text-foreground font-semibold">Scope Creep Defense Policy:</div>
              <p>
                1. This PRD establishes the contractual baseline for engineering sprint milestones.
              </p>
              <p>
                2. Unforeseen features requested after this sign-off will be quoted and scheduled as out-of-scope change-orders.
              </p>
              <p>
                3. Your client identity, timestamp, and IP address will be hashed via HMAC-SHA256 to create an immutable sign-off proof.
              </p>
            </div>

            <form onSubmit={handleExecuteSignOff} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-text-muted uppercase">
                  Full Authorized Signer Name *
                </label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  required
                  className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-foreground text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignOffModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || !signerName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Hashing Signature...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorize & Lock Scope</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
