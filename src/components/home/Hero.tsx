'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { ArrowRight, Clock, ShieldCheck, Tag, Sparkles, CheckCircle2, Box } from 'lucide-react';

export default function Hero() {
  const { setActiveView } = useAppStore();

  const handleStartOrder = () => {
    setActiveView('branch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-white">
      {/* Subtle clean background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-white to-white pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Local Hub Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-orange-600"></span>
          <span>Haarlem &bull; Amsterdam &bull; Utrecht</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-normal">Next-day local courier</span>
        </div>

        {/* Required Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Fast, on-demand 3D printing delivered across{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700">
            Haarlem, Amsterdam &amp; Utrecht.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Upload your 3D file for an instant automated price quote, or send a photo or sketch for custom engineering. Manufactured on industrial multi-material printers and delivered to your doorstep.
        </p>

        {/* Primary Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleStartOrder}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 group"
          >
            <span>Start Your 3D Print Order</span>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Core Highlights (Required) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Dispatched in 1 Working Day
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Processed immediately in our Randstad production fleet for rapid same-day or next-day turnaround.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Industrial-Grade Quality
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calibrated Bambu Lab AMS and SLA stereolithography printers with tight mechanical tolerances (&plusmn;0.05mm).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Instant Transparent Pricing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Live volume calculation in your browser with zero hidden fees. Know exactly what you pay before checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
