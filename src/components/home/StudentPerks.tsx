'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { GraduationCap, Zap, CheckCircle, Percent, School, ArrowRight } from 'lucide-react';

export default function StudentPerks() {
  const { setIsStudent, setActiveTab, setOrderType } = useAppStore();

  const handleClaimStudentDiscount = () => {
    setIsStudent(true, 'TU Delft');
    setActiveTab('quote');
    setOrderType('DIRECT_PRINT');
    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const institutions = [
    'TU Delft',
    'TU Eindhoven (TU/e)',
    'Universiteit van Amsterdam (UvA)',
    'Vrije Universiteit Amsterdam (VU)',
    'Utrecht University (UU)',
    'Erasmus Universiteit Rotterdam',
    'Hogeschool van Amsterdam (HvA)',
    'HU Utrecht',
    'Haagse Hogeschool (THUAS)',
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900/40 via-slate-900/90 to-slate-950 border-y border-slate-800/80 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <GraduationCap className="w-4 h-4" />
                <span>Dutch Higher Education Discount</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                15% Off All Prints &amp; Priority Slicing for Students
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Racing against a graduation deadline, bachelor thesis, or robotics team competition? We prioritize student orders and slash 15% off manufacturing fees automatically.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">Fast-track queue for urgent submission dates</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">Direct pickup at Utrecht Science Park &amp; AMS</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">Tough PETG &amp; ABS for high-stress testing</span>
                </div>
              </div>

              {/* Supported Universities Tags */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-emerald-400" />
                  Verified for all NL Universities &amp; Hogescholen:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {institutions.map((inst) => (
                    <span
                      key={inst}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card / CTA */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-2xl border border-emerald-500/40">
                -15%
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Student Perk Active</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Applies immediately in the dynamic quote calculator with your student email.
                </p>
              </div>

              <button
                onClick={handleClaimStudentDiscount}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Apply Student Discount Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
