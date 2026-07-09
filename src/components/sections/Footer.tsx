"use client";

import { useState } from "react";
import Image from "next/image";
import { useCursor } from "@/components/ui/CustomCursor";
import { ArrowRight, Check, Send, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setCursorType } = useCursor();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
    }, 1500);
  };

  return (
    <footer className="relative bg-background border-t border-card-border pt-20 pb-10 px-6 lg:px-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-[20%] h-[250px] w-[250px] rounded-full bg-mesh-purple opacity-10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Column (4 columns) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 group mb-6">
              <Image
                src="/webMuse-Logo.png"
                alt="WEBMUSE Logo"
                width={26}
                height={26}
                className="object-contain invert"
              />
              <span className="font-display font-bold tracking-widest text-lg text-text-title">
                WEBMUSE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-electric-blue animate-pulse" />
            </div>
            <p className="text-text-muted font-light text-sm max-w-xs leading-relaxed">
              An elite innovation studio that transforms complex product ideas into high-performance digital reality.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-electric-blue" />
              <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase font-mono">
                Crafting Digital Assets
              </span>
            </div>
          </div>

          {/* Studio Links Column (2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase mb-4">
              Studio
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-muted font-mono">
              <li><a href="#services" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#process" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Our Process</a></li>
              <li><a href="#universe" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Constellation</a></li>
              <li><a href="#gallery" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Portfolio</a></li>
              <li><a href="#vault" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Idea Vault</a></li>
            </ul>
          </div>

          {/* Resources Column (2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-muted font-mono">
              <li><a href="#" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Insights</a></li>
              <li><a href="#" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" onMouseEnter={() => setCursorType("pointer")} onMouseLeave={() => setCursorType("default")} className="hover:text-foreground transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Newsletter / Briefing Column (4 columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase mb-4">
              Weekly Technical Briefing
            </h4>
            <p className="text-text-muted font-light text-xs mb-4 leading-relaxed">
              Subscribe to receive our insights on software architectures, UI design parameters, and Web3 security.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@domain.com"
                className="w-full bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-full px-5 py-3 text-xs text-foreground outline-none transition-colors placeholder-zinc-500 pr-12"
              />
              <button
                type="submit"
                disabled={submitting || subscribed}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="absolute right-1 top-1 bottom-1 aspect-square rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? (
                  <span className="h-3 w-3 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : subscribed ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-card-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © 2026 WEBMUSE INC. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[10px] font-mono text-text-muted/80 uppercase tracking-widest flex items-center gap-1.5 glow-text-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-blue" />
            ENGINEERING TOMORROW
          </span>
        </div>
      </div>
    </footer>
  );
}
