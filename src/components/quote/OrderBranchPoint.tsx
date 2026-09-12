'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { UploadCloud, PenTool, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function OrderBranchPoint() {
  const { setActiveView, setOrderType } = useAppStore();

  const handleSelectOptionA = () => {
    setOrderType('DIRECT_PRINT');
    setActiveView('order-a');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOptionB = () => {
    setOrderType('DESIGN_AND_PRINT');
    setActiveView('order-b');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="order-branch-point" className="py-12 sm:py-16 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setActiveView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors font-label-mono-xs uppercase tracking-wider cursor-pointer"
          >
            &larr; Back to Overview
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Production Routing</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mt-3 font-display">
            How Would You Like to Begin?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select the pipeline that matches your project status. Both tracks dispatch in 1 working day from our Singel 382 hub.
          </p>
        </div>

        {/* Dual Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A Card */}
          <div
            onClick={handleSelectOptionA}
            className="p-8 rounded-xl bg-white border-2 border-outline-variant hover:border-primary shadow-level-1 hover:shadow-level-2 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors border border-primary/20">
                  <UploadCloud className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-label-mono-xs">
                  Instant Quote
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1 font-label-mono">
                Track 01
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors font-headline-sm">
                &ldquo;I have a 3D file&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                You already have an <strong>.STL</strong>, <strong>.OBJ</strong>, or <strong>.3MF</strong> CAD export. Preview and rotate your geometry directly in 3D, scale dimensions with instant telemetry feedback, and get automated live pricing.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-8 font-body-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>In-browser 3D WebGL inspection with telemetry HUD</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive scaling slider with millimeter coordinates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard PLA, Tough PETG-CF, or SLA Smooth Resin</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-3.5 px-6 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-sm shadow-level-1 transition-colors flex items-center justify-center gap-2 group-hover:shadow-level-2 cursor-pointer"
            >
              <span>Upload 3D File (Track 01)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Option B Card */}
          <div
            onClick={handleSelectOptionB}
            className="p-8 rounded-xl bg-white border-2 border-outline-variant hover:border-on-surface shadow-level-1 hover:shadow-level-2 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-on-surface group-hover:text-white transition-colors border border-slate-200">
                  <PenTool className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 font-label-mono-xs">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  24h Engineering Review
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 font-label-mono">
                Track 02
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-on-surface transition-colors font-headline-sm">
                &ldquo;I need CAD design&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                You don&apos;t have a 3D file &mdash; only an idea, rough sketch, broken replacement part, or caliper measurements. Our Amsterdam CAD engineers design the parametric solid model for you.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-8 font-body-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Upload smartphone photos, sketches, or reference links</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Transparent 4-tier benchmark guide (€15 to €150+)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Guaranteed fixed price quote delivered within 1 business day</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-3.5 px-6 rounded bg-white border-2 border-on-surface text-on-surface group-hover:bg-on-surface group-hover:text-white font-bold text-sm shadow-level-1 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request CAD Design (Track 02)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
