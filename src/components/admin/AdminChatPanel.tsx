'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage, Project, Client } from '@/lib/types/portal';
import {
  MessageSquare,
  Send,
  Sparkles,
  User,
  Radio,
  RefreshCw,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

interface AdminChatPanelProps {
  project: Project;
  client: Client | null;
  adminEmail: string;
}

export function AdminChatPanel({
  project,
  client,
  adminEmail,
}: AdminChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
    isUserScrolledUpRef.current = scrollHeight - scrollTop - clientHeight > 80;
  };

  const scrollToBottom = (force = false) => {
    if (force || !isUserScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchMessages = async () => {
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
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 6000);
    return () => clearInterval(interval);
  }, [project.id]);

  useEffect(() => {
    if (isInitialMount.current) {
      scrollToBottom(true);
      isInitialMount.current = false;
    } else if (!isUserScrolledUpRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const messageContent = inputText.trim();
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          message: messageContent,
          senderName: 'Marteen Mubaraq',
          senderRole: 'WebMuse Lead Architect',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }
      }
    } catch (err) {
      console.error('Admin message error:', err);
    } finally {
      setIsSending(false);
      setTimeout(() => scrollToBottom(true), 100);
    }
  };

  return (
    <div className="glassmorphism-card rounded-2xl border border-card-border overflow-hidden shadow-2xl flex flex-col h-[580px] font-mono text-xs">
      {/* Header */}
      <div className="px-6 py-4 border-b border-card-border bg-card-bg/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground">
                Client Direct Comms Bridge
              </h3>
              <span className="px-2 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] text-electric-blue">
                {client?.name || 'Client'} ({client?.company || 'Partner'})
              </span>
            </div>
            <p className="text-[10px] text-text-muted">
              Live bidirectional message channel with client portal
            </p>
          </div>
        </div>

        <button
          onClick={fetchMessages}
          disabled={isRefreshing}
          className="p-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground"
          title="Refresh messages"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Message Feed */}
      <div
        ref={chatContainerRef}
        onScroll={handleContainerScroll}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-card-border" />
            <p>No chat history yet with this client.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isAgency = msg.sender === 'agency';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isAgency ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[10px] font-bold ${
                    isAgency
                      ? 'bg-electric-blue/20 border-electric-blue/40 text-electric-blue'
                      : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  }`}
                >
                  {isAgency ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`flex items-center gap-1.5 text-[9px] text-text-muted ${
                      isAgency ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="font-bold text-foreground">{msg.senderName}</span>
                    <span>• {msg.senderRole}</span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${
                      isAgency
                        ? 'bg-electric-blue/10 border-electric-blue/30 text-foreground'
                        : 'bg-card-bg border-card-border text-foreground'
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

      {/* Admin Message Composer */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-card-border bg-card-bg/80 flex items-center gap-3"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Reply to ${client?.name || 'client'} as WebMuse Lead Architect...`}
          className="flex-1 bg-background border border-card-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-electric-blue"
          disabled={isSending}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="px-5 py-2.5 rounded-xl bg-electric-blue text-background font-bold text-xs flex items-center gap-2 hover:bg-electric-blue/90 disabled:opacity-50 transition-all shadow-md active:scale-95"
        >
          {isSending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Reply</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
