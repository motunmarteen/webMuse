'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Layers,
  Monitor,
  PackageCheck,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Check,
} from 'lucide-react';

interface GuidedWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuidedWalkthroughModal({ isOpen, onClose }: GuidedWalkthroughModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: '01',
      title: 'Digital Scope Baseline & Creep Shield',
      subtitle: 'Clear boundaries, predictable budgets, zero hidden costs',
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description:
        'Before any code is pushed, your Genesis PRD scope is reviewed and digitally signed. This freezes the baseline architecture and guarantees your project budget. Any new ideas later are simply handled as transparent add-on sprints.',
      highlights: [
        'Immutable digital scope signature',
        'Transparent deliverable breakdown for every dollar',
        'Guaranteed zero scope creep or surprise bills',
      ],
    },
    {
      stepNumber: '02',
      title: 'Phased Sprints & Deliverable Milestones',
      subtitle: 'Track live progress across 5 structured phases',
      icon: Layers,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description:
        'Your build moves through 5 transparent phases: Conception, Design Tokens, Core Build, Staging QA, and Final Handoff. Each phase has specific deliverables you can inspect in real-time.',
      highlights: [
        'Milestone-gated escrow: funds only release when deliverables pass',
        'Multi-rail settlement in USDT Crypto or NGN Fiat',
        'Deliverable status tracking (Backlog, In Progress, Approved)',
      ],
    },
    {
      stepNumber: '03',
      title: 'Interactive Staging & Visual Feedback',
      subtitle: 'Click anywhere on your live website to drop revision pins',
      icon: Monitor,
      color: 'text-electric-blue bg-electric-blue/10 border-electric-blue/30',
      description:
        'No messy email chains or lost screenshots. Test your live website inside the portal across Desktop, Tablet, and Mobile viewports. Click directly on any element to drop a visual pin, add notes, and assign severity.',
      highlights: [
        'Pinpoint percentage coordinates on live preview',
        'Direct notification broadcast to WebMuse lead engineers',
        'Resolved/Open feedback ledger tracking',
      ],
    },
    {
      stepNumber: '04',
      title: 'Digital Safe Handoff & 30-Day SLA',
      subtitle: '100% intellectual property custody & post-launch warranty',
      icon: PackageCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description:
        'Upon completion, the Digital Safe automatically releases your GitHub organization transfer, production environment credentials (.env), high-res brand packages, and Loom architecture walkthroughs, backed by a 30-day SLA warranty.',
      highlights: [
        '1-Click GitHub organization code transfer',
        'Masked & encrypted credential vault with auto-zeroization',
        '30-day priority bug-fix hotline and SLA response guarantee',
      ],
    },
  ];

  const activeStep = steps[currentStep];
  const Icon = activeStep.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden font-mono">
        {/* Top Glow Ambient */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          title="Close guide"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            HOW WEBMUSE OS WORKS // FOUNDER WALKTHROUGH
          </span>
          <span className="text-xs text-zinc-500">Step {currentStep + 1} of {steps.length}</span>
        </div>

        {/* Step Progress Dots */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                  : idx < currentStep
                  ? 'bg-emerald-400/60'
                  : 'bg-white/10'
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Active Step Content */}
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl border ${activeStep.color} shrink-0`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                STAGE {activeStep.stepNumber}
              </div>
              <h3 className="text-lg font-bold text-white font-mono">{activeStep.title}</h3>
              <p className="text-xs text-cyan-400/80 mt-0.5">{activeStep.subtitle}</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1">
            {activeStep.description}
          </p>

          {/* Highlights Checklist */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Core Benefits for Product Owners:
            </span>
            {activeStep.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl border border-white/10 disabled:opacity-30 disabled:hover:border-white/10 hover:border-white/20 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Check className="w-3.5 h-3.5" /> Got it! Go to Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
