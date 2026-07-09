"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { 
  Lightbulb, 
  Search, 
  Map, 
  Paintbrush, 
  Terminal, 
  ShieldAlert, 
  Globe, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  deliverables: string[];
  icon: any;
  color: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Idea Validation",
    description: "We evaluate your product concept against market feasibility, explore engineering complexity, define high-level scopes, and validate technical risks.",
    deliverables: ["Product Feasibility Matrix", "Project Scope Specification", "Tech Stack Architecture Draft"],
    icon: Lightbulb,
    color: "#00f5ff"
  },
  {
    title: "Deep Research",
    description: "We analyze competitor capabilities, perform target audience audits, define user personas, and map existing data flows to identify friction points.",
    deliverables: ["UX Audit Report", "User Journey Flowcharts", "Competitor Comparison Matrix"],
    icon: Search,
    color: "#0070f3"
  },
  {
    title: "Product Strategy",
    description: "We define pricing mechanics, product market positioning, phase-by-phase feature backlogs, MVP release parameters, and business KPIs.",
    deliverables: ["Product Roadmap (Gantt)", "Feature Prioritization Matrix", "GTM Strategy Document"],
    icon: Map,
    color: "#a855f7"
  },
  {
    title: "Product Design",
    description: "We craft visual identity guides, high-fidelity mockups, dark/light modes, design systems, and responsive, interactive clickable prototypes.",
    deliverables: ["Interactive Figma Prototype", "Component Design Library", "Brand Visual Assets Pack"],
    icon: Paintbrush,
    color: "#d946ef"
  },
  {
    title: "Engineering",
    description: "Our engineers write modular, type-safe, production-ready source code, establish database structures, set up server-side scripts, and build vector integrations.",
    deliverables: ["Clean GitHub Repository Access", "Database Scheme Diagrams", "Deployed Staging Environment"],
    icon: Terminal,
    color: "#10b981"
  },
  {
    title: "Testing & QA",
    description: "We run unit test suites, conduct API endpoints stress tests, audit regulatory compliance, and execute user testing to eliminate edge-case bugs.",
    deliverables: ["QA Audit Reports", "Performance Core Web Vitals Sign-off", "Security Penetration Log"],
    icon: ShieldAlert,
    color: "#f59e0b"
  },
  {
    title: "Product Launch",
    description: "We configure server containers, verify SSL security, run live production migrations, set up tracking pipelines, and push the product live.",
    deliverables: ["Live Product Mainnet URL", "SSL & Domain Setup Verification", "Analytics Dashboard Integration"],
    icon: Globe,
    color: "#3b82f6"
  },
  {
    title: "Growth Scale",
    description: "We audit traffic acquisition funnel performance, optimize page load indexing, expand database clusters, and run growth campaign codes.",
    deliverables: ["Conversion Rate Audit Reports", "SEO Keyword Map", "Infrastructure Scaling Blueprint"],
    icon: TrendingUp,
    color: "#06b6d4"
  }
];

export default function OurProcess() {
  const { setCursorType } = useCursor();

  return (
    <section id="process" className="relative bg-background py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            OUR PROCESS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
            How we engineer tomorrow.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            We operate with absolute transparency. Every project passes through our structured, eight-phase digital delivery framework designed for speed, safety, and scale.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Center Line for desktop */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-card-border -translate-x-1/2" />

          {/* Process steps */}
          <div className="flex flex-col gap-16">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={step.title}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline node dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 h-3.5 w-3.5 rounded-full bg-background border-2 border-foreground -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div 
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: step.color }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: idx * 0.25 }}
                    />
                  </div>

                  {/* Left Column Spacer / empty container on desktop */}
                  <div className="w-full md:w-1/2" />

                  {/* Right Column: Timeline Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 pl-12 md:pl-16 pr-4"
                  >
                    <div 
                      className="glassmorphism-card p-6 md:p-8 rounded-2xl relative overflow-hidden"
                      onMouseEnter={() => setCursorType("hover")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      {/* Step Number Tag */}
                      <span className="absolute top-4 right-6 font-mono text-text-muted/40 text-sm font-bold uppercase">
                        PHASE 0{idx + 1}
                      </span>

                      {/* Header */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div 
                          className="p-2.5 rounded-xl border border-card-border bg-card-bg"
                          style={{ color: step.color }}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-text-title">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-text-muted font-light text-sm leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Client Receives */}
                      <div className="border-t border-card-border pt-4">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase">
                          Deliverables
                        </span>
                        <ul className="flex flex-col gap-2 mt-3">
                          {step.deliverables.map((item) => (
                            <li key={item} className="text-xs text-foreground/80 flex items-start gap-2 leading-relaxed">
                              <CheckCircle2 className="h-4 w-4 text-electric-blue shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
