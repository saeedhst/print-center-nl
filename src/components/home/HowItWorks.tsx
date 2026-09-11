'use client';

import React from 'react';
import { UploadCloud, Calculator, Truck, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function HowItWorks() {
  const { setActiveView } = useAppStore();

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            From Idea to Finished Part in 1 Working Day
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No complicated email chains or slow quoting cycles. We keep the entire workflow quick and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-extrabold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-orange-600" />
                Choose Your Option
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have a 3D model? Upload your <strong>.STL / .OBJ</strong> directly. Don&apos;t have a file? Send a sketch, photo, or broken part dimensions for our design team.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Ready files or custom CAD ideas
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-extrabold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-600" />
                See Instant Price or 24h Quote
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant browser calculation for 3D files (with live size scaling slider), or receive a guaranteed locked price quote within 1 business day for custom designs.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Transparent pricing with no surprises
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-extrabold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-600" />
                Dispatched in 1 Working Day
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your part is sliced, manufactured, cleaned, and dispatched via fast Randstad courier (Haarlem, Amsterdam, Utrecht) or PostNL straight to your door.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Fast courier or free local pickup
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setActiveView('branch');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-orange-600 transition-colors"
          >
            <span>Choose Your Starting Option to Begin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
