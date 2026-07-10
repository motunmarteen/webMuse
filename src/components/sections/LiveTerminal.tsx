"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { Terminal, Shield, RefreshCw, Layers, ExternalLink, Activity } from "lucide-react";
import { audioSynth } from "@/utils/audioSynth";

interface LogLine {
  text: string;
  type: "info" | "success" | "command" | "code";
}

const TERMINAL_PHASES = [
  {
    title: "1. Core Framework Setup",
    command: "npx create-next-app@latest webmuse-studio --typescript --tailwind --app",
    logs: [
      { text: "$ npx create-next-app@latest webmuse-studio --typescript --tailwind --app", type: "command" },
      { text: "Creating a new Next.js app in C:/Users/Hp/Desktop/webmuse-studio.", type: "info" },
      { text: "Installing react, react-dom, next...", type: "info" },
      { text: "Installing devDependencies: typescript, tailwindcss, postcss...", type: "info" },
      { text: "✓ Scaffold completed successfully.", type: "success" }
    ],
    previewState: "scaffolding"
  },
  {
    title: "2. Database & Security Provisioning",
    command: "npx prisma db push && npm run setup-auth",
    logs: [
      { text: "$ npx prisma db push && npm run setup-auth", type: "command" },
      { text: "Prisma schema loaded. Connecting to PostgreSQL Database Cluster...", type: "info" },
      { text: "✓ Database schema push completed. Active connections initialized.", type: "success" },
      { text: "Configuring geo-fencing policies & OAuth security layers...", type: "info" },
      { text: "✓ Auth configurations loaded. Keys secured in environment vaults.", type: "success" }
    ],
    previewState: "database"
  },
  {
    title: "3. Component Compilation & Build",
    command: "npm run build",
    logs: [
      { text: "$ npm run build", type: "command" },
      { text: "Creating an optimized production build via Next.js Turbopack compiler...", type: "info" },
      { text: "✓ Compiled successfully in 280ms.", type: "success" },
      { text: "Running TypeScript types compiler checks...", type: "info" },
      { text: "✓ Finished TypeScript types compilation successfully.", type: "success" }
    ],
    previewState: "compiling"
  },
  {
    title: "4. Global Edge Deployment",
    command: "vercel deploy --prod",
    logs: [
      { text: "$ vercel deploy --prod", type: "command" },
      { text: "Deploying source bundle to global Edge networks...", type: "info" },
      { text: "Route (app): / (Static), /_not-found (Static)", type: "info" },
      { text: "✓ Deployed to edge Vercel network: https://webmuse.tech", type: "success" },
      { text: "✓ System verification test passed. Green light, live nodes active.", type: "success" }
    ],
    previewState: "live"
  }
] as const;

