'use client';

import React, { useState } from 'react';
import { UploadCloud, Cpu, PackageCheck, PenTool, SearchCheck, Printer, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function HowItWorks() {
  const { setOrderType, setActiveTab } = useAppStore();
  const [selectedFlow, setSelectedFlow] = useState<'PRINT' | 'DESIGN'>('PRINT');

  const handleSelectFlow = (flow: 'PRINT' | 'DESIGN') => {
    setSelectedFlow(flow);
    setOrderType(flow === 'PRINT' ? 'DIRECT_PRINT' : 'DESIGN_AND_PRINT');
    setActiveTab('quote');
    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How PrintLab NL Works
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Whether you already have a 3D printable file or just a physical broken part with hand measurements, we streamline manufacturing from Amsterdam to Den Haag.
          </p>

          {/* Toggle Flow Buttons */}
          <div className="inline-flex p-1 mt-6 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedFlow('PRINT')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedFlow === 'PRINT'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Path A: I Have a 3D File (.STL / .OBJ / .3MF)
            </button>
            <button
              onClick={() => setSelectedFlow('DESIGN')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedFlow === 'DESIGN'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Path B: I Need CAD Design Service
            </button>
          </div>
        </div>

        {/* Steps for Path A */}
        {selectedFlow === 'PRINT' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-orange-400" />
                Upload &amp; Client-Side Parse
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drag-and-drop your STL, OBJ, or 3MF file. Three.js immediately inspects geometry, calculates true volume in cm³, and extracts millimetric $X \times Y \times Z$ bounding dimensions in your browser.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                Configure Material &amp; Colors
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Choose PLA, Tough PETG, ABS, TPU, or SLA Resin. Select multi-color Bambu AMS options (1–4 colors) and infill density (15% to 100% solid). Watch your quote calculate dynamically down to the cent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-400" />
                Rapid Randstad Delivery
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Instant checkout with iDEAL or Credit Card. Your part enters our production queue within 30 minutes, dispatched via Randstad cargo bike courier or PostNL tracked parcel.
              </p>
            </div>
          </div>
        ) : (
          /* Steps for Path B */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-amber-400" />
                Submit Idea, Photo or Sketch
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Provide reference photos of your broken component, hand-drawn sketches with calipers measurements, or functional requirements (tolerances, fitment, load).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <SearchCheck className="w-5 h-5 text-blue-400" />
                Engineering Review &amp; Locked SLA
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our CAD design engineers in Amsterdam/Utrecht evaluate printability and structural integrity. You receive a guaranteed fixed price quote within 1 business day.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-400" />
                Approve &amp; Print
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Once you approve the 3D preview render and quote, we export production STEP/STL files and manufacture your physical part in your chosen material.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => handleSelectFlow(selectedFlow)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Proceed to {selectedFlow === 'PRINT' ? '3D File Instant Quote' : 'CAD Intake Form'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
