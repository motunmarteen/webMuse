"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { Mail, Phone, Clock, Send, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

interface OfficeHub {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Percentage coords in SVG viewBox
  details: string;
  staff: string;
}

const OFFICE_HUBS: OfficeHub[] = [
  { id: "london", name: "London HQ (Main Studio)", coords: { x: 44, y: 14 }, details: "Our primary studio for product architecture, design engineering, and client briefings.", staff: "London, United Kingdom" },
  { id: "ny", name: "New York Hub", coords: { x: 25, y: 15 }, details: "Strategy partnership, US branding campaigns, and marketing support.", staff: "New York, USA" },
  { id: "tokyo", name: "Tokyo Hub", coords: { x: 84, y: 16 }, details: "APAC user validation, local UI customisation, and mobile automation testing.", staff: "Tokyo, Japan" }
];

const isLand = (x: number, y: number) => {
  // Bounding shapes for dot matrix world map layout
  // North America
  if (x > 8 && x < 34 && y > 8 && y < 26) {
    if (x > 26 && y > 20) return false;
    return true;
  }
  // South America
  if (x > 18 && x < 29 && y >= 26 && y < 46) {
    return x - y < -3;
  }
  // Africa
  if (x > 42 && x < 56 && y >= 22 && y < 40) {
    return x + y > 68;
  }
  // Europe / Asia
  if (x > 36 && x < 88 && y > 8 && y < 32) {
    if (x < 46 && y > 24) return false;
    return true;
  }
  // Australia
  if (x > 74 && x < 86 && y > 32 && y < 42) {
    return true;
  }
  return false;
};

