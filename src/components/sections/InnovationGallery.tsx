"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import {
  ArrowRight,
  HelpCircle,
  Search,
  Palette,
  Layers,
  TrendingUp,
  Sparkles,
  type LucideIcon
} from "lucide-react";

interface StatsMockupData {
  metrics: { label: string; value: string }[];
}

interface WireframeMockupData {
  title: string;
  items: string[];
}

interface UiDashboardMockupData {
  title: string;
  balance: string;
  trend: string;
  vaults: { name: string; apy: string; active: boolean }[];
}

interface SystemFlowMockupData {
  nodes: { label: string; x: number; y: number }[];
}

type MockupData = StatsMockupData | WireframeMockupData | UiDashboardMockupData | SystemFlowMockupData;

interface NarrativeStep {
  label: string;
  title: string;
  icon: LucideIcon;
  content: string;
  mockupType: "text" | "stats" | "ui-dashboard" | "system-flow" | "wireframe";
  mockupData: MockupData;
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  steps: NarrativeStep[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: "neyborhuud",
    title: "Neyborhuud",
    tagline: "Connecting local communities through trusted transactions.",
    category: "Hyperlocal PWA & FinTech",
    steps: [
      {
        label: "Problem",
        title: "Community Trust & Churn",
        icon: HelpCircle,
        content: "Neighborhood classified listings on traditional social networks lack verification. Local trades, helper services, and peer transactions frequently suffer from lack of trust, payment disputes, and complex verification systems.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Community Fraud", value: "32%" },
            { label: "User Trust Gap", value: "78%" },
          ]
        }
      },
      {
        label: "Research",
        title: "Mapping Geo-Fenced Activity",
        icon: Search,
        content: "We interviewed 120 community groups. Residents demanded a localized feed that mirrors neighbor activities, combined with instant secure authentication and verified trade escrows to guarantee trade safety.",
        mockupType: "wireframe",
        mockupData: {
          title: "Geolocated Flow",
          items: ["Hyperlocal Feed Mirror", "Peer Verified Auth", "Geo-Fenced Active Lockups"]
        }
      },
      {
        label: "UI Design",
        title: "Visualizing Proximity Feeds",
        icon: Palette,
        content: "Designed a mobile-first Progressive Web App layout. Highlighting clean profile verification badges, interactive geographical maps, and an streamlined local activities feed using neon teal and electric blue accents.",
        mockupType: "ui-dashboard",
        mockupData: {
          title: "Neyborhuud Feed",
          balance: "Lagos Community",
          trend: "2.4k Active",
          vaults: [
            { name: "Local Handyman Trade", apy: "Verified", active: true },
            { name: "Equipment Rental Lockup", apy: "Secured", active: true },
            { name: "Community Garden Meet", apy: "Public", active: false },
          ]
        }
      },
      {
        label: "Architecture",
        title: "PWA Client & Geo API Server",
        icon: Layers,
        content: "Architected a decoupled React PWA client. The backend server maps geolocation routes and utilizes an escrow-free direct peer payment engine with secure tokenized user authentication APIs.",
        mockupType: "system-flow",
        mockupData: {
          nodes: [
            { label: "Next.js PWA Client", x: 10, y: 50 },
            { label: "Express Geolocation Route", x: 45, y: 50 },
            { label: "Direct Peer Ledger", x: 80, y: 50 }
          ]
        }
      },
      {
        label: "Business Results",
        title: "Hyperlocal Adoption Spark",
        icon: TrendingUp,
        content: "Neyborhuud successfully onboarded over 2,400 residents across Lagos. Transaction dispute rates fell to 0%, app load metrics achieved 99.98% reliability, and active community participation rose by 4.2x.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Active Neighbors", value: "2.4k" },
            { label: "Dispute Rate", value: "0%" },
            { label: "Onboarding Speed", value: "90s" }
          ]
        }
      }
    ]
  },
  {
    id: "seth",
    title: "Seth HSE",
    tagline: "Enforcing Health, Safety, and Environment compliance through verified, real-time geofenced telemetry.",
    category: "HSE Compliance & Geofencing Platform",
    steps: [
      {
        label: "Problem",
        title: "Regulatory Gaps & Incident Blindspots",
        icon: HelpCircle,
        content: "Industrial operations struggle to enforce Health, Safety, and Environment (HSE) standards across distributed job sites. Unreported hazard logs, delayed incident warnings, and GPS spoofing lead to high compliance fines and preventable accidents.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "HSE Violations", value: "48%" },
            { label: "Incident Lag", value: "4.5h" },
          ]
        }
      },
      {
        label: "Research",
        title: "Auditing Industrial Quality Gates",
        icon: Search,
        content: "We audited 3 job sites and mapped 25-pillar engineering standards. Field workers required simple mobile onboarding, while admins demanded real-time Socket.IO incident reporting streams and Postgres/PostGIS geofenced verification loops.",
        mockupType: "wireframe",
        mockupData: {
          title: "Seth Geofenced Mesh",
          items: ["Worker Geolocation Sync", "Real-Time Incident Stream", "RLS Org Scoping Locks"]
        }
      },
      {
        label: "UI Design",
        title: "High-Fidelity Compliance Hub",
        icon: Palette,
        content: "Designed a clean, responsive admin dashboard in Next.js. Promotes verified incident charts, active geofenced map pins (utilizing Leaflet/PostGIS), and rapid worker onboarding workflows styled with modern dark aesthetics.",
        mockupType: "ui-dashboard",
        mockupData: {
          title: "Seth Active Zones",
          balance: "Lagos Hub Ops",
          trend: "100% Compliant",
          vaults: [
            { name: "Port Terminal Alpha", apy: "Geofenced", active: true },
            { name: "Warehouse Construction", apy: "Geofenced", active: true },
            { name: "Offshore Platform B", apy: "Offline", active: false }
          ]
        }
      },
      {
        label: "Architecture",
        title: "Modular Monolith Backend",
        icon: Layers,
        content: "Architected a modular Node.js/TypeScript Express backend. Secures tenant resources using shared Postgres databases with row-level security (RLS) locks, and utilizes Redis cache databases to queue real-time Socket.IO incidents.",
        mockupType: "system-flow",
        mockupData: {
          nodes: [
            { label: "Next.js Web / Flutter Mobile", x: 10, y: 50 },
            { label: "Express Mod-Monolith Router", x: 45, y: 50 },
            { label: "PostgreSQL / PostGIS Shards", x: 80, y: 50 }
          ]
        }
      },
      {
        label: "Business Results",
        title: "Fortress Quality Standards",
        icon: TrendingUp,
        content: "Seth successfully launched its Phase-0 engineering foundation. It achieved strict NDPR and GDPR privacy compliance, lowered geolocated alert latency to under 300ms, and passed 25 rigorous approval audit gates.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Alert Latency", value: "<300ms" },
            { label: "Security Gates", value: "25/25" },
            { label: "Compliance Score", value: "100%" }
          ]
        }
      }
    ]
  },
  {
    id: "elytse",
    title: "Elytse",
    tagline: "Social fashion marketplace utilizing AI and 3D body measurements.",
    category: "AI & Social Commerce",
    steps: [
      {
        label: "Problem",
        title: "Fitting Room Friction & Returns",
        icon: HelpCircle,
        content: "Online apparel shoppers struggle with size uncertainty. Poor sizing leads to a 40% return rate, high shipping overheads, and consumer frustration with standard static sizing charts.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Apparel Returns", value: "40%" },
            { label: "Sizing Confusion", value: "85%" }
          ]
        }
      },
      {
        label: "Research",
        title: "Mapping Virtual Fitting Demands",
        icon: Search,
        content: "Surveyed 300 online fashion buyers. 82% requested an interactive virtual fitting room that mirrors real-life fits, combined with community styling reviews and automated shape profile recommendations.",
        mockupType: "wireframe",
        mockupData: {
          title: "3D Fit Scan Flow",
          items: ["Camera Capture Pipeline", "AI Body Estimation Mesh", "Avatar Dressing Simulation"]
        }
      },
      {
        label: "UI Design",
        title: "3D Fitting Room & Social Style Feed",
        icon: Palette,
        content: "Designed a high-fidelity glassmorphic mobile application interface. Highlighted an interactive 3D body measurement creator, virtual avatar fit previews, and a clean social styles feed with soft lavender and neon pink highlights.",
        mockupType: "ui-dashboard",
        mockupData: {
          title: "Elytse Fitting Room",
          balance: "Fitting Avatar Active",
          trend: "Perfect Fit",
          vaults: [
            { name: "3D Scanning Calibration", apy: "Calibrated", active: true },
            { name: "Personal Avatar Model", apy: "Rendered", active: true },
            { name: "AI Size Recommendation", apy: "Size M", active: true }
          ]
        }
      },
      {
        label: "Architecture",
        title: "AI Measurement Pipeline & WebGL Renderer",
        icon: Layers,
        content: "Built a low-latency WebGL-based avatar customizer running on Next.js. Integrates with Python-based computer vision APIs on the backend to estimate exact body dimensions from user photos in under 5 seconds.",
        mockupType: "system-flow",
        mockupData: {
          nodes: [
            { label: "WebGL Avatar UI", x: 10, y: 50 },
            { label: "AI Computer Vision APIs", x: 45, y: 50 },
            { label: "3D Mesh Morphing Engine", x: 80, y: 50 }
          ]
        }
      },
      {
        label: "Business Results",
        title: "Transforming Digital Fitting Room Metrics",
        icon: TrendingUp,
        content: "Elytse pilot users saw returns plummet by 60%. Engagement increased by 3.5x, and users reported a 94% sizing accuracy rate using our 3D scanning engine.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Return Rate Drop", value: "-60%" },
            { label: "Sizing Accuracy", value: "94%" },
            { label: "User Engagement", value: "3.5x" }
          ]
        }
      }
    ]
  },
  {
    id: "novunt",
    title: "Novunt",
    tagline: "Automated algorithmic trading bot for decentralized exchanges.",
    category: "Web3 & FinTech",
    steps: [
      {
        label: "Problem",
        title: "Execution Slippage & MEV Front-Running",
        icon: HelpCircle,
        content: "DeFi traders lose millions daily to front-running bots, high gas slippage, and delayed trade execution on decentralized liquidity pools, causing high transaction overhead.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Avg Trade Slippage", value: "12%" },
            { label: "Front-Running Risk", value: "High" }
          ]
        }
      },
      {
        label: "Research",
        title: "Auditing Algorithmic Trading Pain Points",
        icon: Search,
        content: "Analyzed 500 high-frequency traders. They demanded a zero-knowledge execution environment, instant MEV-resistant routing, and customizable trading strategies.",
        mockupType: "wireframe",
        mockupData: {
          title: "Novunt Router Concept",
          items: ["Private Mempool Send", "Slippage Protections", "Cross-DEX Arbitrage Engine"]
        }
      },
      {
        label: "UI Design",
        title: "Tactical Trade Control Panel",
        icon: Palette,
        content: "Created a minimalist dark mode command dashboard. Visualized live trading charts, real-time profit logs, and interactive strategy nodes using electric green accents.",
        mockupType: "ui-dashboard",
        mockupData: {
          title: "Novunt Active Bots",
          balance: "9 Bots Running",
          trend: "Optimal Profit",
          vaults: [
            { name: "Arbitrage Bot USDC/USDT", apy: "24.5% APY", active: true },
            { name: "Momentum Bot ETH/USD", apy: "18.2% APY", active: true },
            { name: "Grid Bot SOL/USDC", apy: "Inactive", active: false }
          ]
        }
      },
      {
        label: "Architecture",
        title: "Low-Latency MEV-Resistant Node Pipeline",
        icon: Layers,
        content: "Architected a Go-based execution client. Utilizes private mempools to prevent front-running, and leverages Redis caches to track prices across multiple DEX liquidity pools.",
        mockupType: "system-flow",
        mockupData: {
          nodes: [
            { label: "Go Execution Bot", x: 10, y: 50 },
            { label: "Private RPC Mempool", x: 45, y: 50 },
            { label: "Liquidity Pools (DEX)", x: 80, y: 50 }
          ]
        }
      },
      {
        label: "Business Results",
        title: "Maximizing Yield & Security",
        icon: TrendingUp,
        content: "Novunt successfully executed over $80M in volume with zero MEV exploit losses. Average trade execution speed fell below 150ms, saving users 4.2% per transaction.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Trading Volume", value: "$80M+" },
            { label: "Execution Speed", value: "<150ms" },
            { label: "Avg Cost Savings", value: "4.2%" }
          ]
        }
      }
    ]
  },
  {
    id: "podly",
    title: "PODLY",
    tagline: "Proof of Deal infrastructure creating traceable trust through blockchain validation.",
    category: "Web3 & Blockchain Infrastructure",
    steps: [
      {
        label: "Problem",
        title: "Fragmented Agreement Verification",
        icon: HelpCircle,
        content: "Off-chain business deals, partnerships, and financial agreements lack traceable verification. Retrospective disputes arise from altered contracts, lack of cryptographic proof, and centralized verification vulnerabilities.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Agreement Disputes", value: "45%" },
            { label: "Verification Churn", value: "72%" }
          ]
        }
      },
      {
        label: "Research",
        title: "Auditing Trust Systems",
        icon: Search,
        content: "Consulted 80 venture firms and enterprise partners. 88% highlighted a critical need for a low-cost, tamper-proof system that validates deal milestones automatically and stores cryptographic proofs on-chain.",
        mockupType: "wireframe",
        mockupData: {
          title: "PODLY Trust Flow",
          items: ["Cryptographic Agreement Hash", "Multi-Sig Milestone Approval", "On-Chain Ledger Commit"]
        }
      },
      {
        label: "UI Design",
        title: "Clean Cryptographic Audit Interface",
        icon: Palette,
        content: "Designed an intuitive enterprise dashboard. Emphasizes clean deal status timelines, cryptographic document hash displays, and instant multi-signature approval controls using a dark graphite theme with electric cyan and white accents.",
        mockupType: "ui-dashboard",
        mockupData: {
          title: "PODLY Deals Hub",
          balance: "6 Active Contracts",
          trend: "All Validated",
          vaults: [
            { name: "Series-A Equity Deal", apy: "Validated", active: true },
            { name: "DEX Liquidity Agreement", apy: "Validated", active: true },
            { name: "Cross-Chain Asset Pool", apy: "Pending Signature", active: false }
          ]
        }
      },
      {
        label: "Architecture",
        title: "EVM Decentralized Ledger Interface",
        icon: Layers,
        content: "Architected a secure Solidity smart contract framework deployed on Ethereum-compatible layers. Utilizes IPFS for decentralized document storage and zero-knowledge proofs to verify contract details privately.",
        mockupType: "system-flow",
        mockupData: {
          nodes: [
            { label: "Document Hash Generator", x: 10, y: 50 },
            { label: "IPFS Storage Gateway", x: 45, y: 50 },
            { label: "Solidity Deal Registry", x: 80, y: 50 }
          ]
        }
      },
      {
        label: "Business Results",
        title: "Immutable Execution Speed",
        icon: TrendingUp,
        content: "PODLY pilot agreements successfully validated over $15M in deal values. Transaction confirmation speed achieved sub-second latency, reducing agreement trust audits from weeks to under 3 seconds.",
        mockupType: "stats",
        mockupData: {
          metrics: [
            { label: "Value Validated", value: "$15.4M" },
            { label: "Audit Latency", value: "<3s" },
            { label: "Dispute Reduction", value: "-92%" }
          ]
        }
      }
    ]
  }
];

