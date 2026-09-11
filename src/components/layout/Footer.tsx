'use client';

import React from 'react';
import { Box, MapPin, ShieldCheck, Clock, CheckCircle2, Truck } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const { setActiveView, setOrderType } = useAppStore();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">PrintLab NL</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                Haarlem • Amsterdam • Utrecht
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Localized on-demand 3D printing and CAD design service. Processed and dispatched in just 1 working day with industrial-grade precision and instant transparent pricing.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div><strong>KvK (Chamber of Commerce):</strong> 89234812</div>
              <div><strong>BTW (VAT):</strong> NL89234812B01</div>
              <div><strong>Production Hubs:</strong> Spaarne (Haarlem) &bull; Science Park (Amsterdam) &bull; Science Park (Utrecht)</div>
            </div>
          </div>

          {/* Rapid Delivery Hubs */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>1-Day Delivery Zones</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                <strong>Haarlem:</strong> Direct courier / pickup
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                <strong>Amsterdam:</strong> Same-day &amp; 24h courier
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                <strong>Utrecht:</strong> 24h urban courier &amp; hub
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                Rest of Netherlands: PostNL / DHL
              </li>
            </ul>
          </div>

          {/* Starting Options */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Get Started</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setOrderType('DIRECT_PRINT');
                    setActiveView('order-a');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  &bull; Option A: Upload 3D File (Instant Quote)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOrderType('DESIGN_AND_PRINT');
                    setActiveView('order-b');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  &bull; Option B: Need a Design (24h Quote)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  &bull; Sample Gallery &amp; Benchmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-600 transition-colors text-left"
                >
                  &bull; Customer Satisfaction Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantees & Payments */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Service Guarantees</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              If your print doesn&apos;t match mechanical tolerances or has a print defect, we provide an immediate free reprint.
            </p>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">Supported Payments:</span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-700">iDEAL</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-700">Credit Card</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium text-slate-700">Bancontact</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} PrintLab NL &bull; All rights reserved. Locally printed in North Holland &amp; Utrecht.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Fast Turnaround</span>
            <span>&bull;</span>
            <span>Fair Transparent Pricing</span>
            <span>&bull;</span>
            <span>Industrial Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
