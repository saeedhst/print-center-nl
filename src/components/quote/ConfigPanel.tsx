'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { MATERIALS, SHIPPING_TIERS } from '@/lib/pricing';
import { MaterialType } from '@/types';
import {
  Layers,
  Palette,
  Percent,
  Truck,
  GraduationCap,
  Info,
  Bike,
  Sparkles,
  FileText,
} from 'lucide-react';

export default function ConfigPanel() {
  const {
    material,
    setMaterial,
    infillPercentage,
    setInfillPercentage,
    colorCount,
    setColorCount,
    deliverySpeed,
    setDeliverySpeed,
    isStudent,
    setIsStudent,
    studentInstitution,
    specialInstructions,
    setSpecialInstructions,
  } = useAppStore();

  const materialsList = Object.values(MATERIALS);

  const infillOptions = [
    { value: 15, label: '15% Standard', desc: 'Optimal for prototypes & display models' },
    { value: 40, label: '40% Structural', desc: 'High strength for mechanical brackets & jigs' },
    { value: 100, label: '100% Solid', desc: 'Solid monolithic plastic for maximal load' },
  ];

  const colorOptions = [
    { count: 1, label: '1 Color', desc: 'Standard single spool' },
    { count: 2, label: '2 Colors', desc: 'Bambu AMS dual-tone' },
    { count: 3, label: '3 Colors', desc: 'Multi-accent detailing' },
    { count: 4, label: '4+ Colors', desc: 'Full AMS quad-color' },
  ];

  return (
    <div className="space-y-6 rounded-2xl bg-slate-900/70 border border-slate-800 p-5 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <h3 className="text-base font-bold text-white">Print Configuration</h3>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
          Live Pricing Engine
        </span>
      </div>

      {/* 1. Material Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>Filament / Resin Material</span>
            <span className="text-orange-400">*</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            Density &amp; mechanical grade
          </span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {materialsList.map((m) => {
            const isSelected = material === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMaterial(m.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 shadow-md shadow-orange-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: m.accentColor }}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    €{m.ratePerGram.toFixed(2)}/g
                  </span>
                </div>
                <div className="font-bold text-xs text-white">{m.id}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{m.tag}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Count (AMS Multi-material) */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Color Complexity (Bambu Lab AMS Multi-Material)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">Purge tower sync</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {colorOptions.map((c) => {
            const isSelected = colorCount === c.count;
            return (
              <button
                key={c.count}
                type="button"
                onClick={() => setColorCount(c.count)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-white flex items-center justify-between">
                  <span>{c.label}</span>
                  {c.count > 1 && (
                    <span className="text-[10px] text-amber-400 font-mono">
                      +{Math.round((c.count === 2 ? 0.25 : c.count === 3 ? 0.5 : 0.75) * 100)}%
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{c.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Infill Density */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-blue-400" />
            <span>Internal Infill Density</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">Weight &amp; durability</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {infillOptions.map((inf) => {
            const isSelected = infillPercentage === inf.value;
            return (
              <button
                key={inf.value}
                type="button"
                onClick={() => setInfillPercentage(inf.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-500/15 border-blue-500 shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-white">{inf.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 leading-snug">{inf.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Delivery Speed & Dutch Logistics */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Turnaround &amp; Delivery Option</span>
          </span>
          <span className="text-[11px] text-orange-400 font-semibold flex items-center gap-1">
            <Bike className="w-3 h-3" /> Randstad Priority
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SHIPPING_TIERS.map((tier) => {
            const isSelected = deliverySpeed === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setDeliverySpeed(tier.id)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    {tier.highlight}
                  </span>
                )}
                <div className="font-bold text-xs text-white">{tier.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{tier.carrier}</div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">{tier.duration}</span>
                  <span className="font-bold text-emerald-400">
                    {tier.costEur === 0 ? 'FREE' : `+€${tier.costEur.toFixed(2)}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Student Perk Toggle */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Dutch Student Discount (-15%)</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                TU Delft / UvA / UU
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Valid for university, HBO &amp; MBO student cards or .nl academic email.
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0 self-end sm:self-auto">
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>

      {/* 6. Special Instructions */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Production Notes &amp; Tolerances (Optional)</span>
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="E.g. print with 4 wall perimeters for tapping M3 heat inserts, or orient flat on bed..."
          rows={2}
          className="w-full text-xs rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>
    </div>
  );
}
