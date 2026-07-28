"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import {
  Calculator,
  Clock,
  Code2,
  Sparkles,
  ArrowRight,
  Check,
  Shield,
  Zap,
} from "lucide-react";

interface FeatureOption {
  id: string;
  name: string;
  category: string;
  hours: number;
  badge: string;
}

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: "ai", name: "Vector AI Search & Gemini Agent", category: "AI & ML", hours: 45, badge: "AI" },
  { id: "auth", name: "Multi-tenant Auth & RBAC Permissions", category: "Security", hours: 25, badge: "Security" },
  { id: "payments", name: "Stripe / NOWPayments Billing", category: "Fintech", hours: 30, badge: "Billing" },
  { id: "realtime", name: "WebSocket Push & Live Telemetry", category: "Backend", hours: 35, badge: "Real-time" },
  { id: "web3", name: "Smart Contracts & Wallet Connect", category: "Web3", hours: 55, badge: "Web3" },
  { id: "analytics", name: "Custom Analytics & Metrics Dashboard", category: "Data", hours: 30, badge: "Analytics" },
  { id: "pwa", name: "Progressive Web App (PWA) & Offline Sync", category: "Mobile", hours: 25, badge: "Mobile" },
];

export default function ScopeEstimator({
  onTransferScope,
}: {
  onTransferScope?: (details: string) => void;
}) {
  const [projectCategory, setProjectCategory] = useState<"saas" | "mobile" | "ai" | "web3">("saas");
  const [scale, setScale] = useState<"mvp" | "growth" | "enterprise">("growth");
  const [velocity, setVelocity] = useState<"sprint" | "balanced" | "robust">("balanced");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth", "payments"]);

  const { setCursorType } = useCursor();

  const toggleFeature = (id: string) => {
    audioSynth.playClick();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    let baseHours = scale === "mvp" ? 140 : scale === "growth" ? 280 : 600;
    let baseWeeks = scale === "mvp" ? 4 : scale === "growth" ? 8 : 16;

    const featureHours = selectedFeatures.reduce((acc, featId) => {
      const found = FEATURE_OPTIONS.find((f) => f.id === featId);
      return acc + (found ? found.hours : 0);
    }, 0);

    const totalHours = baseHours + featureHours;

    let adjustedWeeks = baseWeeks + Math.ceil(featureHours / 30);

    if (velocity === "sprint") adjustedWeeks = Math.max(3, Math.round(adjustedWeeks * 0.75));
    if (velocity === "robust") adjustedWeeks = Math.round(adjustedWeeks * 1.25);

    const minHours = Math.round(totalHours * 0.9);
    const maxHours = Math.round(totalHours * 1.15);

    let stack = ["Next.js 16", "TypeScript", "PostgreSQL", "Vercel Edge"];
    if (projectCategory === "ai") stack = ["Next.js 16", "FastAPI", "Gemini 2.0", "Pinecone Vector"];
    if (projectCategory === "web3") stack = ["React", "Solidity / Clarity 3", "Viem", "The Graph"];
    if (projectCategory === "mobile") stack = ["Next.js PWA", "React Native / Flutter", "Node.js", "Redis"];

    return {
      hours: `${minHours} - ${maxHours}`,
      weeks: `${adjustedWeeks} Weeks`,
      stack,
    };
  }, [projectCategory, scale, velocity, selectedFeatures]);

  const handleTransfer = () => {
    audioSynth.playClick();
    const featNames = selectedFeatures
      .map((id) => FEATURE_OPTIONS.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Scope Estimator Calculation: Category=${projectCategory.toUpperCase()}, Scale=${scale.toUpperCase()}, Velocity=${velocity.toUpperCase()}, Timeline=${estimate.weeks}, Hours=${estimate.hours}. Included Features: ${featNames || "Baseline Core"}.`;

    if (onTransferScope) {
      onTransferScope(text);
    }

    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="estimator" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      <div className="absolute top-[30%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-blue opacity-10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            SCOPE & COST CALCULATOR
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
            Estimate your build.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            Select your product category, scaling requirements, velocity preference, and modular features to view immediate engineering timelines and stack specs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Parameter Selection (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 rounded-2xl border border-card-border bg-card-bg p-6 md:p-8">
            
            {/* Category Selector */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-3">
                1. Select Product Category
              </span>
              <div role="group" aria-label="Select Product Category" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "saas", label: "Enterprise SaaS" },
                  { id: "mobile", label: "Mobile App" },
                  { id: "ai", label: "AI Cognitive System" },
                  { id: "web3", label: "Web3 & Ledger" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={projectCategory === cat.id}
                    onClick={() => {
                      audioSynth.playClick();
                      setProjectCategory(cat.id as typeof projectCategory);
                    }}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                      projectCategory === cat.id
                        ? "border-electric-blue bg-electric-blue/15 text-text-title shadow-lg shadow-electric-blue/10"
                        : "border-card-border bg-black/40 text-text-muted hover:text-foreground hover:border-card-border/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Selector */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-3">
                2. Target Scale & Capacity
              </span>
              <div role="group" aria-label="Target Scale and Capacity" className="grid grid-cols-3 gap-2">
                {[
                  { id: "mvp", label: "MVP (1-50k users)" },
                  { id: "growth", label: "Growth (50k-500k)" },
                  { id: "enterprise", label: "Enterprise (500k+)" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={scale === s.id}
                    onClick={() => {
                      audioSynth.playClick();
                      setScale(s.id as typeof scale);
                    }}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                      scale === s.id
                        ? "border-electric-blue bg-electric-blue/15 text-text-title"
                        : "border-card-border bg-black/40 text-text-muted hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Selector */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-3">
                3. Launch Velocity
              </span>
              <div role="group" aria-label="Launch Velocity" className="grid grid-cols-3 gap-2">
                {[
                  { id: "sprint", label: "Sprint (Accelerated)" },
                  { id: "balanced", label: "Balanced Cadence" },
                  { id: "robust", label: "Robust (Deep QA)" },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={velocity === v.id}
                    onClick={() => {
                      audioSynth.playClick();
                      setVelocity(v.id as typeof velocity);
                    }}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                      velocity === v.id
                        ? "border-neon-purple bg-neon-purple/15 text-text-title"
                        : "border-card-border bg-black/40 text-text-muted hover:text-foreground"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modular Features Selector */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-3">
                4. Select Modular Architecture Features
              </span>
              <div role="group" aria-label="Modular Architecture Features" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURE_OPTIONS.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleFeature(feat.id)}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                        isSelected
                          ? "border-electric-blue/50 bg-electric-blue/10 text-foreground"
                          : "border-card-border bg-black/20 text-text-muted hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? "border-electric-blue bg-electric-blue text-background" : "border-card-border"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{feat.name}</span>
                      </div>
                      <span className="text-[9px] uppercase font-mono tracking-wider text-text-muted shrink-0 border border-card-border px-1.5 py-0.5 rounded">
                        +{feat.hours}h
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Scope Calculation Panel (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg/50 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue to-neon-purple" />

            <div>
              <div className="flex items-center justify-between border-b border-card-border pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4.5 w-4.5 text-electric-blue" />
                  <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                    CALCULATED SCOPE SPEC
                  </span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REALTIME
                </span>
              </div>

              {/* Estimate Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-card-border bg-black/40 flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <Clock className="h-3 w-3 text-electric-blue" />
                    Timeline
                  </span>
                  <motion.span
                    key={estimate.weeks}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-text-title font-mono mt-2"
                  >
                    {estimate.weeks}
                  </motion.span>
                </div>

                <div className="p-4 rounded-xl border border-card-border bg-black/40 flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted flex items-center gap-1">
                    <Zap className="h-3 w-3 text-neon-purple" />
                    Eng Hours
                  </span>
                  <motion.span
                    key={estimate.hours}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-bold text-electric-blue font-mono mt-2"
                  >
                    {estimate.hours}h
                  </motion.span>
                </div>
              </div>

              {/* Stack Spec Preview */}
              <div className="p-4 rounded-xl border border-card-border bg-black/40 mb-6">
                <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block mb-2 flex items-center gap-1">
                  <Code2 className="h-3 w-3 text-electric-blue" />
                  Recommended Architecture Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {estimate.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono border border-card-border bg-card-bg px-2.5 py-1 rounded text-text-title"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security & SLA Guarantee */}
              <div className="p-4 rounded-xl border border-card-border bg-card-bg/30 text-xs font-mono text-text-muted flex items-start gap-2.5 leading-relaxed">
                <Shield className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  All WEBMUSE estimates include strict WCAG accessibility testing, Core Web Vitals optimization, and 30-day post-launch warranty.
                </span>
              </div>
            </div>

            {/* Transfer to Booking CTA */}
            <div className="mt-8 pt-6 border-t border-card-border">
              <button
                onClick={handleTransfer}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground py-3.5 text-xs font-semibold uppercase tracking-wider text-background hover:opacity-90 transition-opacity font-mono"
              >
                <Sparkles className="h-4 w-4 text-electric-blue" />
                Transfer Scope to Booking
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
