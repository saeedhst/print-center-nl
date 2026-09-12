'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { SIMPLE_MATERIALS } from '@/lib/pricing';
import {
  Layers,
  Palette,
  Maximize2,
  Sliders,
  Check,
  CheckCircle2,
  Cpu,
  FileText,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function ConfigPanel() {
  const {
    baseDimensions,
    scaleFactor,
    setScaleFactor,
    material,
    setMaterial,
    colorOption,
    setColorOption,
    priceBreakdown,
    specialInstructions,
    setSpecialInstructions,
  } = useAppStore();

  const scalePresets = [
    { label: '50%', value: 0.5 },
    { label: '75%', value: 0.75 },
    { label: '100% (1:1)', value: 1.0 },
    { label: '125%', value: 1.25 },
    { label: '150%', value: 1.5 },
    { label: '200%', value: 2.0 },
  ];

  // Amsterdam Precision technical specs for materials
  const materialSpecs: Record<
    string,
    {
      tech: string;
      roughness: string;
      tolerance: string;
      glassTemp: string;
      layerPitch: string;
      tagColor: string;
    }
  > = {
    STANDARD: {
      tech: 'FDM Rapid',
      roughness: 'Ra 6.3µm',
      tolerance: '±0.10mm',
      glassTemp: '55°C',
      layerPitch: '0.16mm',
      tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    TOUGH: {
      tech: 'Carbon Fiber FDM',
      roughness: 'Ra 4.5µm',
      tolerance: '±0.05mm',
      glassTemp: '75°C',
      layerPitch: '0.12mm',
      tagColor: 'bg-primary/10 text-primary border-primary/20',
    },
    RESIN: {
      tech: 'SLA Photopolymer',
      roughness: 'Ra 1.2µm',
      tolerance: '±0.03mm',
      glassTemp: '60°C',
      layerPitch: '0.03mm',
      tagColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
  };

  const materialList = Object.values(SIMPLE_MATERIALS);

  return (
    <div className="space-y-6 rounded-xl bg-white border border-outline-variant p-6 shadow-level-1">
      {/* Top-Docked Industrial Milestone Stepper */}
      <div className="border-b border-outline-variant pb-5">
        <div className="flex items-center justify-between text-[11px] font-label-mono uppercase tracking-wider text-slate-500 mb-2">
          <span>PRODUCTION PIPELINE MILESTONES</span>
          <span className="text-primary font-bold">STEP 2 OF 4 ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* Milestone 01 */}
          <div className="p-2.5 rounded bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-label-mono-xs text-emerald-800 font-bold block leading-none">
                [01] COMPLETE
              </span>
              <span className="text-xs font-semibold text-emerald-950 truncate block">
                Mesh Analysis
              </span>
            </div>
          </div>

          {/* Milestone 02 */}
          <div className="p-2.5 rounded bg-primary/10 border border-primary/30 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-label-mono-xs text-[10px] font-bold shrink-0">
              02
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-label-mono-xs text-primary font-bold block leading-none">
                [02] IN PROGRESS
              </span>
              <span className="text-xs font-bold text-on-surface truncate block">
                Material &amp; Scale
              </span>
            </div>
          </div>

          {/* Milestone 03 */}
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200/60 flex items-center gap-2 text-slate-500">
            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-label-mono-xs text-[10px] font-bold shrink-0">
              03
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-label-mono-xs text-slate-400 font-medium block leading-none">
                [03] NEXT
              </span>
              <span className="text-xs font-medium text-slate-700 truncate block">
                Finishing &amp; Notes
              </span>
            </div>
          </div>

          {/* Milestone 04 */}
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200/60 flex items-center gap-2 text-slate-500">
            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-label-mono-xs text-[10px] font-bold shrink-0">
              04
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-label-mono-xs text-slate-400 font-medium block leading-none">
                [04] READY
              </span>
              <span className="text-xs font-medium text-slate-700 truncate block">
                Instant Checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Automatic Size Readout & Scaling Slider */}
      <div className="space-y-3 pb-6 border-b border-outline-variant">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-primary" />
            <span>Telemetry Dimensions &amp; Scaling</span>
          </label>
          <span className="font-label-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
            SCALE: {Math.round(scaleFactor * 100)}%
          </span>
        </div>

        {/* 4 Dimension Parameter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded bg-surface-container-low border border-outline-variant">
            <span className="text-[10px] font-label-mono-xs uppercase text-slate-500 block font-semibold">
              Length (X)
            </span>
            <span className="text-sm font-bold text-on-surface font-label-mono mt-0.5 block">
              {priceBreakdown.scaledDimensions.x} <span className="text-xs font-normal text-slate-500">mm</span>
            </span>
            <span className="text-[10px] font-label-mono-xs text-slate-400 block mt-0.5">
              1:1 = {baseDimensions.x}mm
            </span>
          </div>

          <div className="p-3 rounded bg-surface-container-low border border-outline-variant">
            <span className="text-[10px] font-label-mono-xs uppercase text-slate-500 block font-semibold">
              Width (Y)
            </span>
            <span className="text-sm font-bold text-on-surface font-label-mono mt-0.5 block">
              {priceBreakdown.scaledDimensions.y} <span className="text-xs font-normal text-slate-500">mm</span>
            </span>
            <span className="text-[10px] font-label-mono-xs text-slate-400 block mt-0.5">
              1:1 = {baseDimensions.y}mm
            </span>
          </div>

          <div className="p-3 rounded bg-surface-container-low border border-outline-variant">
            <span className="text-[10px] font-label-mono-xs uppercase text-slate-500 block font-semibold">
              Height (Z)
            </span>
            <span className="text-sm font-bold text-on-surface font-label-mono mt-0.5 block">
              {priceBreakdown.scaledDimensions.z} <span className="text-xs font-normal text-slate-500">mm</span>
            </span>
            <span className="text-[10px] font-label-mono-xs text-slate-400 block mt-0.5">
              1:1 = {baseDimensions.z}mm
            </span>
          </div>

          <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] font-label-mono-xs uppercase text-emerald-800 block font-semibold">
              Net Volume
            </span>
            <span className="text-sm font-bold text-emerald-950 font-label-mono mt-0.5 block">
              {priceBreakdown.scaledVolumeCm3} <span className="text-xs font-normal text-emerald-700">cm³</span>
            </span>
            <span className="text-[10px] font-label-mono-xs text-emerald-700 block mt-0.5">
              Weight ~ {priceBreakdown.weightGrams}g
            </span>
          </div>
        </div>

        {/* Scale Slider */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              Continuous Scale Factor:
            </span>
            <span className="font-label-mono font-bold text-on-surface">
              {scaleFactor.toFixed(2)}&times; ({Math.round(scaleFactor * 100)}%)
            </span>
          </div>

          <input
            type="range"
            min="0.25"
            max="2.5"
            step="0.05"
            value={scaleFactor}
            onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-[#0052FF]"
          />

          {/* Precision Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-label-mono-xs text-slate-500 mr-1 uppercase">
              Presets:
            </span>
            {scalePresets.map((preset) => {
              const isSelected = Math.abs(scaleFactor - preset.value) < 0.01;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setScaleFactor(preset.value)}
                  className={`px-2.5 py-1 text-xs font-label-mono font-semibold rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-on-surface border-outline hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Material Selection Chips with Technical Specs */}
      <div className="space-y-3 pb-6 border-b border-outline-variant">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>Industrial Material Specification</span>
          </label>
          <span className="text-xs text-slate-500">Calibrated for Bambu Lab &amp; Formlabs Fleet</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {materialList.map((m) => {
            const isSelected =
              material === m.id ||
              (m.id === 'STANDARD' && material === 'PLA') ||
              (m.id === 'TOUGH' && (material === 'PETG' || material === 'ABS'));
            const specs = materialSpecs[m.id] || materialSpecs.STANDARD;

            return (
              <div
                key={m.id}
                onClick={() => setMaterial(m.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary'
                    : 'bg-white border-outline-variant hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="font-bold text-sm text-on-surface">{m.simpleName}</span>
                    </div>

                    <span className="font-label-mono text-xs font-bold text-on-surface bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      €{m.ratePerGram.toFixed(2)}/g
                    </span>
                  </div>

                  {/* Technical badges */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    <span className={`text-[10px] font-label-mono-xs font-semibold px-1.5 py-0.5 rounded border ${specs.tagColor}`}>
                      {specs.tech}
                    </span>
                    <span className="text-[10px] font-label-mono-xs text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                      Tol: {specs.tolerance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {m.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-label-mono-xs text-slate-500">
                  <span>Roughness: <strong className="text-on-surface">{specs.roughness}</strong></span>
                  <span>Pitch: <strong className="text-on-surface">{specs.layerPitch}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Color: Single Color vs Multi-Color AMS System */}
      <div className="space-y-3 pb-6 border-b border-outline-variant">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span>Filament &amp; Color Configuration</span>
          </label>
          <span className="text-xs text-slate-500">Bambu Lab AMS 4-spool system</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setColorOption('SINGLE')}
            className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
              colorOption === 'SINGLE'
                ? 'bg-on-surface text-white border-on-surface shadow-xs'
                : 'bg-white border-outline-variant hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="font-bold text-sm mb-1 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border ${colorOption === 'SINGLE' ? 'border-white bg-white' : 'border-slate-400 bg-slate-200'}`} />
                <span>Single Material / Color</span>
              </span>
              <span className={`text-[10px] font-label-mono-xs px-2 py-0.5 rounded ${colorOption === 'SINGLE' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                1.0&times; BASELINE
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${colorOption === 'SINGLE' ? 'text-slate-300' : 'text-slate-500'}`}>
              Clean uniform industrial finish. Optimal structural layer adhesion and fast production cycle.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setColorOption('MULTI')}
            className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
              colorOption === 'MULTI'
                ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary'
                : 'bg-white border-outline-variant hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="font-bold text-sm mb-1 flex items-center justify-between">
              <span className="flex items-center gap-2 text-on-surface">
                <span className={`w-3 h-3 rounded-full border ${colorOption === 'MULTI' ? 'border-primary bg-primary' : 'border-slate-400 bg-slate-200'}`} />
                <span>Multi-Color AMS Matrix</span>
              </span>
              <span className={`text-[10px] font-label-mono-xs px-2 py-0.5 rounded ${colorOption === 'MULTI' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                +35% PURGE CYCLE
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrated multi-tone accents or dual-material interfaces printed simultaneously with zero assembly.
            </p>
          </button>
        </div>
      </div>

      {/* 4. Customer Special Instructions & Tolerances */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-on-surface flex items-center gap-1.5 uppercase font-label-mono tracking-wider">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span>Production Notes &amp; Engineering Tolerances (Optional)</span>
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="E.g., print with 4 wall perimeters for M3 heat-set inserts, smooth bottom build plate finish, or specify RAL color code..."
          rows={2}
          className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-3 text-on-surface placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm"
        />
        <p className="text-[11px] text-slate-500">
          Our Amsterdam slicing engineers verify wall perimeters and overhang angles before starting production.
        </p>
      </div>
    </div>
  );
}
