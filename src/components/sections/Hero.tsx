"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        c.globalAlpha = Math.max(0, this.alpha);
        // Shadow blur is a relatively expensive canvas operation; only pay
        // for it on the few particles that are actually glowing (core
        // particle, post-flash) instead of every particle every frame.
        if (this.glow > 0) {
          c.shadowBlur = this.glow;
          c.shadowColor = this.color;
        } else if (c.shadowBlur !== 0) {
          c.shadowBlur = 0;
        }
        c.fillStyle = this.color;
        // fillRect is measurably cheaper than beginPath+arc+fill for these
        // tiny (1-4px) marks, and at that size a square reads the same as a
        // dot — this keeps the intro light on low-end devices.
        c.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      }
    }

    const particles: Particle[] = [];

    // Generate logo coordinates by sampling rendered text on an offscreen canvas.
    // This guarantees crisp, legible letterforms instead of hand-drawn approximations.
    const logoPoints: { x: number; y: number }[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    const text = "WEBMUSE";
    // Small measuring canvas just to compute font metrics before sizing the
    // real offscreen canvas — avoids allocating/scanning a full-viewport
    // buffer (a synchronous getImageData over ~2M pixels on a large desktop
    // screen was the main cause of the intro feeling slow to load).
    const measureCanvas = document.createElement("canvas");
    const measureCtx = measureCanvas.getContext("2d");
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

    const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-outfit") || "Outfit, sans-serif";

    const renderTextPoints = () => {
      if (!offCtx || !measureCtx) return;
      logoPoints.length = 0;

      // Fit text to a fraction of viewport width by measuring at a reference size first.
      const refSize = 100;
      measureCtx.font = `700 ${refSize}px ${fontFamily}`;
      const refMetrics = measureCtx.measureText(text);
      const targetWidth = width * (width < 640 ? 0.86 : 0.5);
      let fontSize = (targetWidth / refMetrics.width) * refSize;
      // Clamp so it never dwarfs viewport height either.
      fontSize = Math.min(fontSize, height * 0.3);

      measureCtx.font = `700 ${fontSize}px ${fontFamily}`;
      const metrics = measureCtx.measureText(text);
      const textWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
      const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      // Size the offscreen canvas to just the text's bounding box (+ padding),
      // not the whole viewport, so the pixel scan stays cheap regardless of screen size.
      const padding = Math.ceil(fontSize * 0.2);
      const offW = Math.ceil(textWidth) + padding * 2;
      const offH = Math.ceil(textHeight) + padding * 2;
      offscreen.width = offW;
      offscreen.height = offH;

      offCtx.clearRect(0, 0, offW, offH);
      offCtx.fillStyle = "#fff";
      offCtx.font = `700 ${fontSize}px ${fontFamily}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, offW / 2, offH / 2);

      const imageData = offCtx.getImageData(0, 0, offW, offH);
      const data = imageData.data;
      // Sample step scales with font size so particle count stays roughly
      // constant regardless of screen size (dense sampling on a huge desktop
      // headline would otherwise spawn tens of thousands of particles and
      // tank the frame rate, which is what caused the animation to stall).
      const targetParticleBudget = 600;
      const step = Math.max(1, Math.round(fontSize / 45));

      const sampled: { x: number; y: number }[] = [];
      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          const alpha = data[(y * offW + x) * 4 + 3];
          if (alpha > 128) {
            // Map back to full-canvas coordinates, centered in the viewport.
            sampled.push({
              x: centerX + (x - offW / 2),
              y: centerY + (y - offH / 2),
            });
          }
        }
      }

      if (sampled.length > targetParticleBudget) {
        // Evenly thin the sampled points down to the budget.
        const keepRatio = targetParticleBudget / sampled.length;
        for (let i = 0; i < sampled.length; i++) {
          if ((i * keepRatio) % 1 < keepRatio) {
            logoPoints.push(sampled[i]);
          }
        }
      } else {
        logoPoints.push(...sampled);
      }
    };

    renderTextPoints();

    // Fallback in case text sampling fails (e.g. font not ready): small dot cluster.
    if (logoPoints.length === 0) {
      for (let i = 0; i < 400; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * Math.min(width, height) * 0.15;
        logoPoints.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
        });
      }
    }

    const particles_seed_count = logoPoints.length;

    // Initialize particles
    // Core breathing particle first
    particles.push(new Particle(true));
    for (let i = 0; i < particles_seed_count; i++) {
      particles.push(new Particle());
    }

    const assignTargets = () => {
      particles.forEach((p, idx) => {
        if (idx > 0) {
          const logoIdx = (idx - 1) % logoPoints.length;
          p.targetX = logoPoints[logoIdx].x + (Math.random() - 0.5) * 2;
          p.targetY = logoPoints[logoIdx].y + (Math.random() - 0.5) * 2;
        }
      });
    };
    assignTargets();
    // Deliberately not re-sampling on font load: re-running the text scan
    // mid-animation caused a multi-hundred-ms main-thread stall right as the
    // particles start swarming (the animation would visibly hang). The
    // initial synchronous sample above uses whatever font is available at
    // mount time, which in practice is the brand font almost always (it's
    // self-hosted and injected before this component mounts).

    let phase = 0; // 0: single point, 1: gathering, 2: forming logo
    let explode = false;
    let timer = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.25)"; // Tail trail
      ctx.fillRect(0, 0, width, height);

      timer++;

      if (timer === 35) {
        phase = 1; // start swarming
      }
      if (timer === 100) {
        phase = 2; // snap to logo
      }
      if (timer === 260) {
        // Flash glow
        particles.forEach(p => {
          p.glow = 12;
          p.size *= 1.5;
        });
      }
      if (timer === 275) {
        explode = true; // explode outwards
      }
      if (timer === 300) {
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
            role="presentation"
          >
            <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
            <span className="sr-only">Loading WEBMUSE</span>
            <button
              onClick={skipIntro}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="absolute bottom-10 right-10 z-50 font-mono text-xs tracking-widest text-zinc-500 hover:text-white uppercase transition-colors duration-300 border border-zinc-800 hover:border-zinc-500 py-2 px-4 rounded-full bg-black/40 backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Screen */}
      <div className="relative flex min-h-screen w-full flex-col justify-center px-6 lg:px-24">
        {/* Dynamic 3D Canvas Background: deferred until the intro overlay is
            gone so its WebGL init cost doesn't compete with the intro animation. */}
        {introFinished && <Hero3D />}

        {/* Ambient background glows */}
        <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-40 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-blue opacity-40 blur-[120px] pointer-events-none" aria-hidden="true" />

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
