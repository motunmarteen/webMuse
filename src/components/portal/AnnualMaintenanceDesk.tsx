'use client';

import React, { useState } from 'react';
import type { Project, MaintenanceRetainer, MaintenanceTier } from '@/lib/types/portal';
import {
  ShieldCheck,
  ShieldAlert,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  CreditCard,
  Sparkles,
  FileCheck,
  ChevronRight,
  RefreshCw,
  Award,
  PhoneCall,
  Server,
  Layers,
} from 'lucide-react';

interface AnnualMaintenanceDeskProps {
  project: Project;
  onUpdateProject?: (updated: Project) => void;
}

interface TierPlan {
  id: MaintenanceTier;
  name: string;
  tagline: string;
  costUsd: number;
  costNgn: number;
  slaResponse: string;
  uptimeGuarantee: string;
  devHoursMonthly: number;
  features: string[];
  popular?: boolean;
}

const MAINTENANCE_PLANS: TierPlan[] = [
  {
    id: 'standard',
    name: 'Sentinel Care (Standard SLA)',
    tagline: 'Foundational maintenance and proactive security safeguarding.',
    costUsd: 2400,
    costNgn: 3600000,
    slaResponse: '< 24 Hours Standard SLA',
    uptimeGuarantee: '99.9% Uptime Commitment',
    devHoursMonthly: 5,
    features: [
      '24/7 Continuous Uptime & Server Ping Sentinel',
      'Weekly automated dependency security patch vetting',
      'Weekly automated database snapshots & WAL recovery',
      '5 hours / month included engineering tweaks & hotfixes',
      'SSL certificate renewal & Cloudflare DNS maintenance',
      'Standard ticket dispatch in Direct Agency Comms',
    ],
  },
  {
    id: 'mission_critical',
    name: 'Mission Critical 24/7 SLA',
    tagline: 'Institutional-grade emergency response and continuous performance optimization.',
    costUsd: 5000,
    costNgn: 7500000,
    slaResponse: '< 2 Hours Emergency Response SLA',
    uptimeGuarantee: '99.99% Availability Guarantee',
    devHoursMonthly: 15,
    popular: true,
    features: [
      'Everything in Sentinel Care tier',
      '< 2 Hours Emergency Outage response SLA guarantee',
      'Daily zero-downtime database backups & automated restore drills',
      'Direct priority hotline to WebMuse Senior Lead Architects',
      '15 hours / month included engineering sprints & feature tweaks',
      'Cloudflare Edge WAF firewall rules tuning & anti-DDoS shield',
      'Quarterly Lighthouse 100/100 Core Web Vitals optimization',
      'Priority onboarding for quarterly platform expansions',
    ],
  },
  {
    id: 'enterprise',
    name: 'Autonomous Enterprise Retainer',
    tagline: 'Dedicated fractional engineering squad and custom feature co-pilot.',
    costUsd: 12000,
    costNgn: 18000000,
    slaResponse: '< 30 Minutes Direct Lead Paging',
    uptimeGuarantee: '99.995% Institutional Uptime',
    devHoursMonthly: 30,
    features: [
      'Everything in Mission Critical tier',
      '< 30 Minutes Direct On-Call Lead paging SLA',
      'Hourly database replication & multi-region failover',
      'Dedicated Senior DevOps & Full-Stack Engineer co-pilot',
      '30 hours / month included high-ticket feature engineering',
      'Custom microservices development & AI model integration',
      'Quarterly in-person or Zoom executive strategy review',
      'Zero-charge emergency incident remediations',
    ],
  },
];

