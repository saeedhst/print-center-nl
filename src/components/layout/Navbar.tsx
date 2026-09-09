'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Box, Sparkles, ShieldCheck, ShoppingCart, UserCheck, Layers, Bike } from 'lucide-react';

export default function Navbar() {
  const { activeTab, setActiveTab, setOrderType, orders, setIsCheckoutModalOpen } = useAppStore();

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'QUOTE_SUBMITTED' || o.status === 'IN_PRODUCTION'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      {/* Top micro-banner for Dutch Randstad Delivery */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-xs py-1 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>
              <strong>Randstad Express:</strong> Same-day &amp; next-day courier active for Amsterdam, Utrecht &amp; Den Haag.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-orange-100">
            <span className="flex items-center gap-1">
              <Bike className="w-3.5 h-3.5" /> Zero-emission bike courier
            </span>
            <span>•</span>
            <span className="font-semibold text-white">15% Student Discount</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Localization */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('quote')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Box className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-white tracking-tight">PrintLab</span>
                  <span className="text-xs font-black px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    NL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">3D Print Center Randstad</p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('quote');
                setOrderType('DIRECT_PRINT');
              }}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'quote'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Instant Quote
            </button>

            <button
              onClick={() => {
                setActiveTab('quote');
                setOrderType('DESIGN_AND_PRINT');
              }}
              className="px-3.5 py-1.5 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              CAD Design Intake
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Portfolio &amp; Benchmarks
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'materials'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Materials &amp; Specs
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-800 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>Admin Queue</span>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-orange-500/30 text-orange-300">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveTab('quote');
                setOrderType('DIRECT_PRINT');
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Quote 3D File</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
