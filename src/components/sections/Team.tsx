"use client";

import { useCursor } from "@/components/ui/CustomCursor";
import { Terminal as TerminalIcon } from "lucide-react";

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  telemetry: {
    workstation: string;
    commits: string;
    commitsLabel: string;
    uptime: string;
    beverage: string;
  };
  detailsPanel: {
    title: string;
    codeSnippet: string;
  };
  avatarColor: string;
}

const FOUNDERS: TeamMember[] = [
  {
    name: "Marteen Motun Mubaraq",
    role: "Co-Founder & Chief Product Architect",
    bio: "The pillar behind every project that comes through WEBMUSE — shaping product vision, leading engineering execution, and architecting the systems each build stands on.",
    focus: ["Product Vision", "Engineering Leadership", "System Architecture", "Go-to-Market Alignment"],
    telemetry: {
      workstation: "Active / Online",
      commits: "Product, Engineering & Architecture",
      commitsLabel: "Core Focus",
      uptime: "Go-to-Market",
      beverage: "Espresso"
    },
    detailsPanel: {
      title: "Product Spec Validator",
      codeSnippet: `// Verify Product Specs
const validateSpec = (prd) => {
  const gates = prd.approvalGates;
  const isSecure = gates.every(g => g.status === 'SIGNED_OFF');
  return isSecure ? 'PROCEED_TO_ENGINEERING' : 'BLOCK';
};`
    },
    avatarColor: "#0070f3"
  },
  {
    name: "Oluwatosin Florence Atere",
    role: "Co-Founder & Chief Systems Engineer",
    bio: "Crafting intuitive, high-fidelity user experiences while engineering the resilient systems and cloud infrastructure behind them — real-time geofenced streams, micro-latency caching, and modular backend architecture. Leads UX direction, systems engineering, and cloud orchestration at WEBMUSE.",
    focus: ["UX/UI Design", "Systems Engineering", "Cloud Orchestration", "Edge Infrastructure"],
    telemetry: {
      workstation: "Active / Online",
      commits: "UX, Systems & Cloud",
      commitsLabel: "Core Focus",
      uptime: "DevOps",
      beverage: "Cold Brew"
    },
    detailsPanel: {
      title: "Geofence Engine Logs",
      codeSnippet: `// Geofence Route Ingestion
router.post('/geofence/ingress', async (req) => {
  const { coords, org_id } = req.body;
  const inRange = await PostGIS.checkRange(coords, org_id);
  if (!inRange) throw new GeofenceBreachError();
  return { status: 'SECURED' };
});`
    },
    avatarColor: "#a855f7"
  }
];

export default function Team() {
  const { setCursorType } = useCursor();

  // Synthetic Audio feedback using Web Audio API (simulates futuristic interface clicks/hums)
  const playBeep = (freq: number, type: OscillatorType = "sine") => {
    try {
      const audioCtx = new (window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext not supported or blocked by user interaction policy
    }
  };

  return (
    <section id="team" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Dynamic mist glow */}
      <div className="absolute top-[40%] left-[20%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 md:mb-20">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            LEADERSHIP
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-title mt-4">
            Meet the Founders.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            WEBMUSE is steered by design architects and systems engineers committed to quality. We write strict specifications and deploy high-performance software fortresses.
          </p>
        </div>

        {/* Founders Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {FOUNDERS.map((founder, idx) => {
            return (
              <div
                key={founder.name}
                onMouseEnter={() => {
                  setCursorType("expand");
                  playBeep(idx === 0 ? 320 : 380, "triangle");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
                className="group flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-card-border/80"
              >
                {/* Background lighting flare */}
                <div 
                  className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-10 blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-20" aria-hidden="true"
                  style={{ backgroundColor: founder.avatarColor }}
                />

                <div>
                  {/* Founder Profile Details */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    
                    {/* SVG Vector Abstract Avatar (replacing boring standard photos) */}
                    <div className="relative h-20 w-20 rounded-full border border-card-border bg-background flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <radialGradient id={`avatar-glow-${idx}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={founder.avatarColor} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={founder.avatarColor} stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="42" fill={`url(#avatar-glow-${idx})`} />
                        {/* Dynamic vector node shapes */}
                        {idx === 0 ? (
                          <>
                            {/* Product Architect geometry shapes */}
                            <rect x="35" y="35" width="30" height="30" rx="4" fill="none" stroke={founder.avatarColor} strokeWidth="1.5" className="animate-pulse-slow" />
                            <circle cx="50" cy="50" r="6" fill="#f4f4f5" />
                            <line x1="50" y1="20" x2="50" y2="80" stroke={founder.avatarColor} strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="20" y1="50" x2="80" y2="50" stroke={founder.avatarColor} strokeWidth="1" strokeDasharray="3 3" />
                          </>
                        ) : (
                          <>
                            {/* Systems Engineer database-like loops */}
                            <circle cx="50" cy="50" r="24" fill="none" stroke={founder.avatarColor} strokeWidth="1.5" />
                            <circle cx="50" cy="50" r="16" fill="none" stroke="#f4f4f5" strokeWidth="1" />
                            <circle cx="50" cy="50" r="6" fill={founder.avatarColor} />
                            {/* Orbiting nodes */}
                            <circle cx="50" cy="26" r="3" fill="#ffffff" />
                            <circle cx="50" cy="74" r="3" fill="#ffffff" />
                          </>
                        )}
                      </svg>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-electric-blue uppercase">
                        CO-FOUNDER
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight text-text-title mt-1">
                        {founder.name}
                      </h3>
                      <p className="text-text-muted text-sm font-light mt-0.5">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  {/* Biography */}
                  <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  {/* Focus Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {founder.focus.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-card-bg/60 border border-card-border text-foreground/80 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower telemetry panel */}
                <div>
                  <div className="border-t border-card-border pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">
                        Workstation
                      </span>
                      <span className="text-xs font-semibold text-text-title mt-1 block font-mono">
                        {founder.telemetry.workstation}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">
                        {founder.telemetry.commitsLabel}
                      </span>
                      <span className="text-xs font-semibold text-electric-blue mt-1 block font-mono">
                        {founder.telemetry.commits}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">
                        Also Leads
                      </span>
                      <span className="text-xs font-semibold text-text-title mt-1 block font-mono">
                        {founder.telemetry.uptime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">
                        Energy Source
                      </span>
                      <span className="text-xs font-semibold text-text-title mt-1 block font-mono truncate">
                        {founder.telemetry.beverage}
                      </span>
                    </div>
                  </div>

                  {/* Workspace Telemetry Code Frame Drawer */}
                  <div className="relative rounded-lg border border-card-border bg-background/50 p-4 font-mono text-[11px] text-text-muted leading-relaxed">
                    <div className="flex justify-between items-center border-b border-card-border pb-2 mb-2 text-[10px] uppercase">
                      <span className="flex items-center gap-1">
                        <TerminalIcon className="h-3 w-3 text-electric-blue" />
                        {founder.detailsPanel.title}
                      </span>
                      <span className="text-[9px] text-green-500 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        ONLINE
                      </span>
                    </div>
                    <pre className="text-foreground/90 overflow-x-auto select-none whitespace-pre">
                      {founder.detailsPanel.codeSnippet}
                    </pre>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
