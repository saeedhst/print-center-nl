'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { SIMPLE_MATERIALS } from '@/lib/pricing';
import { MaterialType, SimpleColorOption } from '@/types';
import {
  Layers,
  Palette,
  Maximize2,
  Sliders,
  Check,
  Info,
  Sparkles,
  FileText,
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
    { label: '50% (Half Size)', value: 0.5 },
    { label: '75%', value: 0.75 },
    { label: '100% (Original 1:1)', value: 1.0 },
    { label: '125%', value: 1.25 },
    { label: '150% (Enlarged)', value: 1.5 },
    { label: '200% (Double)', value: 2.0 },
  ];

  const materialList = Object.values(SIMPLE_MATERIALS);

  return (
    <div className="space-y-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-soft">
      {/* 1. Automatic Size Readout & Scaling Slider */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-orange-600" />
            <span>Automatic Size Readout &amp; Scaling</span>
          </label>
          <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
            {Math.round(scaleFactor * 100)}% Scale
          </span>
        </div>

        {/* Dimension display cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Length (X)</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {priceBreakdown.scaledDimensions.x} mm
            </span>
            <span className="text-[10px] text-slate-400 block">Orig: {baseDimensions.x}mm</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Width (Y)</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {priceBreakdown.scaledDimensions.y} mm
            </span>
            <span className="text-[10px] text-slate-400 block">Orig: {baseDimensions.y}mm</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Height (Z)</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              {priceBreakdown.scaledDimensions.z} mm
            </span>
            <span className="text-[10px] text-slate-400 block">Orig: {baseDimensions.z}mm</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] font-semibold text-emerald-800 uppercase block">Net Volume</span>
            <span className="text-sm font-extrabold text-emerald-900 font-mono">
              {priceBreakdown.scaledVolumeCm3} cm&sup3;
            </span>
            <span className="text-[10px] text-emerald-700 block">Weight: {priceBreakdown.weightGrams}g</span>
          </div>
        </div>

        {/* Scale Range Slider */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Adjust Scale Slider:
            </span>
            <span className="font-mono font-bold text-slate-900">
              {Math.round(scaleFactor * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0.25"
            max="2.5"
            step="0.05"
            value={scaleFactor}
            onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />

          {/* Quick Preset Buttons (e.g. 50%, 100%, 150%) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Presets:</span>
            {scalePresets.map((preset) => {
              const isSelected = Math.abs(scaleFactor - preset.value) < 0.01;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setScaleFactor(preset.value)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Simple Material Options: Standard, Tough, Smooth Resin */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-600" />
            <span>Material Selection</span>
          </label>
          <span className="text-xs text-slate-500">Pick based on your application</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {materialList.map((m) => {
            const isSelected = material === m.id || (m.id === 'STANDARD' && material === 'PLA') || (m.id === 'TOUGH' && (material === 'PETG' || material === 'ABS'));
            return (
              <div
                key={m.id}
                onClick={() => setMaterial(m.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-orange-50/50 border-orange-600 shadow-xs ring-1 ring-orange-600'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">{m.simpleName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      €{m.ratePerGram.toFixed(2)}/g
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {m.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{m.tag}</span>
                  <span className="text-slate-500">{m.finish}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Color: Single Color or Multi-Color Option */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-orange-600" />
            <span>Color Option</span>
          </label>
          <span className="text-xs text-slate-500">Bambu Lab multi-filament system</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setColorOption('SINGLE')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              colorOption === 'SINGLE'
                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="font-extrabold text-sm mb-1 flex items-center justify-between">
              <span>Single Color</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${colorOption === 'SINGLE' ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-600 border border-slate-200'}`}>
                Baseline 1.0&times;
              </span>
            </div>
            <p className={`text-xs ${colorOption === 'SINGLE' ? 'text-slate-300' : 'text-slate-500'}`}>
              Clean uniform single color print. Cost-efficient and fast production.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setColorOption('MULTI')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              colorOption === 'MULTI'
                ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="font-extrabold text-sm mb-1 flex items-center justify-between">
              <span>Multi-Color (AMS Multi-Material)</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${colorOption === 'MULTI' ? 'bg-orange-700 text-orange-100' : 'bg-white text-orange-700 border border-slate-200'}`}>
                +35% Purge Cycle
              </span>
            </div>
            <p className={`text-xs ${colorOption === 'MULTI' ? 'text-orange-100' : 'text-slate-500'}`}>
              Seamless dual or multi-tone accents printed simultaneously with zero assembly.
            </p>
          </button>
        </div>
      </div>

      {/* 4. Customer Special Instructions */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Production Notes &amp; Special Tolerances (Optional)</span>
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="E.g. print with 4 wall perimeters for heat inserts, smooth bottom finish, or specify exact RAL color..."
          rows={2}
          className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-600 transition-colors"
        />
      </div>
    </div>
  );
}
