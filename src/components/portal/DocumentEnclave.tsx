'use client';

import React, { useState } from 'react';
import type { AgencyDocument, DocumentCategory, DocumentStatus } from '@/lib/types/portal';
import {
  FileText,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Lock,
  Printer,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DocumentEnclaveProps {
  documents: AgencyDocument[];
  projectName: string;
  clientName: string;
  companyName: string;
}

export function DocumentEnclave({
  documents,
  projectName,
  clientName,
  companyName,
}: DocumentEnclaveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDoc, setActiveDoc] = useState<AgencyDocument | null>(null);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: `All Documents (${documents.length})` },
    { id: 'legal', label: 'Legal & Contracts' },
    { id: 'technical', label: 'PRD & TRD' },
    { id: 'strategy', label: 'Strategy & Proposal' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'assurance', label: 'Testing & QA' },
    { id: 'handoff', label: 'Handover & SLA' },
    { id: 'financial', label: 'Invoices' },
  ];

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'legal') return doc.category === 'legal';
    if (selectedCategory === 'technical') return doc.category === 'technical';
    if (selectedCategory === 'strategy') return doc.category === 'strategy';
    if (selectedCategory === 'design') return doc.category === 'design';
    if (selectedCategory === 'assurance') return doc.category === 'assurance';
    if (selectedCategory === 'handoff') return doc.category === 'handoff';
    if (selectedCategory === 'financial') return doc.category === 'financial';
    return true;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'executed':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Executed & Locked
          </span>
        );
      case 'released':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-electric-blue/40 bg-electric-blue/10 text-electric-blue text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Active Release
          </span>
        );
      case 'awaiting_signature':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <Clock className="w-3 h-3 animate-pulse" />
            Awaiting Sign-Off
          </span>
        );
      case 'drafting':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-text-muted text-[10px] uppercase flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" />
            Drafting / Sprint Locked
          </span>
        );
    }
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header Banner */}
      <div className="glassmorphism-card rounded-2xl p-6 border border-card-border relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-electric-blue uppercase tracking-widest font-semibold">
              <Sparkles className="w-3 h-3" />
              CLIENT OPERATING SYSTEM // DOCUMENT SUITE
            </div>
            <h3 className="text-xl font-bold font-display text-text-title">
              Standard 12-Document Enclave & Legal Safe
            </h3>
            <p className="text-xs text-text-muted font-light leading-relaxed max-w-2xl">
              Immutable repository of commercial contracts, technical architecture specifications, quality reports, and handoff assets.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl border border-card-border bg-card-bg text-right shrink-0">
            <div className="text-[10px] text-text-muted uppercase">Document Assets</div>
            <div className="text-sm font-bold text-foreground">
              {documents.filter((d) => d.status === 'executed' || d.status === 'released').length} of {documents.length} Active
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips - All Visible at Once */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl transition-all border ${
              selectedCategory === cat.id
                ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-bold shadow-sm'
                : 'border-card-border bg-card-bg/60 text-text-muted hover:text-foreground'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const isLocked = doc.status === 'drafting';

          return (
            <div
              key={doc.id}
              className="glassmorphism-card rounded-2xl p-5 border border-card-border hover:border-card-border/90 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-electric-blue font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-card-border bg-card-bg">
                    {doc.filename}
                  </span>
                  {getStatusBadge(doc.status)}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-text-title leading-snug">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-text-muted font-light leading-relaxed mt-1 line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-3 border-t border-card-border/60 flex items-center justify-between text-xs">
                <span className="text-[10px] text-text-muted uppercase">
                  Unlocks Phase 0{doc.unlockedAtPhase}
                </span>

                <button
                  onClick={() => setActiveDoc(doc)}
                  className="text-electric-blue hover:underline flex items-center gap-1 font-semibold text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Document</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Document Viewer Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-card-border shadow-2xl relative text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-card-border bg-card-bg/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-electric-blue font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-card-bg border border-card-border">
                    {activeDoc.filename}
                  </span>
                  {getStatusBadge(activeDoc.status)}
                </div>
                <h3 className="text-lg font-bold font-display text-text-title">
                  {activeDoc.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintOrDownload}
                  className="px-3 py-1.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground text-xs flex items-center gap-1.5 transition-colors"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>

                <button
                  onClick={() => setActiveDoc(null)}
                  className="text-text-muted hover:text-white px-2 py-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Body (Simulating Formal Institutional PDF) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-background/50">
              {/* Document Letterhead */}
              <div className="pb-4 border-b border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-text-muted text-[11px]">
                <div>
                  <div className="text-foreground font-bold font-display text-sm tracking-wider">
                    WEBMUSE AGENCY CLIENT OPERATING SYSTEM (WCOS)
                  </div>
                  <div>Engagement: {projectName} • Client: {clientName} ({companyName})</div>
                </div>
                <div className="text-right sm:text-right font-mono text-[10px]">
                  <div>Designation: {activeDoc.id.toUpperCase()}</div>
                  <div>Status: {activeDoc.status.toUpperCase()}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-muted leading-relaxed font-light text-xs">
                {activeDoc.description}
              </p>

              {/* Formatted Sections */}
              <div className="space-y-5">
                {activeDoc.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-card-border bg-card-bg/40 space-y-2"
                  >
                    <div className="text-electric-blue font-bold text-xs uppercase tracking-wider">
                      § {idx + 1}. {sec.heading}
                    </div>
                    <p className="text-foreground text-xs leading-relaxed font-light">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Signature / Execution Seal */}
              {activeDoc.signedAt && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cryptographic Execution Attestation</span>
                  </div>
                  <div className="text-text-muted text-[11px]">
                    Executed by: <span className="text-foreground font-medium">{activeDoc.signedBy}</span>
                  </div>
                  <div className="text-text-muted text-[10px]">
                    Timestamp: {new Date(activeDoc.signedAt).toLocaleString()}
                    {activeDoc.signatureHash && ` • Signature Hash: ${activeDoc.signatureHash}`}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-card-border bg-card-bg/60 flex items-center justify-between text-xs">
              <span className="text-text-muted text-[10px]">
                WebMuse OS Confidential Proprietary Artifact
              </span>
              <button
                onClick={() => setActiveDoc(null)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold uppercase tracking-wider text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
