'use client';

import React, { useState } from 'react';
import type { Project, Milestone } from '@/lib/types/portal';
import {
  X,
  CreditCard,
  QrCode,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Radio,
  RefreshCw,
  Building,
  Zap,
  Sparkles,
  Lock,
} from 'lucide-react';

interface MultiRailCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  milestone: Milestone;
  onPaymentSuccess?: (updatedProject: Project) => void;
}

type PaymentRail = 'crypto' | 'paystack' | 'wire';
type CryptoNetwork = 'TRC20' | 'ERC20' | 'Polygon' | 'BSC' | 'BTC' | 'ETH' | 'SOL';

export function MultiRailCheckoutModal({
  isOpen,
  onClose,
  project,
  milestone,
  onPaymentSuccess,
}: MultiRailCheckoutModalProps) {
  const [selectedRail, setSelectedRail] = useState<PaymentRail>('crypto');
  const [selectedNetwork, setSelectedNetwork] = useState<CryptoNetwork>('TRC20');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settledSuccess, setSettledSuccess] = useState(false);
  const [tickerState, setTickerState] = useState<'idle' | 'detected' | 'confirming' | 'confirmed'>('idle');

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const simulateSettlement = async (gateway: 'nowpayments' | 'paystack' | 'manual', currency: 'USDT' | 'NGN' | 'USD') => {
    setIsProcessing(true);
    setTickerState('detected');

    // Simulate blockchain confirmation delays for authentic feel
    setTimeout(() => setTickerState('confirming'), 1000);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/payments/simulate-settlement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: project.id,
            milestoneId: milestone.id,
            gateway,
            currency,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setTickerState('confirmed');
          setSettledSuccess(true);
          if (onPaymentSuccess && data.project) {
            onPaymentSuccess(data.project);
          }
        }
      } catch (err) {
        console.error('Settlement error:', err);
      } finally {
        setIsProcessing(false);
      }
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="glassmorphism-card rounded-2xl border border-card-border max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in font-mono text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-card-bg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-card-border pb-4">
          <div className="flex items-center gap-2 text-[10px] text-electric-blue uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            MILESTONE GATEKEEPER CHECKOUT // PHASE 0{milestone.phaseNumber}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-title">
            Unlock {milestone.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
            <span>
              Required Settlement:{' '}
              <strong className="text-foreground text-sm font-bold">
                ${milestone.costUsd?.toLocaleString()}
              </strong>{' '}
              <span className="text-electric-blue">(₦{milestone.costNgn?.toLocaleString()})</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated Instant Phase Unlock
            </span>
          </div>
        </div>

        {/* Settled Success State */}
        {settledSuccess ? (
          <div className="py-8 text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-display text-foreground">
                Payment Confirmed &amp; Milestone Unlocked!
              </h3>
              <p className="text-text-muted max-w-md mx-auto text-xs">
                Transaction has been cryptographically confirmed on-chain. Phase Gatekeeper is lifted, Invoice Document #12 has been executed, and sprint execution is active.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-electric-blue text-background font-bold text-xs hover:bg-electric-blue/90 shadow-lg shadow-electric-blue/20 transition-all"
            >
              Enter Unlocked Phase Deliverables
            </button>
          </div>
        ) : (
          <>
            {/* Payment Rail Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl border border-card-border bg-card-bg/60">
              <button
                onClick={() => setSelectedRail('crypto')}
                className={`py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
                  selectedRail === 'crypto'
                    ? 'bg-electric-blue text-background shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Crypto USDT</span>
              </button>

              <button
                onClick={() => setSelectedRail('paystack')}
                className={`py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
                  selectedRail === 'paystack'
                    ? 'bg-electric-blue text-background shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Naira (₦ Fiat)</span>
              </button>

              <button
                onClick={() => setSelectedRail('wire')}
                className={`py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
                  selectedRail === 'wire'
                    ? 'bg-electric-blue text-background shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Bank Wire ($)</span>
              </button>
            </div>

            {/* ================= RAIL A: CRYPTO USDT ================= */}
            {selectedRail === 'crypto' && (
              <div className="space-y-5 animate-fade-in">
                {/* Network Chips */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-muted uppercase tracking-wider">
                    Select Blockchain Network
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['TRC20', 'ERC20', 'Polygon', 'BSC', 'SOL', 'BTC'] as CryptoNetwork[]).map(
                      (net) => (
                        <button
                          key={net}
                          onClick={() => setSelectedNetwork(net)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] transition-all ${
                            selectedNetwork === net
                              ? 'border-electric-blue bg-electric-blue/15 text-electric-blue shadow-sm'
                              : 'border-card-border bg-card-bg text-text-muted hover:text-foreground'
                          }`}
                        >
                          {net === 'TRC20' ? 'Tron (TRC20)' : net === 'ERC20' ? 'Ethereum' : net}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Deposit Address Box */}
                <div className="p-4 rounded-xl border border-card-border bg-card-bg/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-muted">Exact Crypto Amount:</span>
                    <strong className="text-foreground text-sm font-bold font-mono">
                      {milestone.costUsd?.toFixed(2)} USDT ({selectedNetwork})
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-text-muted uppercase">
                      Dedicated Deposit Wallet Address:
                    </span>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-background border border-card-border font-mono text-[11px] text-foreground">
                      <span className="truncate flex-1">
                        TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p
                      </span>
                      <button
                        onClick={() =>
                          handleCopy('TY5Wj8t2uKpqL1o9dM3N9s4vZ8aX7c6B2p', 'wallet')
                        }
                        className="p-1 text-electric-blue hover:text-white"
                        title="Copy address"
                      >
                        {copiedField === 'wallet' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Poller Status Strip */}
                <div className="p-3.5 rounded-xl border border-electric-blue/30 bg-electric-blue/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-electric-blue animate-ping" />
                    <span className="text-foreground">
                      {tickerState === 'idle' && 'Awaiting on-chain transaction broadcast...'}
                      {tickerState === 'detected' && 'Mempool signal detected! Awaiting confirmations...'}
                      {tickerState === 'confirming' && 'Block confirmations (12/19) validating...'}
                      {tickerState === 'confirmed' && 'Confirmed on-chain!'}
                    </span>
                  </div>

                  <button
                    onClick={() => simulateSettlement('nowpayments', 'USDT')}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-lg bg-electric-blue text-background font-bold text-[10px] hover:bg-electric-blue/90 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-3 h-3" />
                        <span>Simulate On-Chain Deposit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ================= RAIL B: PAYSTACK NAIRA ================= */}
            {selectedRail === 'paystack' && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 rounded-xl border border-card-border bg-card-bg/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-muted">Total Amount (NGN):</span>
                    <strong className="text-foreground text-sm font-bold font-mono">
                      ₦{milestone.costNgn?.toLocaleString()}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-lg bg-background border border-card-border space-y-2">
                    <div className="text-[10px] text-electric-blue uppercase font-bold">
                      Dedicated Virtual Account (Instant Match):
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-text-muted text-[10px]">Bank:</span>
                        <div className="font-bold text-foreground">Wema Bank / Paystack Titan</div>
                      </div>
                      <div>
                        <span className="text-text-muted text-[10px]">Account Number:</span>
                        <div className="font-bold text-foreground font-mono flex items-center gap-1">
                          <span>9918234812</span>
                          <button
                            onClick={() => handleCopy('9918234812', 'wema_acc')}
                            className="text-electric-blue"
                          >
                            {copiedField === 'wema_acc' ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-card-border bg-card-bg/50 flex items-center justify-between">
                  <div className="text-[11px] text-text-muted">
                    Instant Bank Transfer or Debit Card Settlement
                  </div>

                  <button
                    onClick={() => simulateSettlement('paystack', 'NGN')}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-electric-blue text-background font-bold text-xs hover:bg-electric-blue/90 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Simulate Transfer Settlement</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ================= RAIL C: BANK WIRE ================= */}
            {selectedRail === 'wire' && (
              <div className="space-y-4 animate-fade-in text-[11px]">
                <div className="p-4 rounded-xl border border-card-border bg-card-bg/60 space-y-2">
                  <div className="text-[10px] text-text-muted uppercase">Beneficiary Name</div>
                  <div className="font-bold text-foreground">WebMuse Agency Operating Corp.</div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-card-border">
                    <div>
                      <span className="text-text-muted text-[10px]">SWIFT / BIC:</span>
                      <div className="font-mono text-foreground">CHASUS33XXX</div>
                    </div>
                    <div>
                      <span className="text-text-muted text-[10px]">Routing Number:</span>
                      <div className="font-mono text-foreground">021000021</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-card-border">
                    <span className="text-text-muted text-[10px]">Payment Reference Code:</span>
                    <div className="font-mono text-electric-blue font-bold">
                      WM-{project.slug.toUpperCase()}-MS0{milestone.phaseNumber}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-text-muted">
                    Offline wires can be manually unlocked by the agency team.
                  </span>
                  <button
                    onClick={() => simulateSettlement('manual', 'USD')}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl border border-card-border bg-card-bg text-foreground hover:border-electric-blue font-bold text-xs"
                  >
                    Simulate Wire Unlock
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
