'use client';

import React, { useState, useEffect } from 'react';
import type { Project, AddonServiceItem } from '@/lib/types/portal';
import {
  Sparkles,
  Zap,
  Search,
  ShieldCheck,
  Smartphone,
  Bot,
  Check,
  RefreshCw,
  ArrowRight,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface AddonMarketplaceProps {
  project: Project;
  onAddonPurchased?: () => void;
}

export function AddonMarketplace({ project, onAddonPurchased }: AddonMarketplaceProps) {
  const [catalog, setCatalog] = useState<AddonServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [selectedAddon, setSelectedAddon] = useState<AddonServiceItem | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentRail, setPaymentRail] = useState<'nowpayments' | 'paystack' | 'moniepoint'>('nowpayments');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successTxRef, setSuccessTxRef] = useState<string>('');

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portal/addons');
      const data = await res.json();
      if (data.ok) {
        setCatalog(data.data);
      }
    } catch (err) {
      console.error('Failed to load add-on catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCheckout = (addon: AddonServiceItem) => {
    setSelectedAddon(addon);
    setPaymentSuccess(false);
    setCheckoutModalOpen(true);
  };

  const handleExecutePayment = async () => {
    if (!selectedAddon) return;

    try {
      setProcessingPayment(true);
      const mockTxRef =
        paymentRail === 'nowpayments'
          ? `tx_usdt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
          : `pstk_ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      const res = await fetch('/api/portal/addons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          addonId: selectedAddon.id,
          paymentMethod: paymentRail,
          txRef: mockTxRef,
          payerEmail: 'client@apexlabs.io',
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setSuccessTxRef(mockTxRef);
        setPaymentSuccess(true);
        if (onAddonPurchased) onAddonPurchased();
      }
    } catch (err) {
      console.error('Error executing add-on payment:', err);
    } finally {
      setProcessingPayment(false);
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/10 rounded-2xl">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-mono text-zinc-400">Loading Add-on Marketplace Catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Currency Switcher */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white font-mono tracking-tight">
              CHANGE-ORDER & ADD-ON MARKETPLACE
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Micro-Sprints
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Upgrade your live platform with on-demand engineering micro-sprints. Purchasing an add-on automatically initializes a tracked micro-milestone in your sprint pipeline.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currency === 'USD'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency('NGN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currency === 'NGN'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            NGN (₦)
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {catalog.map((addon) => {
          const priceDisplay =
            currency === 'USD'
              ? `$${addon.costUsd.toLocaleString()}`
              : `₦${addon.costNgn.toLocaleString()}`;

          return (
            <div
              key={addon.id}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group backdrop-blur-md relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    {renderIcon(addon.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white font-mono">{priceDisplay}</span>
                    <span className="block text-[10px] text-zinc-500 font-mono">
                      ~{addon.estimatedTurnaroundDays} Days Turnaround
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                    {addon.title}
                  </h3>
                  <p className="text-xs text-cyan-400/80 font-mono mt-0.5">{addon.tagline}</p>
                  <p className="text-xs text-zinc-400 font-sans mt-2 line-clamp-3">{addon.description}</p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Included Deliverables:</span>
                  {addon.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5">
                <button
                  onClick={() => openCheckout(addon)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-500 text-xs font-mono font-bold text-zinc-200 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                >
                  Acquire Micro-Sprint <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && selectedAddon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">Micro-Milestone Settlement</span>
                <h3 className="text-base font-bold text-white font-mono">{selectedAddon.title}</h3>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white font-mono">Micro-Sprint Activated!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Payment confirmed. A new Phase micro-milestone has been spun up in your project pipeline with instant deliverable tracking.
                </p>
                <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-cyan-300">
                  Ref: {successTxRef}
                </div>
                <button
                  onClick={() => setCheckoutModalOpen(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-colors"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Price Summary */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Total Settlement Amount</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {currency === 'USD'
                      ? `$${selectedAddon.costUsd.toLocaleString()} USD`
                      : `₦${selectedAddon.costNgn.toLocaleString()} NGN`}
                  </span>
                </div>

                {/* Multi-Rail Switcher */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-2">
                    Select Settlement Rail
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentRail('nowpayments')}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        paymentRail === 'nowpayments'
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                        <QrCode className="w-4 h-4 text-cyan-400" /> Crypto USDT
                      </div>
                      <span className="text-[10px] text-zinc-500">Polygon / TRC20 / ERC20</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentRail('paystack')}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        paymentRail === 'paystack'
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                        <CreditCard className="w-4 h-4 text-emerald-400" /> NGN Fiat Rail
                      </div>
                      <span className="text-[10px] text-zinc-500">Card / Virtual Account</span>
                    </button>
                  </div>
                </div>

                {/* Settlement Instructions */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400 space-y-1">
                  <p className="text-zinc-300 font-semibold">Instant Escrow Gatekeeper:</p>
                  <p>• Automated smart contract / payment webhook listener</p>
                  <p>• Micro-sprint appears in your live Milestone Stepper immediately</p>
                  <p>• Direct Slack & In-Portal chat notification dispatched to lead engineers</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExecutePayment}
                    disabled={processingPayment}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    {processingPayment ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    Confirm & Settle Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
