"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Upload, 
  Video, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface BookingProps {
  initialDescription?: string;
  onClearDescription?: () => void;
}

const PROJECT_TYPES = [
  { id: "saas", label: "Enterprise SaaS" },
  { id: "web-app", label: "Custom Web App" },
  { id: "mobile", label: "Mobile Application" },
  { id: "ai", label: "AI & Neural Agents" },
  { id: "web3", label: "Web3 & Smart Contracts" },
  { id: "api-architecture", label: "API & Architecture" },
  { id: "ecommerce", label: "E-Commerce Suite" },
  { id: "automation", label: "Business Automation" },
  { id: "mvp", label: "Startup MVP Build" },
  { id: "consulting", label: "Strategy & Tech Consulting" }
];

const CONSULTATION_TYPES = [
  { id: "tech", title: "Technical Scope Audit", duration: "45 Mins", desc: "Audit architecture bottlenecks, recommend stacks, and estimate data pipelines." },
  { id: "strategy", title: "Product Strategy Review", duration: "45 Mins", desc: "Analyze user retention loops, outline MVP milestones, and map monetize models." },
  { id: "alignment", title: "Complete Product Alignment", duration: "60 Mins", desc: "Strategy review combined with technical architecture mapping and timeline scoping." }
];

const PLATFORMS = [
  { id: "meet", label: "Google Meet", icon: Video }
];

// Helper to generate next 5 unique business days (no duplicates)
const getUpcomingDates = () => {
  const dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  let current = new Date();
  while (dates.length < 5) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    // Skip Saturday (6) and Sunday (0)
    if (day !== 0 && day !== 6) {
      dates.push({
        dayName: days[day],
        dateStr: `${current.getDate()} ${months[current.getMonth()]}`,
        raw: current.toISOString().split("T")[0]
      });
    }
  }
  return dates;
};

