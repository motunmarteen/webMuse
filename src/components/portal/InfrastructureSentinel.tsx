'use client';

import React, { useState } from 'react';
import type { Project, DomainRecord, ToolItem, SubscriptionService } from '@/lib/types/portal';
import {
  Globe,
  ShieldCheck,
  CreditCard,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lock,
  Cpu,
  Server,
  Database,
  Radio,
  Sparkles,
  Zap,
  RefreshCw,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface InfrastructureSentinelProps {
  project: Project;
}

export function InfrastructureSentinel({ project }: InfrastructureSentinelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'domains' | 'subscriptions' | 'tools'>('domains');

  const domains = project.domains || [];
  const subscriptions = project.subscriptions || [];
  const tools = project.tools || [];

  // Helper to compute remaining days from today
  const calculateDaysRemaining = (targetDateIso: string) => {
    const diffMs = new Date(targetDateIso).getTime() - Date.now();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-8 animate-fade-in font-mono text-xs">
      {/* Infrastructure Top Overview Deck */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] text-electric-blue uppercase tracking-widest font-semibold">
              <Server className="w-3.5 h-3.5" />
              INFRASTRUCTURE, DOMAINS &amp; TOOLING SENTINEL
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
              Operational Fleet &amp; Subscriptions
            </h2>
            <p className="text-text-muted font-light leading-relaxed">
              Transparent, real-time telemetry into your active web domains, cloud hosting contracts, third-party software subscriptions, and full-stack tooling inventory.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-card-border bg-card-bg/60 text-center">
              <div className="text-[10px] text-text-muted uppercase">Domains</div>
              <div className="text-xl font-bold text-foreground mt-0.5">{domains.length}</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">TLS 1.3 Active</div>
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card-bg/60 text-center">
              <div className="text-[10px] text-text-muted uppercase">SaaS Services</div>
              <div className="text-xl font-bold text-electric-blue mt-0.5">{subscriptions.length}</div>
              <div className="text-[9px] text-text-muted mt-0.5">Auto-Monitored</div>
            </div>

            <div className="p-3.5 rounded-xl border border-card-border bg-card-bg/60 text-center">
              <div className="text-[10px] text-text-muted uppercase">Tech Stack</div>
              <div className="text-xl font-bold text-purple-400 mt-0.5">{tools.length}</div>
              <div className="text-[9px] text-text-muted mt-0.5">Enterprise Tier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-card-border pb-2 text-xs">
        <button
          onClick={() => setActiveSubTab('domains')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'domains'
              ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
              : 'text-text-muted hover:text-foreground'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Domain &amp; SSL Expiry ({domains.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('subscriptions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'subscriptions'
              ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
              : 'text-text-muted hover:text-foreground'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>SaaS Subscriptions Expiry ({subscriptions.length})</span>
          {subscriptions.some((s) => calculateDaysRemaining(s.renewDate) <= 30) && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('tools')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'tools'
              ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
              : 'text-text-muted hover:text-foreground'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Complete Tooling Matrix ({tools.length})</span>
        </button>
      </div>

      {/* ================= SUB-TAB 1: DOMAIN & SSL EXPIRATION ================= */}
      {activeSubTab === 'domains' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((dom) => {
              const daysLeft = calculateDaysRemaining(dom.expiresAt);
              const sslDaysLeft = calculateDaysRemaining(dom.sslExpiresAt);
              const isUrgent = daysLeft < 30;
              const isWarning = daysLeft < 60 && !isUrgent;

              return (
                <div
                  key={dom.id}
                  className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-6 relative overflow-hidden"
                >
                  {/* Top domain card bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground font-display">
                          {dom.domain}
                        </h3>
                        <p className="text-[10px] text-text-muted font-mono">
                          Registrar: <span className="text-foreground">{dom.registrar}</span>
                        </p>
                      </div>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isUrgent
                          ? 'border-red-500/40 bg-red-500/10 text-red-400'
                          : isWarning
                            ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                            : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{daysLeft} Days Left</span>
                    </div>
                  </div>

                  {/* Expiration Visual Gauge */}
                  <div className="p-4 rounded-xl border border-card-border bg-card-bg/60 space-y-3">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-text-muted">Domain Expiration Date:</span>
                      <span className="font-bold text-foreground">
                        {new Date(dom.expiresAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-card-border">
                      <div
                        className={`h-full transition-all ${
                          isUrgent ? 'bg-red-400' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.max(5, (daysLeft / 365) * 100))}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-text-muted">
                      <span>Registered: {new Date(dom.registeredAt).toLocaleDateString()}</span>
                      <span>
                        Auto-Renew: {dom.autoRenew ? 'Active (Cloudflare Vault)' : 'Manual Action'}
                      </span>
                    </div>
                  </div>

                  {/* SSL & Nameserver Specifications */}
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 rounded-xl border border-card-border bg-card-bg/40 space-y-1">
                      <div className="text-[10px] text-text-muted flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>SSL / TLS 1.3</span>
                      </div>
                      <div className="text-emerald-400 font-bold uppercase">{dom.sslStatus}</div>
                      <div className="text-[10px] text-text-muted truncate">
                        {dom.sslIssuer}
                      </div>
                      <div className="text-[9px] text-text-muted">
                        Renews in {sslDaysLeft} days
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-card-border bg-card-bg/40 space-y-1">
                      <div className="text-[10px] text-text-muted flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-electric-blue" />
                        <span>Renewal Cost</span>
                      </div>
                      <div className="text-foreground font-bold">
                        {dom.annualRenewalCostUsd > 0
                          ? `$${dom.annualRenewalCostUsd.toFixed(2)} / yr`
                          : 'Included in WebMuse Retainer'}
                      </div>
                      <div className="text-[10px] text-text-muted">Wholesale Registrar Rate</div>
                    </div>
                  </div>

                  {/* Nameservers */}
                  <div className="pt-2 border-t border-card-border text-[10px] text-text-muted space-y-1">
                    <span className="uppercase tracking-wider font-semibold">Active Nameservers:</span>
                    <div className="flex flex-wrap gap-2">
                      {dom.nameservers.map((ns, i) => (
                        <code
                          key={i}
                          className="px-2 py-0.5 rounded bg-background border border-card-border text-foreground font-mono text-[10px]"
                        >
                          {ns}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SUB-TAB 2: SAAS SUBSCRIPTIONS EXPIRY ================= */}
      {activeSubTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-card-border bg-card-bg/40 text-text-muted text-xs leading-relaxed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-electric-blue" />
              <span>
                WebMuse monitors all active cloud compute, database clusters, APIs, and CDN tiers powering your application.
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">ALL SERVICES RUNNING</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((sub) => {
              const daysLeft = calculateDaysRemaining(sub.renewDate);
              const isUrgent = daysLeft <= 14;
              const isSoon = daysLeft <= 30 && !isUrgent;

              return (
                <div
                  key={sub.id}
                  className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider">
                          {sub.provider}
                        </div>
                        <h4 className="text-base font-bold text-foreground font-display mt-0.5">
                          {sub.name}
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                          isUrgent
                            ? 'border-red-500/40 bg-red-500/10 text-red-400 animate-pulse'
                            : isSoon
                              ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                              : 'border-card-border bg-card-bg text-emerald-400'
                        }`}
                      >
                        {daysLeft}d left
                      </span>
                    </div>

                    {/* Cost & Cycle */}
                    <div className="p-3.5 rounded-xl border border-card-border bg-card-bg/60 space-y-1">
                      <div className="text-[10px] text-text-muted uppercase">Billing Amount</div>
                      <div className="text-lg font-bold text-foreground">
                        ${sub.costUsd}{' '}
                        <span className="text-xs text-text-muted font-normal">
                          / {sub.billingCycle} (₦{sub.costNgn.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Expiry Details */}
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          Next Renewal Date:
                        </span>
                        <span className="font-bold text-foreground">
                          {new Date(sub.renewDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-text-muted">
                        <span>Payer &amp; Administrator:</span>
                        <span className="text-electric-blue font-semibold">
                          {sub.managedBy === 'agency' ? 'WebMuse Studio (Managed)' : 'Client Card Direct'}
                        </span>
                      </div>

                      {sub.paymentCardLast4 && (
                        <div className="flex items-center justify-between text-text-muted">
                          <span>Billing Source:</span>
                          <span>Card ending in •••• {sub.paymentCardLast4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Banner / Action */}
                  <div className="pt-3 border-t border-card-border flex items-center justify-between text-[10px]">
                    {sub.actionRequired ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {sub.actionRequired}
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Continuous Service Active
                      </span>
                    )}

                    {sub.loginUrl && (
                      <a
                        href={sub.loginUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-electric-blue hover:underline flex items-center gap-1"
                      >
                        <span>Console</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SUB-TAB 3: COMPLETE TOOLING MATRIX ================= */}
      {activeSubTab === 'tools' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-card-border bg-card-bg/40 text-text-muted text-xs leading-relaxed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-electric-blue" />
              <span>
                Enterprise tooling Bill of Materials (BOM) deployed for {project.title}. Curated to eliminate technical debt and ensure sub-second global response times.
              </span>
            </div>
            <div className="text-[10px] text-electric-blue font-bold font-mono">100% AUDITED</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-2xl border border-card-border bg-card-bg/60 space-y-3 hover:border-card-border/90 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-card-bg border border-card-border flex items-center justify-center text-electric-blue">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{tool.name}</h4>
                        {tool.version && (
                          <span className="px-2 py-0.2 rounded bg-card-bg border border-card-border text-[9px] text-text-muted">
                            {tool.version}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-electric-blue uppercase font-mono">
                        {tool.category} • {tool.tier}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[9px] text-emerald-400 font-bold uppercase">
                    {tool.status}
                  </span>
                </div>

                <p className="text-text-muted text-[11px] leading-relaxed">
                  {tool.purpose}
                </p>

                {tool.docsUrl && (
                  <div className="pt-2 border-t border-card-border flex items-center justify-between text-[10px]">
                    <span className="text-text-muted">Official Documentation:</span>
                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-electric-blue hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Explore Specs</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
