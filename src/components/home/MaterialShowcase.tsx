'use client';

import React, { useState } from 'react';
import { MATERIALS } from '@/lib/pricing';
import { MaterialType } from '@/types';
import { useAppStore } from '@/lib/store';
import { Check, ShieldCheck, Zap, Sparkles, Thermometer, ArrowRight } from 'lucide-react';

export default function MaterialShowcase() {
  const { material: activeStoreMaterial, setMaterial, setActiveTab } = useAppStore();
  const [selectedMat, setSelectedMat] = useState<MaterialType>(activeStoreMaterial);

  const materialsList = Object.values(MATERIALS);
  const current = MATERIALS[selectedMat];

  const handleApplyMaterial = (matId: MaterialType) => {
    setSelectedMat(matId);
    setMaterial(matId);
    setActiveTab('quote');
    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="materials-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industrial Grade Polymers</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Precision Engineering Materials
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          From rapid design validation to chemical-resistant production jigs, we calibrate our printers for optimal layer bonding and dimensional accuracy.
        </p>
      </div>

      {/* Tabs / Material selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
        {materialsList.map((m) => {
          const isSelected = selectedMat === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMat(m.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-orange-500 shadow-lg shadow-orange-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: m.accentColor }}
                />
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  €{m.ratePerGram.toFixed(2)}/g
                </span>
              </div>
              <div className="font-bold text-sm text-white">{m.id}</div>
              <div className="text-[11px] text-slate-400 truncate">{m.tag}</div>
            </button>
          );
        })}
      </div>

      {/* Featured Material Detailed View */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: current.accentColor }}
            />
            <h3 className="text-2xl font-bold text-white tracking-tight">{current.name}</h3>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-orange-400 border border-slate-700">
              {current.tag}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {current.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold block">DENSITY</span>
              <span className="text-sm font-bold text-white">{current.density} g/cm³</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold block">TENSILE STRENGTH</span>
              <span className="text-sm font-bold text-white">{current.tensileStrength}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold block">MAX TEMPERATURE</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                {current.tempResistance}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-semibold block">BASE RATE</span>
              <span className="text-sm font-bold text-emerald-400">€{current.ratePerGram.toFixed(2)} / g</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 space-y-1.5">
            <div>
              <strong className="text-slate-300">Surface Finish:</strong> {current.finish}
            </div>
            <div>
              <strong className="text-slate-300">Recommended For:</strong> {current.bestFor}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
          <div className="text-xs text-slate-400">
            Selected for calculation in the dynamic quote engine:
          </div>
          <div className="text-3xl font-extrabold text-white flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: current.accentColor }}
            />
            {current.id}
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            Multi-color printing supported on Bambu Lab AMS with up to 4+ color changes.
          </p>

          <button
            onClick={() => handleApplyMaterial(current.id)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Quote with {current.id}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
