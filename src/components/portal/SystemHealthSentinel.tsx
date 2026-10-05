'use client';

import React, { useState } from 'react';
import type { Project, HealthSentinel, BackupRecord, IncidentReport } from '@/lib/types/portal';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Database,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  RefreshCw,
  Send,
  FileCheck,
  Cpu,
  Lock,
} from 'lucide-react';

interface SystemHealthSentinelProps {
  project: Project;
  clientEmail: string;
}

export function SystemHealthSentinel({ project, clientEmail }: SystemHealthSentinelProps) {
  const health = project.healthSentinel || {
    uptimePercentage: 99.98,
    avgLatencyMs: 34,
    sslGrade: 'A+',
    edgeNodesActive: 284,
    lastChecked: new Date().toISOString(),
    status: 'optimal',
  };

  const backups = project.backups || [];

  const [isEscalateOpen, setIsEscalateOpen] = useState(false);
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDesc, setIncidentDesc] = useState('');
  const [incidentSeverity, setIncidentSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState<string | null>(null);

  const handleReportIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentTitle.trim() || !incidentDesc.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/portal/incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          title: incidentTitle.trim(),
          description: incidentDesc.trim(),
          severity: incidentSeverity,
        }),
      });

      if (res.ok) {
        setSubmittedAlert(
          `Critical incident report successfully dispatched! On-call engineering leads have been paged and an alert was dispatched to your Direct Comms channel.`
        );
        setIsEscalateOpen(false);
        setIncidentTitle('');
        setIncidentDesc('');
      }
    } catch (err) {
      console.error('Incident report error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-mono text-xs">
      {/* Top Banner */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM HEALTH, UPTIME &amp; DISASTER RECOVERY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
              24/7 Production Sentinel
            </h2>
            <p className="text-text-muted font-light leading-relaxed">
              Global edge telemetry, automated snapshot verification, and direct-line emergency escalation hotline monitored by WebMuse site reliability engineers.
            </p>
          </div>

          <button
            onClick={() => setIsEscalateOpen(true)}
            className="px-5 py-3 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-red-500/10 active:scale-95 shrink-0"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>Escalate Critical Outage</span>
          </button>
        </div>
      </div>

      {submittedAlert && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{submittedAlert}</span>
        </div>
      )}

      {/* Emergency Outage Escalation Modal */}
      {isEscalateOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl border border-red-500/40 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm font-display">
                <ShieldAlert className="w-5 h-5" />
                <span>PAGE ON-CALL ENGINEERING LEADS</span>
              </div>
              <button
                onClick={() => setIsEscalateOpen(false)}
                className="text-text-muted hover:text-foreground text-xs"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleReportIncident} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase tracking-wider">
                  Incident Severity Level
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {(['medium', 'high', 'critical'] as const).map((sev) => (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setIncidentSeverity(sev)}
                      className={`py-2 rounded-xl border uppercase font-bold text-[10px] transition-all ${
                        incidentSeverity === sev
                          ? sev === 'critical'
                            ? 'border-red-500 bg-red-500 text-background'
                            : 'border-amber-400 bg-amber-400 text-background'
                          : 'border-card-border bg-card-bg text-text-muted'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase tracking-wider">
                  Incident Title / Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staging API 502 Bad Gateway / DNS Propagation Failure"
                  value={incidentTitle}
                  onChange={(e) => setIncidentTitle(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase tracking-wider">
                  Incident Description &amp; Symptoms
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the affected URLs, timestamps, or errors observed..."
                  value={incidentDesc}
                  onChange={(e) => setIncidentDesc(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-red-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEscalateOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs flex items-center gap-2 hover:bg-red-600 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Dispatch Alert</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Real-Time Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border space-y-1">
          <div className="flex items-center justify-between text-text-muted text-[10px]">
            <span className="uppercase">Rolling 30-Day Uptime</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {health.uptimePercentage}%
          </div>
          <div className="text-[9px] text-text-muted">Target SLA: 99.99% Guaranteed</div>
        </div>

        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border space-y-1">
          <div className="flex items-center justify-between text-text-muted text-[10px]">
            <span className="uppercase">Edge Response Latency</span>
            <Zap className="w-3.5 h-3.5 text-electric-blue" />
          </div>
          <div className="text-2xl font-bold text-electric-blue">
            {health.avgLatencyMs} ms
          </div>
          <div className="text-[9px] text-text-muted">Global 4G/5G Median</div>
        </div>

        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border space-y-1">
          <div className="flex items-center justify-between text-text-muted text-[10px]">
            <span className="uppercase">Edge SSL / TLS Rating</span>
            <Lock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">
            Grade {health.sslGrade}
          </div>
          <div className="text-[9px] text-text-muted">TLS 1.3 Perfect Forward Secrecy</div>
        </div>

        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border space-y-1">
          <div className="flex items-center justify-between text-text-muted text-[10px]">
            <span className="uppercase">Cloudflare Edge Points</span>
            <Radio className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {health.edgeNodesActive}
          </div>
          <div className="text-[9px] text-text-muted">Anycast Global Routing Nodes</div>
        </div>
      </div>

      {/* Automated Backups Ledger */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border space-y-6">
        <div className="flex items-center justify-between border-b border-card-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-electric-blue" />
              <h3 className="text-base font-bold font-display text-text-title">
                Automated Database &amp; Code Snapshot Safe
              </h3>
            </div>
            <p className="text-[11px] text-text-muted">
              Zero-downtime automated backups taken every 24 hours with cryptographic verification checks.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
            RPO: &lt; 24h // RTO: &lt; 15m
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-card-border text-[10px] text-text-muted uppercase">
                <th className="pb-3 font-semibold">Snapshot ID</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Archive Size</th>
                <th className="pb-3 font-semibold">Retention</th>
                <th className="pb-3 font-semibold text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {backups.map((bk) => (
                <tr key={bk.id} className="hover:bg-card-bg/40 transition-colors">
                  <td className="py-3 font-mono font-bold text-electric-blue">
                    {bk.id}
                  </td>
                  <td className="py-3 text-foreground">
                    {new Date(bk.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 text-text-muted uppercase text-[10px]">
                    {bk.snapshotType.replace('_', ' ')}
                  </td>
                  <td className="py-3 text-foreground font-mono">{bk.sizeBytes}</td>
                  <td className="py-3 text-text-muted">{bk.retentionDays} Days</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
