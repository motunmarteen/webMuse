'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Project, ReviewPin } from '@/lib/types/portal';
import { SimulatedStagingPreview } from '@/components/portal/SimulatedStagingPreview';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  RefreshCw,
  MessageSquarePlus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Plus,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Pin,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';

interface StagingReviewStudioProps {
  project: Project;
  clientEmail?: string;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

const VIEWPORT_CONFIG: Record<
  ViewportMode,
  { label: string; icon: React.ComponentType<{ className?: string }>; widthPx: number }
> = {
  desktop: { label: 'Desktop', icon: Monitor, widthPx: 1440 },
  tablet: { label: 'Tablet', icon: Tablet, widthPx: 768 },
  mobile: { label: 'Mobile', icon: Smartphone, widthPx: 375 },
};

export function StagingReviewStudio({ project, clientEmail }: StagingReviewStudioProps) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [previewSource, setPreviewSource] = useState<'simulation' | 'iframe'>('simulation');
  const [isFeedbackMode, setIsFeedbackMode] = useState(false);
  const [pins, setPins] = useState<ReviewPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved'>('all');

  // New Pin Creation State
  const [pendingCoords, setPendingCoords] = useState<{ xPercent: number; yPercent: number } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newSeverity, setNewSeverity] = useState<'tweak' | 'bug' | 'copy'>('tweak');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Iframe reload key
  const [iframeKey, setIframeKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const stagingUrl = project.stagingUrl || `https://staging.${project.slug}.webmuse.dev`;

  // Fetch pins
  const fetchPins = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/portal/staging/pins?projectId=${project.id}`);
      if (!res.ok) throw new Error('Failed to load review pins');
      const data = await res.json();
      if (data.success) {
        setPins(data.pins);
      }
    } catch (err) {
      console.error('[Fetch Pins Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPins();
  }, [project.id]);

  // Handle click on canvas overlay in Feedback Mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFeedbackMode) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setPendingCoords({
      xPercent: Math.round(xPercent * 10) / 10,
      yPercent: Math.round(yPercent * 10) / 10,
    });
  };

  // Submit new pin
  const handleSubmitPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingCoords || !newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/portal/staging/pins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          milestoneId: project.milestones[project.currentPhaseIndex]?.id || 'ms_general',
          comment: newComment.trim(),
          xPercent: pendingCoords.xPercent,
          yPercent: pendingCoords.yPercent,
          viewportWidth: VIEWPORT_CONFIG[viewport].widthPx,
          severity: newSeverity,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to drop pin');

      setPins((prev) => [data.pin, ...prev]);
      setActivePinId(data.pin.id);
      setPendingCoords(null);
      setNewComment('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error submitting feedback pin');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resolve or reopen pin
  const handleTogglePinStatus = async (pinId: string, currentStatus: 'open' | 'resolved') => {
    const nextStatus = currentStatus === 'open' ? 'resolved' : 'open';
    try {
      const res = await fetch('/api/portal/staging/pins', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinId, status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update pin');

      setPins((prev) => prev.map((p) => (p.id === pinId ? { ...p, status: nextStatus } : p)));
    } catch (err) {
      alert('Failed to update pin status');
    }
  };

  const filteredPins = pins.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const openPinsCount = pins.filter((p) => p.status === 'open').length;

  return (
    <div className="space-y-6 animate-fade-in font-mono">
      {/* Studio Control Header */}
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg/80 backdrop-blur-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] text-electric-blue uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE STAGING REVIEW STUDIO // SPRINT VALIDATION DECK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-title tracking-tight">
              Staging Review Deck
            </h2>
            <p className="text-xs text-text-muted max-w-xl">
              Preview live builds in an isolated sandbox. Switch between Desktop, Tablet, and Mobile viewports,
              or toggle &quot;Pinpoint Feedback Mode&quot; to click anywhere and drop visual revision markers directly
              for WebMuse engineers.
            </p>
          </div>

          {/* Viewport & Feedback Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Viewport Mode Switcher */}
            <div className="flex items-center rounded-2xl border border-card-border bg-black/40 p-1">
              {(Object.keys(VIEWPORT_CONFIG) as ViewportMode[]).map((mode) => {
                const cfg = VIEWPORT_CONFIG[mode];
                const Icon = cfg.icon;
                const isActive = viewport === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setViewport(mode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                      isActive
                        ? 'bg-electric-blue text-black font-bold shadow-md'
                        : 'text-text-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Source Switcher: Simulation vs External Iframe */}
            <div className="flex items-center rounded-2xl border border-card-border bg-black/40 p-1 text-xs">
              <button
                onClick={() => setPreviewSource('simulation')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  previewSource === 'simulation'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-text-muted hover:text-foreground'
                }`}
                title="Interactive Staging Application Sandbox"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive App</span>
              </button>

              <button
                onClick={() => setPreviewSource('iframe')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  previewSource === 'iframe'
                    ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/40 font-bold'
                    : 'text-text-muted hover:text-foreground'
                }`}
                title="Raw External Staging URL (Iframe)"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>External URL</span>
              </button>
            </div>

            {/* Reload Preview */}
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="p-2.5 rounded-2xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
              title="Refresh Staging Build"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Feedback Mode Master Toggle */}
            <button
              onClick={() => {
                setIsFeedbackMode(!isFeedbackMode);
                setPendingCoords(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                isFeedbackMode
                  ? 'bg-amber-400 text-black shadow-amber-400/20 ring-2 ring-amber-400/40 animate-pulse'
                  : 'bg-card-bg border border-card-border text-foreground hover:border-amber-400/50'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isFeedbackMode ? 'Exit Feedback Mode' : 'Drop Feedback Pin'}</span>
              {openPinsCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isFeedbackMode ? 'bg-black text-amber-400' : 'bg-amber-400/20 text-amber-400'
                  }`}
                >
                  {openPinsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Mode Active Banner */}
        {isFeedbackMode && (
          <div className="mt-4 p-3 rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>
                <strong>FEEDBACK MODE ENGAGED:</strong> Click anywhere on the staging frame below to drop a pinpoint marker.
              </span>
            </div>
            <button
              onClick={() => setIsFeedbackMode(false)}
              className="text-[10px] text-amber-400 uppercase tracking-wider underline hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Main Studio Grid: Staging Canvas + Pin Inspection Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left 3 Columns: Staging Preview Canvas Container */}
        <div className="xl:col-span-3 flex flex-col items-center w-full">
          {/* Viewport Resizing Container */}
          <div
            className="transition-all duration-500 mx-auto flex flex-col items-center max-w-full"
            style={{
              width: viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '768px' : '100%',
            }}
          >
            {/* MOBILE SMARTPHONE CHASSIS */}
            {viewport === 'mobile' && (
              <div className="w-full rounded-[48px] border-[10px] border-zinc-800 bg-zinc-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex flex-col items-center">
                {/* Dynamic Island */}
                <div className="w-28 h-5 rounded-full bg-black mx-auto mb-2 flex items-center justify-center gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                </div>

                {/* Inner Screen */}
                <div
                  ref={containerRef}
                  onClick={handleCanvasClick}
                  className={`relative w-full h-[640px] rounded-[36px] overflow-hidden bg-black shadow-inner ${
                    isFeedbackMode ? 'cursor-crosshair ring-2 ring-amber-400/40' : ''
                  }`}
                >
                  {previewSource === 'simulation' ? (
                    <SimulatedStagingPreview project={project} viewport={viewport} />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src={stagingUrl}
                      title={`${project.title} Staging Preview`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={`w-full h-full border-0 select-none ${isFeedbackMode ? 'pointer-events-none' : ''}`}
                    />
                  )}

                  {/* Pinpoint Pins Overlay */}
                  {renderPinsOverlay()}
                </div>

                {/* Home Indicator Bar */}
                <div className="w-32 h-1 rounded-full bg-zinc-600 mx-auto mt-2 shrink-0" />
              </div>
            )}

            {/* TABLET IPAD CHASSIS */}
            {viewport === 'tablet' && (
              <div className="w-full rounded-[36px] border-[12px] border-zinc-800 bg-zinc-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex flex-col items-center">
                {/* Top Camera dot */}
                <div className="w-2 h-2 rounded-full bg-zinc-700 mx-auto mb-2 shrink-0" />

                {/* Inner Screen */}
                <div
                  ref={containerRef}
                  onClick={handleCanvasClick}
                  className={`relative w-full h-[680px] rounded-[24px] overflow-hidden bg-black shadow-inner ${
                    isFeedbackMode ? 'cursor-crosshair ring-2 ring-amber-400/40' : ''
                  }`}
                >
                  {previewSource === 'simulation' ? (
                    <SimulatedStagingPreview project={project} viewport={viewport} />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src={stagingUrl}
                      title={`${project.title} Staging Preview`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={`w-full h-full border-0 select-none ${isFeedbackMode ? 'pointer-events-none' : ''}`}
                    />
                  )}

                  {/* Pinpoint Pins Overlay */}
                  {renderPinsOverlay()}
                </div>
              </div>
            )}

            {/* DESKTOP WORKSTATION BROWSER CHASSIS */}
            {viewport === 'desktop' && (
              <div className="w-full rounded-2xl border border-card-border bg-black/90 shadow-2xl overflow-hidden flex flex-col">
                {/* Viewport Browser Top Bar */}
                <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-card-border bg-black/60 text-[11px] text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-[10px] text-text-muted/60 truncate max-w-xs">
                      {previewSource === 'simulation' ? `https://staging.${project.slug}.webmuse.dev (Simulated)` : stagingUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] uppercase font-semibold text-text-muted">
                    <span>1440px Desktop</span>
                    <span>•</span>
                    <span className="text-emerald-400">SSL Active</span>
                  </div>
                </div>

                {/* Inner Screen */}
                <div
                  ref={containerRef}
                  onClick={handleCanvasClick}
                  className={`relative w-full h-[680px] overflow-hidden bg-black shadow-2xl transition-all ${
                    isFeedbackMode ? 'cursor-crosshair ring-2 ring-amber-400/40' : ''
                  }`}
                >
                  {previewSource === 'simulation' ? (
                    <SimulatedStagingPreview project={project} viewport={viewport} />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src={stagingUrl}
                      title={`${project.title} Staging Preview`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      className={`w-full h-full border-0 select-none ${isFeedbackMode ? 'pointer-events-none' : ''}`}
                    />
                  )}

                  {/* Pinpoint Pins Overlay */}
                  {renderPinsOverlay()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Pins Drawer / Feedback Stream */}
        <div className="xl:col-span-1 rounded-3xl border border-card-border bg-card-bg/60 p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4 text-electric-blue" />
              <h3 className="text-sm font-bold font-display text-text-title">Feedback Ledger</h3>
            </div>
            <span className="text-xs text-text-muted">({pins.length})</span>
          </div>

          {/* Filter Status Switcher */}
          <div className="flex items-center gap-1.5 text-xs bg-black/40 p-1 rounded-xl">
            {(['all', 'open', 'resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`flex-1 py-1 rounded-lg text-center uppercase tracking-wider text-[10px] font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-card-bg border border-card-border text-foreground font-bold'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Pins List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-xs text-text-muted text-center py-6">Loading pins...</p>
            ) : filteredPins.length === 0 ? (
              <div className="text-center py-8 text-xs text-text-muted space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p>No feedback items in this view</p>
              </div>
            ) : (
              filteredPins.map((pin, index) => {
                const isActive = activePinId === pin.id;
                const isResolved = pin.status === 'resolved';

                return (
                  <div
                    key={pin.id}
                    onClick={() => setActivePinId(isActive ? null : pin.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                      isActive
                        ? 'border-electric-blue/50 bg-electric-blue/10 ring-1 ring-electric-blue/30'
                        : isResolved
                        ? 'border-card-border/40 bg-black/20 opacity-60'
                        : 'border-card-border bg-card-bg/40 hover:border-card-border/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-card-border flex items-center justify-center font-bold text-foreground">
                          {index + 1}
                        </span>
                        <span
                          className={`font-bold uppercase ${
                            pin.severity === 'bug'
                              ? 'text-red-400'
                              : pin.severity === 'tweak'
                              ? 'text-amber-400'
                              : 'text-blue-400'
                          }`}
                        >
                          {pin.severity}
                        </span>
                      </div>
                      <span className="text-text-muted">
                        ({pin.xPercent}%, {pin.yPercent}%)
                      </span>
                    </div>

                    <p className="text-foreground text-[11px] line-clamp-2 leading-relaxed">
                      {pin.comment}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-text-muted">
                      <span>{pin.authorName}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePinStatus(pin.id, pin.status);
                        }}
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded transition-colors ${
                          isResolved
                            ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                            : 'text-amber-400 hover:text-emerald-400 bg-amber-400/10'
                        }`}
                      >
                        {isResolved ? 'Resolved ✓' : 'Mark Done'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* New Pin Annotation Dialog Modal */}
      {pendingCoords && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
          <div className="max-w-md w-full rounded-3xl border border-card-border bg-card-bg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pin className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-display text-text-title">
                  Drop Revision Pin
                </h3>
              </div>
              <button
                onClick={() => setPendingCoords(null)}
                className="text-text-muted hover:text-foreground text-xs uppercase"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmitPin} className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-card-border text-[11px] text-text-muted">
                <span>
                  Coordinates: <strong>({pendingCoords.xPercent}%, {pendingCoords.yPercent}%)</strong>
                </span>
                <span>
                  Viewport: <strong>{VIEWPORT_CONFIG[viewport].label} ({VIEWPORT_CONFIG[viewport].widthPx}px)</strong>
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-muted uppercase tracking-wider text-[10px]">
                  Feedback Category / Severity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['tweak', 'bug', 'copy'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setNewSeverity(sev)}
                      className={`py-2 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                        newSeverity === sev
                          ? sev === 'bug'
                            ? 'border-red-400 bg-red-500/20 text-red-300'
                            : sev === 'tweak'
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                            : 'border-blue-400 bg-blue-500/20 text-blue-300'
                          : 'border-card-border bg-black/30 text-text-muted hover:text-foreground'
                      }`}
                    >
                      {sev === 'tweak' ? 'Design Tweak' : sev === 'bug' ? 'Bug / Glitch' : 'Copy / Text'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-muted uppercase tracking-wider text-[10px]">
                  Annotation Comment
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the issue, requested adjustment, or copy fix with pinpoint accuracy..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-card-border bg-black/40 text-foreground focus:outline-none focus:border-electric-blue resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setPendingCoords(null)}
                  className="px-4 py-2 rounded-xl text-text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-bold uppercase tracking-wider hover:bg-amber-300 transition-all shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Posting...' : 'Place Pin Marker'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Helper to render pins and popovers
  function renderPinsOverlay() {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {pins.map((pin, index) => {
          const isActive = activePinId === pin.id;
          const isResolved = pin.status === 'resolved';
          const sevColor =
            pin.severity === 'bug'
              ? 'bg-red-500 border-red-300 text-white'
              : pin.severity === 'tweak'
              ? 'bg-amber-500 border-amber-300 text-black'
              : 'bg-blue-500 border-blue-300 text-white';

          return (
            <div
              key={pin.id}
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePinId(isActive ? null : pin.id);
                }}
                className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-xl transition-transform hover:scale-125 ${sevColor} ${
                  isResolved ? 'opacity-60 grayscale' : ''
                } ${isActive ? 'scale-125 ring-4 ring-white/60' : ''}`}
                title={`#${index + 1}: ${pin.comment}`}
              >
                {!isResolved && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
                )}
                <span>{index + 1}</span>
              </button>

              {/* Pin Hover/Active Popover Card with OLED Contrast */}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-50 top-9 left-1/2 -translate-x-1/2 w-72 p-4 rounded-2xl border border-white/20 bg-zinc-950/98 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-xs space-y-3 font-mono animate-fade-in text-white"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        pin.severity === 'bug'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : pin.severity === 'tweak'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}
                    >
                      {pin.severity}
                    </span>
                    <span className="text-zinc-400">
                      {new Date(pin.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-zinc-100 font-sans text-xs leading-relaxed font-medium">
                    {pin.comment}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[10px]">
                    <span className="text-zinc-400 truncate max-w-[110px]">
                      {pin.authorName}
                    </span>
                    <button
                      onClick={() => handleTogglePinStatus(pin.id, pin.status)}
                      className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all text-xs ${
                        pin.status === 'resolved'
                          ? 'border border-white/20 bg-white/10 text-zinc-300 hover:text-white'
                          : 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-lg shadow-emerald-500/20'
                      }`}
                    >
                      {pin.status === 'resolved' ? 'Reopen Pin' : 'Mark Resolved ✓'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Pending New Pin Drop Marker */}
        {pendingCoords && (
          <div
            style={{ left: `${pendingCoords.xPercent}%`, top: `${pendingCoords.yPercent}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-xs animate-bounce shadow-xl">
              <Pin className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
