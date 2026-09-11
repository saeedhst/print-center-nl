'use client';

import React from 'react';
import { useAppStore, AppView } from '@/lib/store';
import { Box, Sparkles, Truck, Layers, PenTool, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { activeView, setActiveView, setOrderType, orders } = useAppStore();

  const pendingCount = orders.filter(
    (o) => o.status === 'QUOTE_SUBMITTED' || o.status === 'IN_PRODUCTION'
  ).length;

  const handleStartOrder = () => {
    setActiveView('branch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-announcement banner */}
      <div className="bg-slate-50 border-b border-slate-200/80 text-slate-700 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>
              <strong>Local Randstad Hubs:</strong> Dispatched in just <strong>1 working day</strong> across Haarlem, Amsterdam &amp; Utrecht.
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Industrial-Grade Quality
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Instant Transparent Pricing
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 text-left group transition-transform active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-orange-600 transition-colors">
              <Box className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">PrintLab</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-700 border border-orange-200">
                  NL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Haarlem • Amsterdam • Utrecht</p>
            </div>
          </button>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'landing'
                  ? 'text-slate-900 bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => {
                setOrderType('DIRECT_PRINT');
                setActiveView('order-a');
              }}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'order-a'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Have a 3D File (Option A)</span>
            </button>

            <button
              onClick={() => {
                setOrderType('DESIGN_AND_PRINT');
                setActiveView('order-b');
              }}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'order-b'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Need a Design (Option B)</span>
            </button>

            <button
              onClick={() => setActiveView('portfolio')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'portfolio'
                  ? 'text-slate-900 bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Sample Gallery
            </button>

            <button
              onClick={() => setActiveView('reviews')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'reviews'
                  ? 'text-slate-900 bg-slate-100'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'admin'
                  ? 'text-slate-900 bg-slate-100 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Orders Queue</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Primary CTA Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleStartOrder}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:shadow flex items-center gap-2"
            >
              <span>Start Your Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
