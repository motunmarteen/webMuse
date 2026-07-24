"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, ShieldCheck, Users } from "lucide-react";
import { careerPaths } from "@/lib/career-path-data";

const STATS = [
  { icon: Sparkles, label: "Tech paths mapped", value: String(Object.keys(careerPaths).length) },
  { icon: Clock, label: "Time to finish", value: "~5 min" },
  { icon: ShieldCheck, label: "Sign-up required", value: "None" },
];

export default function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative">
      <div
        className="absolute top-[-15%] left-[-10%] h-[480px] w-[480px] rounded-full bg-mesh-purple opacity-30 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-2">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono"
        >
          Career Path · WEBMUSE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-text-title mt-5 text-balance"
        >
          Find the tech path built for how you actually think.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Answer honestly — there are no right answers, only the ones that are true for you. In a
          few minutes you&apos;ll get real career matches: skills, roadmap, salary range, and
          personal advice for each, not a generic label.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2.5 rounded-full bg-electric-blue px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white font-mono transition-all hover:bg-electric-blue/90 hover:shadow-[0_0_30px_-5px_var(--color-electric-blue-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4"
          >
            Start the assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mt-14 max-w-lg mx-auto"
        >
          {STATS.map((s) => (
            <div key={s.label} className="glassmorphism-card rounded-xl p-4 flex flex-col items-center gap-1.5">
              <s.icon className="h-4 w-4 text-electric-blue" />
              <span className="text-lg font-bold text-text-title font-mono">{s.value}</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted text-center leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-8 text-[11px] font-mono text-text-muted"
        >
          <Users className="h-3.5 w-3.5" />
          Built and refined from years of mentoring people into their first tech role.
        </motion.div>
      </div>
    </div>
  );
}