const TIME_SLOTS = ["09:00 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

export default function Booking({ initialDescription, onClearDescription }: BookingProps) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("saas");
  const [consultationType, setConsultationType] = useState("tech");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [platform, setPlatform] = useState("meet");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Confirmation State
  const [ticketId, setTicketId] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [blockedSlots, setBlockedSlots] = useState<{ date: string; time: string }[]>([]);

  const { setCursorType } = useCursor();
  const dates = getUpcomingDates();

  // Load active booking and blocked slots on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("webmuse_active_booking");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setName(data.name);
          setEmail(data.email);
          setProjectType(data.projectType);
          setConsultationType(data.consultationType);
          setSelectedDate(data.selectedDate);
          setSelectedTime(data.selectedTime);
          setPlatform(data.platform);
          setTicketId(data.ticketId);
          setIsBooked(true);
        } catch (e) {
          console.error("Failed to parse stored booking:", e);
        }
      }

      const storedBlocked = localStorage.getItem("webmuse_blocked_slots");
      if (storedBlocked) {
        try {
          setBlockedSlots(JSON.parse(storedBlocked));
        } catch (e) {}
      }
    }
  }, []);

  // Update blocked slots when booking status changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBlocked = localStorage.getItem("webmuse_blocked_slots");
      if (storedBlocked) {
        try {
          setBlockedSlots(JSON.parse(storedBlocked));
        } catch (e) {}
      }
    }
  }, [isBooked]);

  useEffect(() => {
    if (initialDescription) {
      setDescription(initialDescription);
      setStep(4); // Jump to context step directly
      // Auto scroll to booking
      const el = document.getElementById("booking");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialDescription]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const isSlotBlocked = (dateRaw: string, timeVal: string) => {
    return blockedSlots.some(s => s.date === dateRaw && s.time === timeVal);
  };

  const submitBooking = () => {
    if (!name || !email) {
      alert("Please fill in your name and email.");
      return;
    }
    // Generate random Ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `WM-${randomNum}-XM`;
    setTicketId(newTicketId);
    setIsBooked(true);

    const bookingData = {
      name,
      email,
      projectType,
      consultationType,
      selectedDate,
      selectedTime,
      platform,
      ticketId: newTicketId
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("webmuse_active_booking", JSON.stringify(bookingData));
      
      const storedBlocked = localStorage.getItem("webmuse_blocked_slots") || "[]";
      try {
        const blocked = JSON.parse(storedBlocked);
        blocked.push({ date: selectedDate, time: selectedTime });
        localStorage.setItem("webmuse_blocked_slots", JSON.stringify(blocked));
      } catch (e) {}
    }

    if (onClearDescription) {
      onClearDescription();
    }

    audioSynth.playNotification();
  };

  const resetForm = () => {
    setStep(1);
    setProjectType("saas");
    setConsultationType("tech");
    setSelectedDate("");
    setSelectedTime("");
    setPlatform("meet");
    setDescription("");
    setFileName("");
    setName("");
    setEmail("");
    setIsBooked(false);
  };

  const cancelBooking = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("webmuse_active_booking");
    }
    resetForm();
    audioSynth.playClick();
  };

  const handleStepClick = (next: number) => {
    audioSynth.playClick();
    setStep(next);
  };

  return (
    <section id="booking" className="relative bg-background py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-[50%] left-[10%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            BOOK CONSULTATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-title mt-4">
            Initialize your product.
          </h2>
          <p className="text-text-muted font-light mt-4 text-sm md:text-base max-w-xl mx-auto">
            Book a strategy session with our product architects. Map out your engineering plan, visual parameters, and budget scopes.
          </p>
        </div>

        {/* Outer Form Container */}
        <div className="rounded-3xl border border-card-border bg-card-bg backdrop-blur-md p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isBooked ? (
              <motion.div
                key="form-steps"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-1 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-8 border-b border-card-border pb-4">
                    <span className="text-xs font-mono font-bold text-text-muted uppercase">
                      Step 0{step} / 04
                    </span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className={`h-1 w-12 rounded-full transition-all duration-300 ${
                            s <= step ? "bg-electric-blue" : "bg-card-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Project Type */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="text-xl font-bold text-text-title tracking-tight">
                        What category of digital product are we building?
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = projectType === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => {
                                audioSynth.playClick();
                                setProjectType(type.id);
                              }}
                              onMouseEnter={() => setCursorType("pointer")}
                              onMouseLeave={() => setCursorType("default")}
                              className={`p-4 rounded-xl border text-center font-medium text-sm transition-all ${
                                isSelected
                                  ? "bg-foreground text-background border-foreground"
                                  : "bg-card-bg border-card-border text-text-muted hover:text-foreground hover:bg-card-bg/80"
                              }`}
                            >
                              {type.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Consultation Option */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="text-xl font-bold text-text-title tracking-tight">
                        Select your preferred consultation structure
                      </h3>
                      <div className="flex flex-col gap-3">
                        {CONSULTATION_TYPES.map((type) => {
                          const isSelected = consultationType === type.id;
                          return (
                            <button
                              key={type.id}
                              onClick={() => {
                                audioSynth.playClick();
                                setConsultationType(type.id);
                              }}
                              onMouseEnter={() => setCursorType("pointer")}
                              onMouseLeave={() => setCursorType("default")}
                              className={`p-5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                                isSelected
                                  ? "bg-card-bg border-electric-blue text-foreground"
                                  : "bg-transparent border-card-border text-text-muted hover:text-foreground hover:bg-card-bg/40"
                              }`}
                            >
                              <div className="max-w-[80%]">
                                <div className="flex items-center gap-3">
                                  <h4 className="text-base font-bold tracking-tight text-text-title">
                                    {type.title}
                                  </h4>
                                  <span className="rounded-full border border-card-border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-text-muted">
                                    {type.duration}
                                  </span>
                                </div>
                                <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">
                                  {type.desc}
                                </p>
                              </div>
                              <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-electric-blue bg-electric-blue text-background" : "border-card-border"
                              }`}>
                                {isSelected && <Check className="h-3.5 w-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Date & Time Schedule */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="text-xl font-bold text-text-title tracking-tight">
                        Choose a suitable consultation time
                      </h3>
                      
                      {/* Date Row */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2.5">
                          Select Date
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {dates.map((d) => {
                            const isSelected = selectedDate === d.raw;
                            return (
                              <button
                                key={d.raw}
                                onClick={() => {
                                  audioSynth.playClick();
                                  setSelectedDate(d.raw);
                                }}
                                onMouseEnter={() => setCursorType("pointer")}
                                onMouseLeave={() => setCursorType("default")}
                                className={`flex flex-col items-center justify-center min-w-[75px] py-3 rounded-xl border text-center shrink-0 transition-all ${
                                  isSelected
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-card-bg border-card-border text-text-muted hover:text-foreground hover:bg-card-bg/80"
                                }`}
                              >
                                <span className="text-[10px] font-mono uppercase tracking-widest">{d.dayName}</span>
                                <span className="text-sm font-bold mt-1 font-mono">{d.dateStr}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots grid */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2.5">
                          Available Time Slots
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {TIME_SLOTS.map((t) => {
                            const isSelected = selectedTime === t;
                            const isBlocked = isSlotBlocked(selectedDate, t);
                            return (
                              <button
                                key={t}
                                disabled={isBlocked}
                                onClick={() => {
                                  audioSynth.playClick();
                                  setSelectedTime(t);
                                }}
                                onMouseEnter={() => !isBlocked && setCursorType("pointer")}
                                onMouseLeave={() => setCursorType("default")}
                                className={`py-2.5 rounded-xl border text-center text-xs font-mono transition-all ${
                                  isSelected
                                    ? "bg-foreground text-background border-foreground"
                                    : isBlocked
                                    ? "bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed line-through"
                                    : "bg-card-bg border-card-border text-text-muted hover:text-foreground hover:bg-card-bg/80"
                                }`}
                              >
                                {isBlocked ? "Booked" : t}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Video Platform Selection */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2.5">
                          Consultation Node Channel
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {PLATFORMS.map((p) => {
                            const isSelected = platform === p.id;
                            const PIcon = p.icon;
                            return (
                              <button
                                key={p.id}
                                onClick={() => {
                                  audioSynth.playClick();
                                  setPlatform(p.id);
                                }}
                                onMouseEnter={() => setCursorType("pointer")}
                                onMouseLeave={() => setCursorType("default")}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-center text-xs font-semibold uppercase tracking-wider transition-all ${
                                  isSelected
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-card-bg border-card-border text-text-muted hover:text-foreground hover:bg-card-bg/80"
                                }`}
                              >
                                <PIcon className="h-3.5 w-3.5 text-electric-blue" />
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Metadata & File upload */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="text-xl font-bold text-text-title tracking-tight">
                        Provide briefing details & contact info
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder-zinc-500"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder-zinc-500"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                          Project Description (Brief overview)
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Outline key requirements, budgets, or scopes..."
                          className="w-full h-[100px] bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-sm text-foreground outline-none resize-none transition-colors placeholder-zinc-500"
                        />
                      </div>

                      {/* File Uploader */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                          Upload Supporting Documents (Optional)
                        </label>
                        <label className="flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-white/20 rounded-xl py-6 cursor-pointer bg-white/[0.005] hover:bg-white/[0.01] transition-all">
                          <Upload className="h-5 w-5 text-zinc-500 mb-2" />
                          <span className="text-xs text-zinc-400">
                            {fileName ? fileName : "Drag documents or click to browse (PDF, Figma, PRD)"}
                          </span>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-8">
                  {step > 1 ? (
                    <button
                      onClick={() => handleStepClick(step - 1)}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors font-mono"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={() => handleStepClick(step + 1)}
                      disabled={step === 3 && (!selectedDate || !selectedTime)}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:pointer-events-none font-mono"
                    >
                      Continue
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submitBooking}
                      disabled={!name || !email}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                    >
                      Submit Booking Request
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              // STEP 5: confirmation ticket boarding pass style!
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center"
              >
                {/* Boarding ticket layout */}
                <div className="w-full max-w-md border border-white/10 rounded-2xl bg-gradient-to-b from-[#080808] to-black overflow-hidden relative shadow-2xl">
                  {/* Neon border glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-soft-cyan to-neon-purple" />
                  
                  {/* Ticket Header */}
                  <div className="p-6 border-b border-white/5 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                        WEBMUSE INNOVATION DEPLOYMENT
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight mt-0.5">
                        Consultation Ticket
                      </h4>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        INITIATED
                      </span>
                    </div>
                  </div>

                  {/* Ticket Body details */}
                  <div className="p-6 grid grid-cols-2 gap-4 text-left border-b border-card-border border-dashed relative">
                    {/* Left details */}
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        CLIENT NAME
                      </span>
                      <div className="text-sm font-semibold text-text-title truncate">{name}</div>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        ARCHETYPE
                      </span>
                      <div className="text-sm font-semibold text-text-title uppercase font-mono">{projectType}</div>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        CONSULTATION TYPE
                      </span>
                      <div className="text-xs font-semibold text-text-title truncate">
                        {CONSULTATION_TYPES.find((c) => c.id === consultationType)?.title}
                      </div>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        PLATFORM
                      </span>
                      <div className="text-xs font-semibold text-text-title uppercase font-mono">{platform}</div>
                    </div>

                    {/* Semi circle cutouts for ticket aesthetic */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border-r border-card-border" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border-l border-card-border" />
                  </div>

                  {/* Time and ticket number details */}
                  <div className="p-6 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        SCHEDULED TIME
                      </span>
                      <div className="text-xs font-semibold text-text-title font-mono mt-0.5">
                        {selectedDate} @ {selectedTime}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-mono tracking-widest text-text-muted/60 uppercase">
                        TICKET ID
                      </span>
                      <div className="text-xs font-semibold text-electric-blue font-mono mt-0.5">
                        {ticketId}
                      </div>
                    </div>
                  </div>

                  {/* SVG Barcode */}
                  <div className="bg-card-bg/60 p-4 border-t border-card-border flex flex-col items-center justify-center">
                    <svg className="h-8 w-[80%] text-zinc-600 overflow-hidden fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <rect x="0" y="0" width="2" height="20" />
                      <rect x="4" y="0" width="1" height="20" />
                      <rect x="7" y="0" width="3" height="20" />
                      <rect x="12" y="0" width="1" height="20" />
                      <rect x="15" y="0" width="4" height="20" />
                      <rect x="21" y="0" width="1" height="20" />
                      <rect x="24" y="0" width="2" height="20" />
                      <rect x="28" y="0" width="3" height="20" />
                      <rect x="33" y="0" width="1" height="20" />
                      <rect x="36" y="0" width="4" height="20" />
                      <rect x="42" y="0" width="2" height="20" />
                      <rect x="46" y="0" width="1" height="20" />
                      <rect x="49" y="0" width="3" height="20" />
                      <rect x="54" y="0" width="1" height="20" />
                      <rect x="57" y="0" width="4" height="20" />
                      <rect x="63" y="0" width="1" height="20" />
                      <rect x="66" y="0" width="2" height="20" />
                      <rect x="70" y="0" width="3" height="20" />
                      <rect x="75" y="0" width="1" height="20" />
                      <rect x="78" y="0" width="4" height="20" />
                      <rect x="84" y="0" width="2" height="20" />
                      <rect x="88" y="0" width="1" height="20" />
                      <rect x="91" y="0" width="3" height="20" />
                      <rect x="96" y="0" width="4" height="20" />
                    </svg>
                    <span className="text-[8px] font-mono text-zinc-500 tracking-widest mt-1">
                      * SECURE VERIFICATION REQUIRED *
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                    <span>A calendar invite and technical questionnaire has been sent to {email}.</span>
                  </div>
                  <button
                    onClick={cancelBooking}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className="rounded-full border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 text-red-500 font-mono px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Cancel or Reschedule Booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