export default function Contact() {
  const [selectedHub, setSelectedHub] = useState<OfficeHub | null>(OFFICE_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState<OfficeHub | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const { setCursorType } = useCursor();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1800);
  };

  return (
    <section id="contact" className="relative bg-background py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute bottom-[0%] left-[50%] -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-mesh-blue opacity-10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Details & Quick Message Form (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg backdrop-blur-md p-6 md:p-8">
            <div>
              <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
                CONTACT
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-text-title mt-4">
                Let&apos;s build the future.
              </h2>
              
              {/* Quick Details */}
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-card-border bg-card-bg text-electric-blue">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">Email Address</span>
                    <a href="mailto:hello@webmuse.tech" className="text-sm text-foreground hover:text-electric-blue transition-colors">hello@webmuse.tech</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-card-border bg-card-bg text-neon-purple">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">Studio Location</span>
                    <span className="text-sm text-foreground">London, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-card-border bg-card-bg text-soft-cyan">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted block">Hours of Operation</span>
                    <span className="text-sm text-foreground/90">09:00 AM - 06:00 PM GMT</span>
                  </div>
                </div>
              </div>

              {/* Quick message form */}
              <form onSubmit={handleSend} className="mt-8 flex flex-col gap-3.5 border-t border-card-border pt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">
                  Send a Quick Message
                </span>
                
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-xs text-foreground outline-none transition-colors placeholder-zinc-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-xs text-foreground outline-none transition-colors placeholder-zinc-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Project outline..."
                    className="w-full h-[80px] bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-xs text-foreground outline-none resize-none transition-colors placeholder-zinc-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground py-3 text-xs font-semibold uppercase tracking-wider text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:pointer-events-none font-mono"
                >
                  {sending ? "Sending..." : sent ? "Message Sent" : "Transmit Message"}
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>

            {/* Response Promise */}
            <div className="mt-6 flex items-center gap-2 border-t border-card-border pt-4 text-[10px] text-text-muted font-mono uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Response SLA: under 4 business hours</span>
            </div>
          </div>

          {/* Right Column: Interactive Cyber Map (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg/40 p-6 md:p-8 relative min-h-[450px]">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-electric-blue uppercase">
                GLOBAL NETWORKS
              </span>
              <h3 className="text-xl font-bold text-text-title tracking-tight mt-1 mb-4">
                Global Engineering Presence
              </h3>
            </div>

            {/* Cyber Map Visual (SVG) */}
            <div className="flex-1 w-full aspect-[2/1] relative bg-background border border-card-border rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              {/* World dotted map layout background */}
              <svg className="w-[95%] h-[95%] text-zinc-800" viewBox="0 0 100 50">
                {/* Lat/Long network grid lines */}
                <g stroke="rgba(255,255,255,0.01)" strokeWidth="0.25">
                  <line x1="20" y1="0" x2="20" y2="50" />
                  <line x1="40" y1="0" x2="40" y2="50" />
                  <line x1="60" y1="0" x2="60" y2="50" />
                  <line x1="80" y1="0" x2="80" y2="50" />
                  <line x1="0" y1="15" x2="100" y2="15" />
                  <line x1="0" y1="30" x2="100" y2="30" />
                </g>

                {/* Render Dotted Grid Continents */}
                {Array.from({ length: 24 }).map((_, r) => {
                  const y = 3 + r * 1.9;
                  return Array.from({ length: 48 }).map((_, c) => {
                    const x = 3 + c * 2.0;
                    if (!isLand(x, y)) return null;
                    return (
                      <circle
                        key={`${r}-${c}`}
                        cx={x}
                        cy={y}
                        r="0.45"
                        fill="currentColor"
                        opacity="0.12"
                      />
                    );
                  });
                })}

                {/* Network connection lines from London HQ to other hubs */}
                <g stroke="rgba(0, 112, 243, 0.18)" strokeWidth="0.65" strokeDasharray="1.5 1">
                  <line x1="44" y1="14" x2="25" y2="15" />
                  <line x1="44" y1="14" x2="84" y2="16" />
                </g>

                {/* Office Hub connection nodes */}
                {OFFICE_HUBS.map((hub) => (
                  <g key={`lines-${hub.id}`}>
                    {/* Concentric rings on selected */}
                    {selectedHub?.id === hub.id && (
                      <circle
                        cx={hub.coords.x}
                        cy={hub.coords.y}
                        r="3.5"
                        fill="none"
                        stroke="#0070f3"
                        strokeWidth="0.5"
                        opacity="0.6"
                      >
                        <animate attributeName="r" values="1.5;6;1.5" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Dotted Node Point */}
                    <circle
                      cx={hub.coords.x}
                      cy={hub.coords.y}
                      r={selectedHub?.id === hub.id || hoveredHub?.id === hub.id ? "1.8" : "1.2"}
                      fill={selectedHub?.id === hub.id ? "#0070f3" : hoveredHub?.id === hub.id ? "#a855f7" : "var(--foreground)"}
                      className="cursor-pointer"
                      onClick={() => setSelectedHub(hub)}
                      onMouseEnter={() => {
                        setHoveredHub(hub);
                        setCursorType("pointer");
                      }}
                      onMouseLeave={() => {
                        setHoveredHub(null);
                        setCursorType("default");
                      }}
                    />
                  </g>
                ))}
              </svg>

              {/* Office Tooltips on hover */}
              {hoveredHub && (
                <div
                  className="absolute p-2.5 rounded-lg border border-card-border bg-background/95 backdrop-blur-md text-[10px] font-mono text-foreground shadow-xl pointer-events-none"
                  style={{
                    left: `${hoveredHub.coords.x}%`,
                    top: `${hoveredHub.coords.y + 10}%`,
                    transform: "translateX(-50%)"
                  }}
                >
                  <div className="font-bold flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-electric-blue" />
                    {hoveredHub.name}
                  </div>
                  <div className="text-text-muted mt-0.5">{hoveredHub.staff}</div>
                </div>
              )}
            </div>

            {/* Office Hub Info Panel */}
            <div className="mt-6">
              <AnimatePresence mode="wait">
                {selectedHub && (
                  <motion.div
                    key={selectedHub.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl border border-card-border bg-card-bg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-text-title flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-electric-blue" />
                        {selectedHub.name}
                      </h4>
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        {selectedHub.staff}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted font-light leading-relaxed">
                      {selectedHub.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
