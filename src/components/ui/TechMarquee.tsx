"use client";

import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import { Sparkles } from "lucide-react";

interface TechBadge {
  name: string;
  category: string;
  color: string;
}

const TECH_ROW_1: TechBadge[] = [
  { name: "Next.js 16", category: "Core Framework", color: "#0070f3" },
  { name: "Gemini 2.0", category: "Cognitive AI", color: "#a855f7" },
  { name: "PostGIS", category: "Geospatial GIS", color: "#10b981" },
  { name: "MongoDB Atlas", category: "Document DB", color: "#34d399" },
  { name: "Redis / BullMQ", category: "Queue Engine", color: "#ef4444" },
  { name: "React 19", category: "UI Engine", color: "#38bdf8" },
  { name: "Solidity", category: "EVM Contracts", color: "#f59e0b" },
  { name: "TypeScript", category: "Type Safety", color: "#3b82f6" },
];

const TECH_ROW_2: TechBadge[] = [
  { name: "Stacks Clarity 3", category: "Bitcoin L2", color: "#8b5cf6" },
  { name: "PostgreSQL RLS", category: "Relational DB", color: "#0284c7" },
  { name: "FastAPI", category: "Async Python", color: "#059669" },
  { name: "Vercel AI SDK", category: "Edge AI", color: "#ec4899" },
  { name: "Three.js", category: "WebGL Graphics", color: "#6366f1" },
  { name: "Foundry", category: "Contract Testing", color: "#f97316" },
  { name: "Tailwind CSS", category: "Design System", color: "#06b6d4" },
  { name: "Docker", category: "Containerization", color: "#2563eb" },
];

export default function TechMarquee() {
  const { setCursorType } = useCursor();

  return (
    <section aria-label="Technology primitives marquee" className="relative py-8 bg-background border-y border-card-border overflow-hidden select-none">
      {/* Dynamic mist glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[600px] bg-mesh-blue opacity-10 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Row 1 (Left to Right) */}
        <div className="flex w-max space-x-4 animate-marquee hover:[animation-play-state:paused]">
          {[...TECH_ROW_1, ...TECH_ROW_1, ...TECH_ROW_1].map((item, idx) => (
            <div
              key={`r1-${idx}`}
              onMouseEnter={() => {
                setCursorType("pointer");
                audioSynth.playTypeTick();
              }}
              onMouseLeave={() => setCursorType("default")}
              className="flex items-center gap-2.5 rounded-full border border-card-border bg-card-bg/60 backdrop-blur-md px-4 py-2 text-xs font-mono transition-all hover:border-electric-blue/40 hover:bg-card-bg"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-text-title tracking-tight">{item.name}</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted border-l border-card-border pl-2">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 (Right to Left) */}
        <div className="flex w-max space-x-4 animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2].map((item, idx) => (
            <div
              key={`r2-${idx}`}
              onMouseEnter={() => {
                setCursorType("pointer");
                audioSynth.playTypeTick();
              }}
              onMouseLeave={() => setCursorType("default")}
              className="flex items-center gap-2.5 rounded-full border border-card-border bg-card-bg/60 backdrop-blur-md px-4 py-2 text-xs font-mono transition-all hover:border-neon-purple/40 hover:bg-card-bg"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-text-title tracking-tight">{item.name}</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted border-l border-card-border pl-2">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-text-muted uppercase tracking-widest">
        <Sparkles className="h-3 w-3 text-electric-blue" />
        <span>Verified Technical Stack Primitives</span>
      </div>
    </section>
  );
}
