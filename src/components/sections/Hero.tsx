"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCursor } from "@/components/ui/CustomCursor";
import { useMagnetic } from "@/hooks/useMagnetic";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";

// Dynamically import Three.js Canvas to ensure it compiles only on client-side
const Hero3D = dynamic(() => import("@/components/ui/Hero3D"), { ssr: false });

const PHRASES = [
  "Digital Businesses.",
  "Innovative Ideas.",
  "Custom Software.",
  "Scalable Products.",
  "Digital Futures."
];

export default function Hero({ onIntroFinished }: { onIntroFinished: () => void }) {
  const [introFinished, setIntroFinished] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setCursorType } = useCursor();
  
  const ctaRef = useMagnetic(50, 0.4);
  const secCtaRef = useMagnetic(40, 0.3);

  useEffect(() => {
    if (!introFinished) return;
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [introFinished]);

  useEffect(() => {
    if (introFinished) {
      onIntroFinished();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      ease: number;
      glow: number;

      constructor(isCore = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = width / 2;
        this.targetY = height / 2;
        this.vx = 0;
        this.vy = 0;
        this.size = isCore ? 4 : Math.random() * 1.5 + 0.5;
        this.color = isCore ? "#0070f3" : Math.random() > 0.65 ? "#0070f3" : Math.random() > 0.5 ? "#8e9196" : "#ffffff";
        this.alpha = isCore ? 1 : Math.random() * 0.5 + 0.3;
        this.ease = Math.random() * 0.04 + 0.02;
        this.glow = isCore ? 20 : 0;
      }

      update(phase: number, explode = false) {
        if (explode) {
          // Explode outwards from center
          const dx = this.x - width / 2;
          const dy = this.y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          this.vx += (dx / dist) * 0.5 + (Math.random() - 0.5) * 0.2;
          this.vy += (dy / dist) * 0.5 + (Math.random() - 0.5) * 0.2;
          this.x += this.vx;
          this.y += this.vy;
          this.alpha -= 0.015;
          return;
        }

        if (phase === 0) {
          // Single breathing center particle
          const dx = width / 2 - this.x;
          const dy = height / 2 - this.y;
          this.x += dx * 0.05;
          this.y += dy * 0.05;
        } else if (phase === 1) {
          // Swarm gathering in a spiral orbit
          const dx = width / 2 - this.x;
          const dy = height / 2 - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) + 0.04 + (dist < 100 ? 0.05 : 0);
          const targetX = width / 2 + Math.cos(angle) * Math.max(5, dist - 3);
          const targetY = height / 2 + Math.sin(angle) * Math.max(5, dist - 3);
          
          this.x += (targetX - this.x) * 0.08;
          this.y += (targetY - this.y) * 0.08;
        } else if (phase === 2) {
          // Snap to logo coordinates
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.x += dx * this.ease * 1.5;
          this.y += dy * this.ease * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.shadowBlur = this.glow;
        c.shadowColor = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 1400;

    // Generate monogram logo coordinates
    const logoPoints: { x: number; y: number }[] = [];
    const scale = Math.min(width, height) * 0.28;
    const centerX = width / 2;
    const centerY = height / 2;

    const addLinePoints = (x1: number, y1: number, x2: number, y2: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const t = i / count;
        logoPoints.push({
          x: centerX + (x1 + (x2 - x1) * t) * scale,
          y: centerY + (y1 + (y2 - y1) * t) * scale,
        });
      }
    };

    // Design: Stylized Futuristic "W" and "M" interlocking lines
    // Line coords relative to center (-1 to 1)
    // Left 'W' Peak
    addLinePoints(-0.7, -0.4, -0.4, 0.4, 150);
    addLinePoints(-0.4, 0.4, -0.15, -0.1, 100);
    addLinePoints(-0.15, -0.1, 0.1, 0.4, 100);
    addLinePoints(0.1, 0.4, 0.4, -0.4, 150);

    // Interlocking 'M' Peak (Shifted)
    addLinePoints(-0.4, 0.4, -0.1, -0.4, 150);
    addLinePoints(-0.1, -0.4, 0.15, 0.1, 100);
    addLinePoints(0.15, 0.1, 0.4, -0.4, 100);
    addLinePoints(0.4, -0.4, 0.7, 0.4, 150);

    // Center Diamond Accent
    addLinePoints(0, -0.15, 0.12, 0, 50);
    addLinePoints(0.12, 0, 0, 0.15, 50);
    addLinePoints(0, 0.15, -0.12, 0, 50);
    addLinePoints(-0.12, 0, 0, -0.15, 50);

    // Initialize particles
    // Core breathing particle first
    particles.push(new Particle(true));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Assign logo target coordinates to particles
    particles.forEach((p, idx) => {
      if (idx > 0) {
        const logoIdx = (idx - 1) % logoPoints.length;
        p.targetX = logoPoints[logoIdx].x + (Math.random() - 0.5) * 8;
        p.targetY = logoPoints[logoIdx].y + (Math.random() - 0.5) * 8;
      }
    });

    let phase = 0; // 0: single point, 1: gathering, 2: forming logo
    let explode = false;
    let timer = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.25)"; // Tail trail
      ctx.fillRect(0, 0, width, height);

      timer++;

      if (timer === 60) {
        phase = 1; // start swarming
      }
      if (timer === 180) {
        phase = 2; // snap to logo
      }
      if (timer === 290) {
        // Flash glow
        particles.forEach(p => {
          p.glow = 12;
          p.size *= 1.5;
        });
      }
      if (timer === 310) {
        explode = true; // explode outwards
      }
      if (timer === 355) {
        setIntroFinished(true);
        return;
      }

      particles.forEach((p) => {
        p.update(phase, explode);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [introFinished, onIntroFinished]);

  const skipIntro = () => {
    setIntroFinished(true);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-background transition-colors duration-300">
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-[#030303]"
          >
            <canvas ref={canvasRef} className="block h-full w-full" />
            <button
              onClick={skipIntro}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="absolute bottom-10 right-10 z-50 font-mono text-xs tracking-widest text-zinc-500 hover:text-white uppercase transition-colors duration-300 border border-zinc-800 hover:border-zinc-500 py-2 px-4 rounded-full bg-black/40 backdrop-blur-md"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Screen */}
      <div className="relative flex min-h-screen w-full flex-col justify-center px-6 lg:px-24">
        {/* Dynamic 3D Canvas Background */}
        <Hero3D />

        {/* Ambient background glows */}
        <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-blue opacity-40 blur-[120px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mt-16 pointer-events-auto">
          {/* Subheader Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-4 w-4 text-electric-blue animate-pulse-slow" />
            <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase font-mono">
              Elite Innovation Studio
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-white">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              We Build
            </motion.span>
            <div className="h-[1.2em] overflow-hidden relative mt-1 select-none">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 block w-full bg-gradient-to-r from-electric-blue via-soft-cyan to-neon-purple bg-clip-text text-transparent glow-text-blue"
                >
                  {PHRASES[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg md:text-xl text-text-muted font-light leading-relaxed"
          >
            From validation to launch, we combine engineering craftsmanship, data strategy, and premium design to shape products that define industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary CTA (Magnetic) */}
            <div ref={ctaRef}>
              <a
                href="#booking"
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="group relative flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Secondary CTA (Magnetic) */}
            <div ref={secCtaRef}>
              <a
                href="#services"
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="flex h-14 items-center justify-center rounded-full border border-card-border bg-card-bg px-8 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:bg-card-bg/85 hover:border-card-border/80"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introFinished ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-zinc-700 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 40] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-electric-blue"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