export default function InnovationGallery() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const { setCursorType } = useCursor();

  const currentProject = PROJECTS_DATA[activeProjectIdx];
  const currentStep = currentProject.steps[activeStepIdx];

  const handleProjectSelect = (idx: number) => {
    audioSynth.playClick();
    setActiveProjectIdx(idx);
    setActiveStepIdx(0); // reset step
  };

  const handleStepSelect = (idx: number) => {
    audioSynth.playClick();
    setActiveStepIdx(idx);
  };

  return (
    <section id="gallery" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[50%] right-[0%] h-[400px] w-[400px] rounded-full bg-mesh-purple opacity-20 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-16">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              INNOVATION GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
              Products we&apos;ve built that define industries.
            </h2>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mt-4">
              Illustrative concept case studies
            </p>
          </div>
          {/* Project Toggles */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar py-2 -my-2 flex justify-start mt-8 lg:mt-0">
            <div className="flex gap-2 border border-card-border rounded-full p-1 bg-card-bg shrink-0 lg:ml-auto">
              {PROJECTS_DATA.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => handleProjectSelect(idx)}
                  onMouseEnter={() => {
                    setCursorType("pointer");
                    audioSynth.playClick();
                  }}
                  onMouseLeave={() => {
                    setCursorType("default");
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-mono ${
                    idx === activeProjectIdx
                      ? "bg-foreground text-background"
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Project Overview and Step Selector (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-6 md:p-8">
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              {currentProject.category}
            </span>
            <h3 className="text-3xl font-bold text-text-title tracking-tight mt-2">
              {currentProject.title}
            </h3>
            <p className="text-text-muted text-sm font-light mt-2">
              {currentProject.tagline}
            </p>

            {/* Narrative Step selector line (Desktop list) */}
            <div className="hidden lg:flex flex-col gap-2 mt-6">
              {currentProject.steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === activeStepIdx;
                return (
                  <button
                    key={step.label}
                    onClick={() => handleStepSelect(idx)}
                    onMouseEnter={() => {
                      setCursorType("pointer");
                      audioSynth.playClick();
                    }}
                    onMouseLeave={() => setCursorType("default")}
                    className={`flex items-center justify-between w-full p-3 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? "bg-card-bg/60 border-card-border text-foreground"
                        : "border-transparent text-text-muted hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isActive 
                          ? "bg-electric-blue/10 border-electric-blue/20 text-electric-blue" 
                          : "bg-card-bg border-card-border text-text-muted"
                      }`}>
                        <StepIcon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm font-medium tracking-tight">
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-text-muted">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Narrative Step selector row (Mobile swipeable ribbon) */}
            <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 mt-6 pb-2 shrink-0 w-full">
              {currentProject.steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === activeStepIdx;
                return (
                  <button
                    key={step.label}
                    onClick={() => {
                      audioSynth.playClick();
                      handleStepSelect(idx);
                    }}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-electric-blue/10 border-electric-blue/30 text-electric-blue"
                        : "bg-card-bg border-card-border text-text-muted hover:text-foreground"
                    }`}
                  >
                    <StepIcon className="h-3.5 w-3.5" />
                    <span>{step.label}</span>
                    <span className="text-[9px] font-mono opacity-60">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Narrative Content & Interactive Mockup (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-start gap-6 rounded-2xl border border-card-border bg-card-bg/40 p-6 md:p-8 relative min-h-[450px]">
            {/* Step Content */}
            <div>
              <h4 className="text-2xl font-bold tracking-tight text-text-title mb-4">
                {currentStep.title}
              </h4>
              <p className="text-text-muted font-light text-sm md:text-base leading-relaxed">
                {currentStep.content}
              </p>
            </div>

            {/* Interactive Mockup Render */}
            <div className="flex items-center justify-center w-full mt-4">
              <div className="w-full rounded-xl border border-card-border bg-background p-5 shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-center">
                {/* Decorative dots for terminal */}
                <div className="absolute top-3 left-4 flex gap-1.5 z-10">
                  <div className="h-2 w-2 rounded-full bg-red-500/50" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                  <div className="h-2 w-2 rounded-full bg-green-500/50" />
                </div>
                
                <AnimatePresence mode="wait">
                  {/* Mockup: Stats Display */}
                  {currentStep.mockupType === "stats" && (
                    <motion.div
                      key="stats"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-4 w-full"
                    >
                      {(currentStep.mockupData as StatsMockupData).metrics.map((m, idx) => (
                        <div key={m.label} className="p-4 rounded-xl border border-card-border bg-card-bg/40 flex flex-col justify-between items-center relative overflow-hidden group hover:border-electric-blue/30 transition-colors">
                          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase block relative z-10">
                            {m.label}
                          </span>
                          <div className="text-3xl md:text-4xl font-bold text-foreground mt-2 bg-gradient-to-r from-electric-blue to-soft-cyan bg-clip-text text-transparent glow-text-blue font-mono relative z-10">
                            {m.value}
                          </div>
                          <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-3 overflow-hidden relative z-10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: idx === 0 ? "85%" : idx === 1 ? "95%" : "70%" }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                              className="bg-gradient-to-r from-electric-blue to-soft-cyan h-full rounded-full" 
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Mockup: Wireframe Concept */}
                  {currentStep.mockupType === "wireframe" && (
                    <motion.div
                      key="wireframe"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex flex-col gap-2 mt-4 w-full"
                    >
                      <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-1">
                        {(currentStep.mockupData as WireframeMockupData).title}
                      </span>
                      {(currentStep.mockupData as WireframeMockupData).items.map((item, idx) => (
                        <div
                          key={item}
                          className="flex items-center justify-between border border-dashed border-card-border/60 hover:border-electric-blue/40 p-2.5 rounded-lg text-xs font-mono text-text-muted bg-card-bg/10 hover:bg-card-bg/20 hover:text-foreground transition-all duration-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-zinc-600 rounded-full" />
                            <span>{item}</span>
                          </div>
                          <span className="text-[9px] text-text-muted/40 font-mono tracking-wider" aria-hidden="true">X: 0.{idx + 2} Y: 1.4</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Mockup: Live UI Dashboard */}
                  {currentStep.mockupType === "ui-dashboard" && (
                    <motion.div
                      key="ui-dashboard"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="mt-4 flex flex-col gap-4 w-full"
                    >
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                            {(currentStep.mockupData as UiDashboardMockupData).title}
                          </span>
                          <div className="text-2xl font-bold text-foreground font-mono mt-0.5">
                            {(currentStep.mockupData as UiDashboardMockupData).balance}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-mono">
                          {(currentStep.mockupData as UiDashboardMockupData).trend}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {(currentStep.mockupData as UiDashboardMockupData).vaults.map((v) => (
                          <div
                            key={v.name}
                            className="flex items-center justify-between border border-card-border bg-card-bg/20 hover:bg-card-bg/40 p-2.5 rounded-lg text-xs hover:border-electric-blue/20 transition-all duration-300"
                          >
                            <span className="font-medium text-foreground flex items-center gap-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${v.active ? "bg-emerald-500 animate-pulse" : "bg-zinc-750"}`} />
                              {v.name}
                            </span>
                            <div className="flex items-center gap-3 font-mono text-xs">
                              <span className="text-text-muted">{v.apy}</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">Active</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Mockup: System Node Flow */}
                  {currentStep.mockupType === "system-flow" && (
                    <motion.div
                      key="system-flow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 relative h-[100px] flex items-center justify-between px-4 w-full"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[85%] h-[1px] bg-gradient-to-r from-electric-blue via-neon-purple to-soft-cyan border-dashed border-t border-card-border/80 relative">
                          <motion.div
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                            className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-electric-blue shadow-[0_0_12px_#0070f3]"
                          />
                        </div>
                      </div>

                      {(currentStep.mockupData as SystemFlowMockupData).nodes.map((node) => (
                        <div
                          key={node.label}
                          className="relative z-10 p-2.5 rounded-xl border border-card-border bg-background/90 text-[9px] font-mono text-text-muted hover:text-foreground hover:border-electric-blue/40 max-w-[120px] text-center shadow-2xl transition-all duration-300"
                        >
                          <div className="text-electric-blue font-bold text-[8px] uppercase tracking-widest mb-0.5">Node</div>
                          {node.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Magical Button directly under the mockup image/terminal */}
            <div className="mt-4 w-full">
              <a
                href="#booking"
                onClick={() => audioSynth.playClick()}
                onMouseEnter={() => {
                  setCursorType("pointer");
                  audioSynth.playClick();
                }}
                onMouseLeave={() => setCursorType("default")}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-dashed border-electric-blue/30 bg-electric-blue/5 hover:bg-electric-blue/10 hover:border-electric-blue/50 text-xs font-semibold uppercase tracking-widest text-electric-blue transition-all duration-300 font-mono shadow-[0_0_15px_rgba(0,112,243,0.03)] hover:shadow-[0_0_20px_rgba(0,112,243,0.12)] group animate-fade-in"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-electric-blue animate-pulse" />
                  Discuss a similar product
                </span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
