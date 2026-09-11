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
    <section id="order-branch-point" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Choose Your Starting Option</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How Would You Like to Begin?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select the path that matches what you have ready. Both options come with our 1-working-day dispatch guarantee.
          </p>
        </div>

        {/* Dual Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option A Card */}
          <div
            onClick={handleSelectOptionA}
            className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-orange-500 shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <UploadCloud className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Instant Price
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
                Option A
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                &ldquo;I have a 3D file&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                You already have a <strong>.STL</strong>, <strong>.OBJ</strong>, or <strong>.3MF</strong> file. Preview and rotate your 3D model directly in your browser, adjust scale with one click, and see real-time pricing.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>In-browser 3D model inspection (rotate &amp; zoom)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Scale slider (50%, 100%, 150%) with live size update</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard, Tough, or Smooth Resin materials</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-4 px-6 rounded-xl bg-slate-900 group-hover:bg-orange-600 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Upload 3D File (Option A)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Option B Card */}
          <div
            onClick={handleSelectOptionB}
            className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-slate-800 shadow-soft hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <PenTool className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  24h Quote
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Option B
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-slate-900 transition-colors">
                &ldquo;I need a design&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                You don&apos;t have a 3D file &mdash; only an idea, rough hand sketch, photo of a broken part, or caliper measurements. Our CAD engineers create the 3D model for you.
              </p>

              <ul className="space-y-2 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Upload phone photos, sketches, or web links</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Transparent 4-tier price guide (€15 to €150+)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Guaranteed fixed price quote emailed within 1 business day</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="w-full py-4 px-6 rounded-xl bg-white border-2 border-slate-900 text-slate-900 group-hover:bg-slate-900 group-hover:text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Design Quote (Option B)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
