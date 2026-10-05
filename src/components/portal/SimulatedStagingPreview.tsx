'use client';

import React, { useState, useEffect } from 'react';
import type { Project } from '@/lib/types/portal';
import {
  TrendingUp,
  ArrowDownUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Activity,
  Layers,
  ChevronRight,
  Maximize2,
  Sliders,
  DollarSign,
} from 'lucide-react';

interface SimulatedStagingPreviewProps {
  project: Project;
  viewport: 'desktop' | 'tablet' | 'mobile';
}

export function SimulatedStagingPreview({ project, viewport }: SimulatedStagingPreviewProps) {
  const [mobileTab, setMobileTab] = useState<'trade' | 'orderbook' | 'chart'>('trade');
  const [payAmount, setPayAmount] = useState('1000');
  const [slippage, setSlippage] = useState('0.1%');
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<'15M' | '1H' | '1D'>('15M');

  // Simulated live ticker fluctuation
  const [price, setPrice] = useState(142.8);
  useEffect(() => {
    const timer = setInterval(() => {
      setPrice((prev) => {
        const delta = (Math.random() - 0.48) * 0.4;
        return Math.round((prev + delta) * 100) / 100;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const receiveAmount = (parseFloat(payAmount || '0') / price).toFixed(4);

  const handleExecuteSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => setSwapSuccess(false), 3000);
    }, 1200);
  };

  // Mock Asks & Bids for Orderbook
  const asks = [
    { price: (price + 0.6).toFixed(2), size: '14.28', depth: 85 },
    { price: (price + 0.4).toFixed(2), size: '8.45', depth: 65 },
    { price: (price + 0.2).toFixed(2), size: '22.10', depth: 95 },
    { price: (price + 0.1).toFixed(2), size: '5.12', depth: 40 },
  ];

  const bids = [
    { price: (price - 0.1).toFixed(2), size: '18.40', depth: 90 },
    { price: (price - 0.2).toFixed(2), size: '9.80', depth: 55 },
    { price: (price - 0.4).toFixed(2), size: '12.65', depth: 75 },
    { price: (price - 0.6).toFixed(2), size: '31.20', depth: 100 },
  ];

  return (
    <div className="w-full h-full bg-[#07090e] text-white flex flex-col font-mono select-none overflow-y-auto">
      {/* Top Protocol Header */}
      <div className="border-b border-white/10 bg-black/60 px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
            ▲
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-white">
              {project.title.toUpperCase()}
            </div>
            <div className="text-[9px] text-cyan-400 font-mono">
              STAGING v1.4.2-RC3 • ARBITRUM ONE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>APX/USDC ${price.toFixed(2)}</span>
            <span className="text-[9px] text-emerald-300">(+8.4%)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-300">
            <Wallet className="w-3 h-3 text-cyan-400" />
            <span>0x71C...4f98</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      {viewport === 'mobile' && (
        <div className="flex border-b border-white/10 bg-black/40 p-1 text-[11px] shrink-0">
          {(['trade', 'orderbook', 'chart'] as const).map((tab) => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                setMobileTab(tab);
              }}
              className={`flex-1 py-1.5 rounded-lg text-center uppercase tracking-wider font-bold transition-all ${
                mobileTab === tab
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Main App Workspace */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
        {viewport === 'desktop' && (
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Left 6 Columns: Interactive Price Chart */}
            <div className="col-span-6 rounded-2xl bg-black/40 border border-white/10 p-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">APX / USDC Candlestick Chart</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    ${price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  {(['15M', '1H', '1D'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTimeframe(tf);
                      }}
                      className={`px-2 py-0.5 rounded ${
                        activeTimeframe === tf ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart SVG Simulation */}
              <div className="flex-1 min-h-[220px] flex flex-col justify-end relative">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 160">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Neon Area Fill */}
                  <path
                    d="M 0 130 Q 80 110, 160 85 T 320 50 L 400 35 L 400 160 L 0 160 Z"
                    fill="url(#chartGrad)"
                  />
                  {/* Trend Line */}
                  <path
                    d="M 0 130 Q 80 110, 160 85 T 320 50 L 400 35"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />
                  {/* Candlesticks */}
                  <line x1="40" y1="110" x2="40" y2="140" stroke="#10b981" strokeWidth="1" />
                  <rect x="36" y="115" width="8" height="20" fill="#10b981" rx="1" />

                  <line x1="120" y1="90" x2="120" y2="125" stroke="#ef4444" strokeWidth="1" />
                  <rect x="116" y="95" width="8" height="25" fill="#ef4444" rx="1" />

                  <line x1="200" y1="65" x2="200" y2="105" stroke="#10b981" strokeWidth="1" />
                  <rect x="196" y="70" width="8" height="30" fill="#10b981" rx="1" />

                  <line x1="280" y1="45" x2="280" y2="85" stroke="#10b981" strokeWidth="1" />
                  <rect x="276" y="50" width="8" height="25" fill="#10b981" rx="1" />

                  <line x1="360" y1="25" x2="360" y2="65" stroke="#10b981" strokeWidth="1" />
                  <rect x="356" y="30" width="8" height="30" fill="#10b981" rx="1" />
                </svg>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-white/5">
                  <span>MA(20): $138.40</span>
                  <span>MA(50): $132.10</span>
                  <span>RSI: 62.4 (Neutral Bullish)</span>
                </div>
              </div>
            </div>

            {/* Middle 3 Columns: Real-Time Depth of Market Orderbook */}
            <div className="col-span-3 rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
                <span className="font-bold text-white">Orderbook</span>
                <span className="text-[10px] text-cyan-400">0.01 Depth</span>
              </div>

              {/* Asks (Red) */}
              <div className="space-y-1 text-[11px]">
                {asks.map((a, i) => (
                  <div key={i} className="flex items-center justify-between relative px-1 py-0.5 font-mono">
                    <div
                      className="absolute inset-y-0 right-0 bg-red-500/15 rounded pointer-events-none"
                      style={{ width: `${a.depth}%` }}
                    />
                    <span className="text-red-400 font-bold z-10">${a.price}</span>
                    <span className="text-zinc-300 z-10">{a.size}</span>
                  </div>
                ))}
              </div>

              {/* Current Spread */}
              <div className="py-1 px-2 rounded bg-white/5 border border-white/10 text-center font-bold text-xs text-white">
                ${price.toFixed(2)} <span className="text-[10px] text-zinc-400 font-normal">Spread: $0.02</span>
              </div>

              {/* Bids (Green) */}
              <div className="space-y-1 text-[11px]">
                {bids.map((b, i) => (
                  <div key={i} className="flex items-center justify-between relative px-1 py-0.5 font-mono">
                    <div
                      className="absolute inset-y-0 right-0 bg-emerald-500/15 rounded pointer-events-none"
                      style={{ width: `${b.depth}%` }}
                    />
                    <span className="text-emerald-400 font-bold z-10">${b.price}</span>
                    <span className="text-zinc-300 z-10">{b.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 3 Columns: Instant Swap Terminal */}
            <div className="col-span-3 rounded-2xl bg-black/40 border border-white/10 p-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
                <span className="font-bold text-white">Instant Swap</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Zero MEV
                </span>
              </div>

              <div className="space-y-3">
                {/* Pay Input */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>YOU PAY</span>
                    <span>Bal: 12,450 USDC</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="bg-transparent text-lg font-bold text-white focus:outline-none w-24"
                    />
                    <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold text-cyan-300">
                      USDC
                    </span>
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <div className="p-1 rounded-full bg-white/10 border border-white/20 text-zinc-400">
                    <ArrowDownUp className="w-3 h-3" />
                  </div>
                </div>

                {/* Receive Output */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>YOU RECEIVE (EST.)</span>
                    <span>Bal: 45.2 APX</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-lg font-bold text-white">{receiveAmount}</div>
                    <span className="px-2 py-1 rounded bg-cyan-500/20 text-xs font-bold text-cyan-300">
                      APX
                    </span>
                  </div>
                </div>

                {/* Slippage & Gas */}
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                  <span>Slippage: {slippage}</span>
                  <span>Network Gas: &lt;$0.04</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {swapSuccess && (
                  <div className="mb-2 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] text-center font-bold animate-fade-in">
                    ✓ Swap Confirmed on Arbitrum!
                  </div>
                )}
                <button
                  onClick={handleExecuteSwap}
                  disabled={isSwapping}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSwapping ? 'Routing Quantum Swap...' : 'Execute Instant Swap'}
                </button>
              </div>
            </div>
          </div>
        )}

        {viewport === 'tablet' && (
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Left: Chart & Swap */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <span className="font-bold text-white">APX / USDC Candlestick</span>
                  <span className="text-emerald-400 font-bold">${price.toFixed(2)}</span>
                </div>
                <svg className="w-full h-36" viewBox="0 0 400 140">
                  <path
                    d="M 0 110 Q 80 90, 160 70 T 320 40 L 400 25 L 400 140 L 0 140 Z"
                    fill="#06b6d4"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M 0 110 Q 80 90, 160 70 T 320 40 L 400 25"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Swap */}
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Swap USDC → APX</span>
                  <span className="text-[10px] text-zinc-400">Rate: 1 APX = ${price.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleExecuteSwap}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase"
                >
                  {isSwapping ? 'Swapping...' : `Swap $${payAmount} → ${receiveAmount} APX`}
                </button>
              </div>
            </div>

            {/* Right: Orderbook */}
            <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
                <span className="font-bold text-white">Depth of Market</span>
                <span className="text-[10px] text-cyan-400">Live Feed</span>
              </div>
              <div className="space-y-1 text-xs">
                {asks.map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-1 py-1 font-mono">
                    <span className="text-red-400 font-bold">${a.price}</span>
                    <span className="text-zinc-300">{a.size} APX</span>
                  </div>
                ))}
                <div className="py-1 px-2 rounded bg-white/5 border border-white/10 text-center font-bold text-xs text-white my-2">
                  ${price.toFixed(2)}
                </div>
                {bids.map((b, i) => (
                  <div key={i} className="flex items-center justify-between px-1 py-1 font-mono">
                    <span className="text-emerald-400 font-bold">${b.price}</span>
                    <span className="text-zinc-300">{b.size} APX</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewport === 'mobile' && (
          <div className="space-y-4">
            {mobileTab === 'trade' && (
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Swap Assets</span>
                  <span className="text-[10px] text-emerald-400">Arbitrum Edge</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-[10px] text-zinc-400">PAY (USDC)</span>
                  <input
                    type="text"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="bg-transparent text-lg font-bold text-white focus:outline-none w-full"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-[10px] text-zinc-400">RECEIVE (EST. APX)</span>
                  <div className="text-lg font-bold text-cyan-300">{receiveAmount} APX</div>
                </div>

                {swapSuccess && (
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] text-center font-bold">
                    ✓ Swap Executed Successfully!
                  </div>
                )}

                <button
                  onClick={handleExecuteSwap}
                  className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs uppercase"
                >
                  {isSwapping ? 'Confirming...' : 'Swap Now'}
                </button>
              </div>
            )}

            {mobileTab === 'orderbook' && (
              <div className="rounded-2xl bg-black/40 border border-white/10 p-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-white/10 pb-2">
                  <span>Orderbook Depth</span>
                  <span>Spread: $0.02</span>
                </div>
                {asks.slice(0, 3).map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-1 py-1">
                    <span className="text-red-400 font-bold">${a.price}</span>
                    <span className="text-zinc-300">{a.size}</span>
                  </div>
                ))}
                <div className="py-1 rounded bg-white/5 text-center font-bold text-white my-1">
                  ${price.toFixed(2)}
                </div>
                {bids.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center justify-between px-1 py-1">
                    <span className="text-emerald-400 font-bold">${b.price}</span>
                    <span className="text-zinc-300">{b.size}</span>
                  </div>
                ))}
              </div>
            )}

            {mobileTab === 'chart' && (
              <div className="rounded-2xl bg-black/40 border border-white/10 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-white/10 pb-2">
                  <span>Candlestick (15M)</span>
                  <span className="text-emerald-400">${price.toFixed(2)}</span>
                </div>
                <svg className="w-full h-32" viewBox="0 0 300 120">
                  <path
                    d="M 0 100 Q 60 80, 120 60 T 240 30 L 300 20 L 300 120 L 0 120 Z"
                    fill="#06b6d4"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M 0 100 Q 60 80, 120 60 T 240 30 L 300 20"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {viewport === 'mobile' && (
        <div className="border-t border-white/10 bg-black/80 px-4 py-2 flex items-center justify-around text-[10px] text-zinc-400 shrink-0">
          <div className="text-cyan-400 flex flex-col items-center">
            <span>●</span>
            <span>Trade</span>
          </div>
          <div className="flex flex-col items-center">
            <span>📊</span>
            <span>Markets</span>
          </div>
          <div className="flex flex-col items-center">
            <span>🔒</span>
            <span>Vault</span>
          </div>
        </div>
      )}
    </div>
  );
}