export function AnnualMaintenanceDesk({
  project,
  onUpdateProject,
}: AnnualMaintenanceDeskProps) {
  const currentRetainer = project.maintenanceRetainer;
  const [selectedTier, setSelectedTier] = useState<MaintenanceTier>(
    currentRetainer?.tier || 'mission_critical'
  );
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const calculateDaysRemaining = (expiryDate?: string) => {
    if (!expiryDate) return 0;
    const diff = new Date(expiryDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = calculateDaysRemaining(currentRetainer?.expiresAt);

  const handleSubscribe = async (tier: MaintenanceTier) => {
    setIsSubscribing(true);
    setSuccessMessage(null);

    const plan = MAINTENANCE_PLANS.find((p) => p.id === tier);
    const mockRef = `ANNUAL_RETAINER_${tier.toUpperCase()}_${Date.now().toString(36).toUpperCase()}`;

    try {
      const res = await fetch('/api/portal/maintenance/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          tier,
          paymentRef: mockRef,
          annualCostUsd: plan?.costUsd,
          annualCostNgn: plan?.costNgn,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.project) {
          if (onUpdateProject) onUpdateProject(data.project);
        }
        setSuccessMessage(
          `Annual Retainer successfully activated! Your platform is covered under the ${plan?.name} for the next 365 days.`
        );
      }
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-mono text-xs">
      {/* Header Deck */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] text-electric-blue uppercase tracking-widest font-semibold">
              <Award className="w-3.5 h-3.5" />
              ANNUAL PLATFORM MAINTENANCE &amp; CONTINUOUS CARE RETAINER
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
              Maintain, Safeguard &amp; Scale Your Platform
            </h2>
            <p className="text-text-muted font-light leading-relaxed">
              High-ticket software requires relentless vigilance. Our annual retainer pairs your platform with WebMuse lead engineers to guarantee 99.99% uptime, rapid hotfixes, continuous dependency updates, and SLA-backed incident response.
            </p>
          </div>

          {/* Active Status Pill */}
          <div className="p-5 rounded-2xl border border-card-border bg-card-bg/70 flex flex-col justify-center items-start sm:items-end space-y-2">
            <div className="text-[10px] text-text-muted uppercase tracking-wider">Active Retainer Status</div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-base font-bold text-foreground">
                {currentRetainer?.status === 'active' ? currentRetainer.tierName : 'Subscription Inactive'}
              </span>
            </div>
            {currentRetainer?.expiresAt && (
              <div className="text-[11px] text-electric-blue font-semibold">
                Covered until {new Date(currentRetainer.expiresAt).toLocaleDateString()} ({daysRemaining} days remaining)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Currency Switcher */}
      <div className="flex items-center justify-between border-b border-card-border pb-3">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-[11px] uppercase tracking-wider">Billing Currency:</span>
          <div className="flex rounded-xl border border-card-border bg-card-bg p-1">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-electric-blue text-background shadow-md'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              USD ($ / USDT)
            </button>
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'NGN'
                  ? 'bg-electric-blue text-background shadow-md'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              NGN (₦ Fiat)
            </button>
          </div>
        </div>

        <span className="text-[10px] text-text-muted hidden sm:inline">
          Billed annually • 100% Tax Compliant Invoice Generated
        </span>
      </div>

      {/* Retainer Tiers Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MAINTENANCE_PLANS.map((plan) => {
          const isCurrent = currentRetainer?.tier === plan.id && currentRetainer?.status === 'active';
          const isSelected = selectedTier === plan.id;

          return (
            <div
              key={plan.id}
              className={`glassmorphism-card rounded-2xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 transition-all relative ${
                plan.popular
                  ? 'border-electric-blue/50 shadow-2xl shadow-electric-blue/10 bg-card-bg/80'
                  : 'border-card-border bg-card-bg/50 hover:border-card-border/90'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-electric-blue text-background text-[10px] font-bold uppercase tracking-widest shadow-md">
                  RECOMMENDED // AGENCY STANDARD
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold font-display text-text-title">{plan.name}</h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl border border-card-border bg-card-bg/70 space-y-1">
                  <div className="text-[10px] text-text-muted uppercase">Annual Retainer Fee</div>
                  <div className="text-2xl font-bold text-foreground">
                    {currency === 'USD' ? `$${plan.costUsd.toLocaleString()}` : `₦${plan.costNgn.toLocaleString()}`}
                    <span className="text-xs text-text-muted font-normal"> / year</span>
                  </div>
                  <div className="text-[10px] text-electric-blue">
                    {currency === 'USD'
                      ? `Equivalent to ~$${Math.round(plan.costUsd / 12)} / month`
                      : `Equivalent to ~₦${Math.round(plan.costNgn / 12).toLocaleString()} / month`}
                  </div>
                </div>

                {/* Core SLA Specs */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2.5 rounded-lg border border-card-border bg-background space-y-0.5">
                    <div className="text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-electric-blue" />
                      <span>SLA Response</span>
                    </div>
                    <div className="text-foreground font-bold">{plan.slaResponse}</div>
                  </div>

                  <div className="p-2.5 rounded-lg border border-card-border bg-background space-y-0.5">
                    <div className="text-text-muted flex items-center gap-1">
                      <Server className="w-3 h-3 text-emerald-400" />
                      <span>Availability</span>
                    </div>
                    <div className="text-foreground font-bold">{plan.uptimeGuarantee}</div>
                  </div>
                </div>

                {/* Included Features List */}
                <div className="space-y-2 pt-2 border-t border-card-border">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                    Covered Retainer Capabilities:
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-blue shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-card-border space-y-2">
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isSubscribing}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 ${
                    plan.popular
                      ? 'bg-electric-blue text-background hover:bg-electric-blue/90 shadow-electric-blue/20'
                      : 'border border-card-border bg-card-bg text-foreground hover:border-electric-blue/50'
                  }`}
                >
                  {isSubscribing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : isCurrent ? (
                    <>
                      <span>Renew / Extend 1 Year</span>
                      <RefreshCw className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Select &amp; Activate Yearly Retainer</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[9px] text-center text-text-muted">
                  Instant invoice dispatch • Unlocks direct engineering hotline
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
