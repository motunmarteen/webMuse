'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Project, MusePilotMessage } from '@/lib/types/portal';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  Shield,
  Layers,
  FileText,
  Clock,
  HelpCircle,
} from 'lucide-react';

interface MusePilotAssistantProps {
  project: Project;
}

export function MusePilotAssistant({ project }: MusePilotAssistantProps) {
  const [messages, setMessages] = useState<MusePilotMessage[]>([
    {
      id: 'init_welcome',
      role: 'assistant',
      content: `Hello! I am **Muse Pilot AI**, the contextual intelligence concierge for **${project.title}**.\n\nI have real-time access to your **Genesis PRD v${project.prd.version}**, active sprint milestones, technical architecture, and post-launch SLA warranty.\n\nSelect a prompt below or ask any question regarding your platform!`,
      citations: [`Genesis PRD v${project.prd.version}`, 'System Knowledge Graph'],
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isScrolledUpRef = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    isScrolledUpRef.current = scrollHeight - scrollTop - clientHeight > 60;
  };

  useEffect(() => {
    if (!isScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || loading) return;

    const userMsg: MusePilotMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/portal/muse-pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, question: q }),
      });
      const data = await res.json();
      if (data.ok) {
        const assistantMsg: MusePilotMessage = {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: data.data.answer,
          citations: data.data.citations,
          timestamp: data.data.timestamp,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: MusePilotMessage = {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered an issue retrieving project context. Please try again.',
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const errorMsg: MusePilotMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: 'Network connection error connecting to Muse Pilot AI backend.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    { label: 'Current sprint & milestone status', icon: Layers },
    { label: 'Technical architecture & tech stack', icon: Terminal },
    { label: 'Genesis PRD feature matrix & sign-off', icon: FileText },
    { label: 'How do I claim GitHub repo custody?', icon: Shield },
    { label: '30-Day post-launch warranty coverage', icon: Clock },
    { label: 'Available add-on upgrade sprints', icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Pilot Header */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-mono tracking-tight">
                MUSE PILOT // PROJECT INTELLIGENCE ENGINE
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online & Context-Synced
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Autonomous project-trained AI assistant with direct access to your Genesis PRD, milestone deliverables, and handoff vault.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'init_welcome',
                role: 'assistant',
                content: `Chat session reset. Ask me anything about **${project.title}**!`,
                citations: ['System Knowledge Graph'],
                timestamp: new Date().toISOString(),
              },
            ])
          }
          className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors font-mono"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear History
        </button>
      </div>

      {/* Suggested Quick Prompt Chips (NO horizontal scrolling, visible all at once) */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
        <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2">
          Recommended Context Inquiries:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {samplePrompts.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(p.label)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-xs text-zinc-300 hover:text-cyan-300 font-mono flex items-center gap-1.5 transition-all text-left"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Chat Stream Frame */}
      <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col h-[520px] overflow-hidden">
        {/* Messages Body */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-5 overflow-y-auto space-y-4"
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs space-y-2 relative group ${
                    isUser
                      ? 'bg-cyan-500 text-black font-medium rounded-tr-none'
                      : 'bg-white/[0.03] border border-white/10 text-zinc-200 rounded-tl-none font-sans'
                  }`}
                >
                  {/* Message Content */}
                  <div className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</div>

                  {/* Citations if assistant */}
                  {!isUser && m.citations && m.citations.length > 0 && (
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-500">Citations:</span>
                      {m.citations.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer & Copy */}
                  <div
                    className={`flex items-center justify-between text-[10px] font-mono pt-1 ${
                      isUser ? 'text-cyan-950' : 'text-zinc-500'
                    }`}
                  >
                    <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                    {!isUser && (
                      <button
                        onClick={() => copyContent(m.content, m.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                        title="Copy answer"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-lg items-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Synthesizing response from project PRD & vault...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Input Form */}
        <div className="p-4 border-t border-white/10 bg-black/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Muse Pilot anything about scope, milestones, tech stack, or SLA warranty..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