export default function LiveTerminal() {
  const [activePhase, setActivePhase] = useState(0);
  const [printedLogs, setPrintedLogs] = useState<LogLine[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const { setCursorType } = useCursor();

  useEffect(() => {
    const currentPhase = TERMINAL_PHASES[activePhase];
    if (logIndex < currentPhase.logs.length) {
      const timer = setTimeout(() => {
        const nextLog = currentPhase.logs[logIndex];
        setPrintedLogs((prev) => [...prev, nextLog]);

        if (nextLog.type === "success") {
          audioSynth.playSuccess();
        } else {
          audioSynth.playTypeTick();
        }

        setLogIndex((prev) => prev + 1);
      }, 700 + Math.random() * 400); // realistic log printing delays
      return () => clearTimeout(timer);
    } else {
      // All logs printed for this phase, wait and move to next
      const timer = setTimeout(() => {
        setActivePhase((prev) => (prev + 1) % TERMINAL_PHASES.length);
        setPrintedLogs([]);
        setLogIndex(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activePhase, logIndex]);

  const handlePhaseButtonClick = (idx: number) => {
    audioSynth.playClick();
    setActivePhase(idx);
    setPrintedLogs([]);
    setLogIndex(0);
  };

  return (
    <section id="terminal" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 md:mb-16">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            ENGINEERING PROCESS DEMO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
            Watch ideas compile into digital reality.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            A simulated walkthrough of our automated software delivery cycle. From framework scaffolding and database provisioning to compiler checks and edge deployments, this is how code transitions into production on a WEBMUSE build.
          </p>
        </div>

        {/* Console Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Build Console (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg p-6 md:p-8 min-h-[465px]">
            <div>
              {/* Terminal Window Header chrome bar */}
              <div className="flex items-center justify-between border-b border-card-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <span className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <div className="flex items-center gap-2 text-text-muted font-mono text-xs ml-4">
                    <Terminal className="h-4 w-4 text-electric-blue" />
                    <span>sh - build_agent_01.sh</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted bg-card-bg/80 border border-card-border rounded px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>AGENT ONLINE</span>
                </div>
              </div>

              {/* Terminal Phase Progress Indicators */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {TERMINAL_PHASES.map((p, idx) => (
                  <button
                    key={p.title}
                    onClick={() => handlePhaseButtonClick(idx)}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === activePhase
                        ? "bg-electric-blue shadow-[0_0_8px_rgba(0,112,243,0.5)]"
                        : idx < activePhase
                        ? "bg-foreground/45"
                        : "bg-card-border"
                    }`}
                    title={p.title}
                  />
                ))}
              </div>

              {/* Log Output Stream */}
              <div className="font-mono text-xs space-y-3 min-h-[220px]">
                <AnimatePresence mode="popLayout">
                  {printedLogs.map((log, idx) => (
                    <motion.div
                      key={`${log.text}-${idx}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`leading-relaxed ${
                        log.type === "command"
                          ? "text-foreground font-bold"
                          : log.type === "success"
                          ? "text-green-500 flex items-start gap-1.5"
                          : "text-text-muted"
                      }`}
                    >
                      {log.type === "command" ? (
                        <span>{log.text}</span>
                      ) : log.type === "success" ? (
                        <>
                          <span className="text-green-500">✓</span>
                          <span>{log.text.replace("✓ ", "")}</span>
                        </>
                      ) : (
                        <span>{log.text}</span>
                      )}
                    </motion.div>
                  ))}
                  {logIndex < TERMINAL_PHASES[activePhase].logs.length && (
                    <motion.div
                      key="cursor-blink"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="h-4 w-2 bg-electric-blue inline-block ml-1"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Terminal SLA Footer */}
            <div className="mt-8 border-t border-card-border pt-6 flex items-center justify-between text-[10px] font-mono text-text-muted uppercase">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-electric-blue" />
                Simulated Build Log
              </span>
              <span className="flex items-center gap-1">
                Example Branch: <span className="text-foreground">production</span>
              </span>
            </div>
          </div>

          {/* Right Column: Simulated Live Output Preview (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg p-6 md:p-8 min-h-[465px]">
            <div>
              {/* Preview Window Header */}
              <div className="flex items-center justify-between border-b border-card-border pb-4 mb-6">
                <span className="text-xs font-mono font-bold text-text-title uppercase tracking-wider">
                  Live View Render
                </span>
                <div className="h-2 w-2 rounded-full bg-electric-blue animate-pulse" />
              </div>

              {/* Viewport Canvas mockups */}
              <div className="relative border border-card-border bg-background/50 rounded-xl min-h-[260px] overflow-hidden flex items-center justify-center p-6 text-center shadow-inner">
                <AnimatePresence mode="wait">
                  
                  {/* Scaffolding State */}
                  {TERMINAL_PHASES[activePhase].previewState === "scaffolding" && (
                    <motion.div
                      key="scaffold-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full border-2 border-dashed border-electric-blue animate-spin" />
                        <Layers className="absolute h-5 w-5 text-electric-blue" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-title font-mono uppercase tracking-widest">
                          Scaffolding Sandbox
                        </h4>
                        <p className="text-text-muted text-xs font-light mt-1.5 max-w-xs leading-relaxed">
                          Compiling React frameworks, tailwind compilation rules, and directory routes structure.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Database Provisioning State */}
                  {TERMINAL_PHASES[activePhase].previewState === "database" && (
                    <motion.div
                      key="database-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full border border-card-border flex items-center justify-center bg-card-bg">
                          <Shield className="h-6 w-6 text-neon-purple animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-title font-mono uppercase tracking-widest">
                          Provisioning Ledger
                        </h4>
                        <p className="text-text-muted text-xs font-light mt-1.5 max-w-xs leading-relaxed">
                          Linking PostgreSQL database shards. Mapping security tokens, cryptographic keys, and user authentication tables.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Compiling State */}
                  {TERMINAL_PHASES[activePhase].previewState === "compiling" && (
                    <motion.div
                      key="compile-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative flex items-center justify-center">
                        <RefreshCw className="h-8 w-8 text-soft-cyan animate-spin" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-title font-mono uppercase tracking-widest">
                          Turbopack Compiler
                        </h4>
                        <p className="text-text-muted text-xs font-light mt-1.5 max-w-xs leading-relaxed">
                          Packaging bundles, compiling static modules, running TypeScript audits, and preparing production assets.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Live State Mock */}
                  {TERMINAL_PHASES[activePhase].previewState === "live" && (
                    <motion.div
                      key="live-view"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="w-full flex flex-col gap-4 text-left"
                    >
                      {/* Browser mockup header */}
                      <div className="rounded-lg border border-card-border bg-card-bg p-3 shadow-md">
                        <div className="flex items-center gap-2 mb-2 border-b border-card-border pb-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400" />
                          <span className="h-2 w-2 rounded-full bg-green-400" />
                          <div className="flex-grow bg-background/80 rounded border border-card-border text-[9px] font-mono px-3 py-0.5 text-text-muted text-center flex items-center justify-center gap-1">
                            <span>https://webmuse.tech</span>
                            <ExternalLink className="h-2 w-2" />
                          </div>
                        </div>
                        {/* Live Site Mock Body */}
                        <div className="space-y-2 py-1">
                          <div className="h-3 w-16 bg-foreground rounded" />
                          <div className="h-5 w-32 bg-electric-blue rounded" />
                          <div className="h-2 w-full bg-card-border rounded" />
                          <div className="h-2 w-2/3 bg-card-border rounded" />
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="h-10 bg-background/50 border border-card-border rounded p-2 flex flex-col justify-between">
                              <div className="h-1.5 w-6 bg-card-border rounded" />
                              <div className="h-2 w-12 bg-electric-blue rounded" />
                            </div>
                            <div className="h-10 bg-background/50 border border-card-border rounded p-2 flex flex-col justify-between">
                              <div className="h-1.5 w-6 bg-card-border rounded" />
                              <div className="h-2 w-12 bg-neon-purple rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Sandbox Status Button */}
            <div className="mt-8 border-t border-card-border pt-6 flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                Archetype: NextJS App
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-text-title font-semibold uppercase tracking-wider">
                  ACTIVE ON EDGE
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
