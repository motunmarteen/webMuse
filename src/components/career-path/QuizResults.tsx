"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Share2,
  Check,
  Target,
  ListChecks,
  GitBranch,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Link2,
} from "lucide-react";
import { AXIS_LABELS, type QuizResult, type CareerAxisKey } from "@/lib/career-path-data";

function AxisBar({ axisKey, value, max }: { axisKey: CareerAxisKey; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const info = AXIS_LABELS[axisKey];
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-semibold text-text-title font-mono uppercase tracking-wider">{info.label}</span>
        <span className="text-[10px] font-mono text-text-muted">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-card-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-electric-blue"
        />
      </div>
      <p className="text-[11px] text-text-muted font-light mt-1.5 leading-relaxed">{info.description}</p>
    </div>
  );
}

function ScoreRing({ percent }: { percent: number }) {
  const size = 76;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--card-border)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-electric-blue)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-text-title font-mono">{percent}%</span>
      </div>
    </div>
  );
}

function MatchCard({
  match,
  rank,
}: {
  match: QuizResult["matches"][number];
  rank: number;
}) {
  const { career, matchPercent } = match;
  const Icon = career.icon;
  const isTop = rank === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.08 }}
      className={`glassmorphism-card rounded-2xl p-6 md:p-7 ${isTop ? "border-electric-blue/40" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            {isTop && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
                Top match
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-text-title tracking-tight leading-tight">
              {career.title}
            </h3>
            <p className="text-xs md:text-sm text-text-muted font-light mt-0.5">{career.subtitle}</p>
          </div>
        </div>
        <ScoreRing percent={matchPercent} />
      </div>

      <p className="text-sm text-text-muted font-light leading-relaxed mt-5">{career.description}</p>

      <div className="mt-5">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-2">
          <Target className="h-3 w-3" /> Why it fits
        </span>
        <p className="text-sm text-text-muted font-light leading-relaxed">{career.personalityMatch}</p>
      </div>

      <div className="mt-5">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-2">
          <ListChecks className="h-3 w-3" /> Key skills
        </span>
        <div className="flex flex-wrap gap-1.5">
          {career.keySkills.map((s) => (
            <span
              key={s}
              className="text-[10px] font-mono uppercase tracking-wider text-text-muted border border-card-border rounded-full px-2.5 py-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-1.5">
            <DollarSign className="h-3 w-3" /> Salary range
          </span>
          <p className="text-sm text-text-title font-medium">{career.salaryRange}</p>
        </div>
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-1.5">
            <TrendingUp className="h-3 w-3" /> Outlook
          </span>
          <p className="text-sm text-text-title font-medium">{career.growthOutlook}</p>
        </div>
      </div>

      <div className="mt-5">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-2">
          <GitBranch className="h-3 w-3" /> Roadmap
        </span>
        <ol className="flex flex-col gap-1.5">
          {career.roadmap.map((step, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text-muted font-light leading-relaxed">
              <span className="text-electric-blue font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-2">
          <Link2 className="h-3 w-3" /> Where to start
        </span>
        <div className="flex flex-col gap-1.5">
          {career.resources.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm text-text-muted hover:text-electric-blue transition-colors group"
            >
              <span className="underline decoration-card-border underline-offset-4 group-hover:decoration-electric-blue">
                {r.name}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted shrink-0 ml-3">
                {r.type}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-card-border">
        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-2">
          <MessageSquare className="h-3 w-3" /> Advice from Motun
        </span>
        <blockquote className="text-sm text-text-muted font-light italic leading-relaxed border-l-2 border-electric-blue/30 pl-4">
          {career.adviceFromMotun}
        </blockquote>
      </div>
    </motion.div>
  );
}

export default function QuizResults({ result, onRestart }: { result: QuizResult; onRestart: () => void }) {
  const [copied, setCopied] = useState(false);
  const [top, ...rest] = result.matches;
  const axisEntries = (Object.keys(AXIS_LABELS) as CareerAxisKey[]);
  const maxAxis = Math.max(...axisEntries.map((k) => result.axes[k]), 1);

  const handleShare = async () => {
    const text = `I just found out my top tech career match is ${top?.career.title ?? "a tech role"} on WEBMUSE's Career Path assessment.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Career Path result", text, url: window.location.origin + "/career-path" });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(`${text} ${window.location.origin}/career-path`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!top) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Something went wrong scoring your answers.</p>
        <button onClick={onRestart} className="mt-4 text-electric-blue underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
          Your results
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-title mt-3 text-balance">
          Your top tech career matches.
        </h1>
        <p className="text-text-muted font-light mt-3 max-w-lg mx-auto">
          Based on how you answered, not a quiz stereotype — here&apos;s where your instincts actually point.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground font-mono hover:border-electric-blue/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-electric-blue" />}
            {copied ? "Copied" : "Share results"}
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground font-mono hover:border-electric-blue/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
          >
            <RefreshCw className="h-3.5 w-3.5 text-electric-blue" />
            Retake
          </button>
        </div>
      </motion.div>

      {/* Axis breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glassmorphism-card rounded-2xl p-6 md:p-7 mb-8"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Your working style</span>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-4">
          {axisEntries.map((k) => (
            <AxisBar key={k} axisKey={k} value={result.axes[k]} max={maxAxis} />
          ))}
        </div>
      </motion.div>

      <MatchCard match={top} rank={0} />

      {rest.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold text-text-title tracking-tight text-center mb-6">
            Also worth exploring
          </h2>
          <div className="flex flex-col gap-6">
            {rest.map((m, i) => (
              <MatchCard key={m.career.id} match={m} rank={i + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
