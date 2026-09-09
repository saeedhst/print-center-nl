'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  Layers,
  Clock,
  GraduationCap,
  UploadCloud,
  PenTool,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Bike,
} from 'lucide-react';

export default function Hero() {
  const { setActiveTab, setOrderType } = useAppStore();

  const handleStartPrintQuote = () => {
    setActiveTab('quote');
    setOrderType('DIRECT_PRINT');
    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartCadQuote = () => {
    setActiveTab('quote');
    setOrderType('DESIGN_AND_PRINT');
    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pb-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute -top-10 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Randstad Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-wide shadow-sm shadow-orange-500/10">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>Localized in Amsterdam • Utrecht • Den Haag</span>
            <span className="text-slate-500">|</span>
            <span className="text-orange-300 font-medium">Bambu Lab &amp; Formlabs Fleets</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            High-Speed 3D Printing &amp; CAD Design in the{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Netherlands
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload your <strong>STL / OBJ / 3MF</strong> for instant client-side geometry analysis and live pricing. Need a 3D model designed? Upload your sketch for fixed-price engineering within <strong>1 business day</strong>.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleStartPrintQuote}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-base shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group"
            >
              <UploadCloud className="w-5 h-5 text-white" />
              <span>Instant 3D Print Quote</span>
              <ChevronRight className="w-4 h-4 text-orange-200 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleStartCadQuote}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 shadow-lg shadow-black/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <PenTool className="w-5 h-5 text-amber-400" />
              <span>Get a Design Quote</span>
            </button>
          </div>

          {/* Trust Highlights Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
                <Bike className="w-4 h-4" />
                <span>Randstad Speed</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Same-day courier in AMS, Utrecht &amp; Den Haag.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>15% Student Perk</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Special rates for TU Delft, UvA, UU &amp; HBOs.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Layers className="w-4 h-4" />
                <span>Multi-Material</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">PLA, Tough PETG, Heat ABS, Flexible TPU &amp; SLA Resin.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>24h CAD SLA</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Fixed quote &amp; engineer feasibility in 1 business day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
