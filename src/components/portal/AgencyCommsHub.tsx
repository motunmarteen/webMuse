'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, Project } from '@/lib/types/portal';
import {
  Send,
  MessageSquare,
  ShieldCheck,
  Bot,
  User,
  Sparkles,
  Paperclip,
  CheckCheck,
  Clock,
  Radio,
  RefreshCw,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface AgencyCommsHubProps {
  project: Project;
  clientEmail: string;
  initialMessages?: ChatMessage[];
}

const PRESET_PROMPTS = [
  '🚀 What is the current status of Milestone 1 deliverables?',
  '🌐 Can we verify the domain DNS & SSL routing?',
  '💳 How does the annual maintenance retainer renewal work?',
  '🛡️ Please trigger a fresh automated database backup.',
  '⚙️ Need to adjust our third-party API rate limits.',
];

export function AgencyCommsHub({
  project,
  clientEmail,
  initialMessages = [],
}: AgencyCommsHubProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    project.chatMessages && project.chatMessages.length > 0
      ? project.chatMessages
      : initialMessages
  );
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUpRef = useRef(false);
  const isInitialMount = useRef(true);

  const handleContainerScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // If user is more than 80px away from bottom, they are reading previous messages
    isUserScrolledUpRef.current = scrollHeight - scrollTop - clientHeight > 80;
  };

  const scrollToBottom = (force = false) => {
    if (force || !isUserScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      scrollToBottom(true);
      isInitialMount.current = false;
    } else if (!isUserScrolledUpRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // Periodic polling for new incoming messages from agency
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/portal/chat?projectId=${project.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages((prev) => {
              if (
                prev.length !== data.messages.length ||
                prev[prev.length - 1]?.id !== data.messages[data.messages.length - 1]?.id
              ) {
                return data.messages;
              }
              return prev;
            });
          }
        }
      } catch (err) {
        console.error('Chat poll error:', err);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [project.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/portal/chat?projectId=${project.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const messageContent = inputText.trim();
    setInputText('');
    setIsSending(true);

    // Optimistic message
    const tempMsg: ChatMessage = {
      id: `temp_${Date.now()}`,
      projectId: project.id,
      sender: 'client',
      senderName: clientEmail.split('@')[0],
      senderRole: 'Project Sponsor',
      message: messageContent,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch('/api/portal/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          message: messageContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempMsg.id ? data.message : m))
          );
        }
      }
    } catch (error) {
      console.error('Failed to send chat message:', error);
    } finally {
      setIsSending(false);
      // Always scroll to bottom after user sends their own message
      setTimeout(() => scrollToBottom(true), 100);
    }
  };

  const handleSelectPreset = (preset: string) => {
    setInputText(preset);
  };

  return (
    <div className="glassmorphism-card rounded-2xl border border-card-border overflow-hidden shadow-2xl flex flex-col h-[700px]">
      {/* Comms Deck Header */}
      <div className="px-6 py-4 border-b border-card-border bg-card-bg/60 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-display text-text-title">
                Direct Agency Comms Hub
              </h3>
              <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-mono">
              Dedicated encrypted channel with WebMuse Architecture & Engineering Leads
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            title="Refresh stream"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* SLA Response Guarantee Strip */}
      <div className="px-6 py-2 bg-electric-blue/5 border-b border-card-border text-[11px] font-mono text-text-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-electric-blue" />
          <span>Active SLA: &lt; 2 Hours Emergency Response Guaranteed</span>
        </div>
        <div className="text-[10px] text-electric-blue">End-to-End Encrypted</div>
      </div>

      {/* Message Stream */}
      <div
        ref={chatContainerRef}
        onScroll={handleContainerScroll}
        className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-text-muted space-y-3">
            <MessageSquare className="w-8 h-8 text-card-border" />
            <p>No messages exchanged yet. Send a query below to start.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isAgency = msg.sender === 'agency';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isAgency ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border text-[11px] font-bold ${
                    isAgency
                      ? 'bg-electric-blue/20 border-electric-blue/40 text-electric-blue'
                      : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  }`}
                >
                  {isAgency ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div
                    className={`flex items-center gap-2 text-[10px] ${
                      isAgency ? 'text-left' : 'text-right justify-end'
                    }`}
                  >
                    <span className="font-bold text-foreground">{msg.senderName}</span>
                    <span className="text-text-muted text-[9px] uppercase tracking-wider">
                      • {msg.senderRole}
                    </span>
                    <span className="text-text-muted text-[9px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${
                      isAgency
                        ? 'bg-card-bg border-electric-blue/30 text-foreground shadow-lg'
                        : 'bg-card-bg/90 border-card-border text-foreground shadow-md'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Quick Actions */}
      <div className="px-6 py-2.5 bg-card-bg/40 border-t border-card-border">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="text-text-muted text-[10px] flex items-center gap-1 uppercase tracking-wider shrink-0">
            <Zap className="w-3 h-3 text-electric-blue" />
            Quick Prompts:
          </span>
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(prompt)}
              className="px-2.5 py-1 rounded-lg border border-card-border bg-card-bg hover:border-electric-blue/40 hover:text-electric-blue text-text-muted transition-colors text-[10px]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Composer */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-card-border bg-card-bg/80 backdrop-blur-md flex items-center gap-3 font-mono"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask WebMuse Lead Engineers or request technical updates..."
          className="flex-1 bg-background/80 border border-card-border rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:outline-none focus:border-electric-blue transition-colors"
          disabled={isSending}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="px-5 py-3 rounded-xl bg-electric-blue text-background font-bold text-xs flex items-center gap-2 hover:bg-electric-blue/90 disabled:opacity-50 transition-all shadow-lg hover:shadow-electric-blue/20 active:scale-95"
        >
          {isSending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
