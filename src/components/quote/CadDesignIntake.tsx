'use client';

import React, { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CAD_COMPLEXITY_TIERS } from '@/lib/sampleData';
import { DesignComplexity } from '@/types';
import {
  PenTool,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';

export default function CadDesignIntake() {
  const {
    cadComplexity,
    cadDescription,
    cadTargetDimensions,
    cadFunctionalRequirements,
    cadIntendedUse,
    cadReferenceImages,
    setCadDetails,
    setIsCheckoutModalOpen,
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = [...cadReferenceImages];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i].name);
    }
    setCadDetails({ cadReferenceImages: newImages });
  };

  const removeImage = (index: number) => {
    const updated = cadReferenceImages.filter((_, idx) => idx !== index);
    setCadDetails({ cadReferenceImages: updated });
  };

  const handleSubmitIntake = () => {
    if (!cadDescription.trim()) {
      setErrorMsg('Please enter a brief description of what you need designed.');
      return;
    }
    setErrorMsg(null);
    setIsCheckoutModalOpen(true);
  };

  const intendedUseOptions: { id: 'functional' | 'decorative' | 'heat-resistant' | 'flexible'; label: string; desc: string }[] = [
    { id: 'functional', label: 'Mechanical / Functional', desc: 'Load bearing, tight tolerances' },
    { id: 'decorative', label: 'Visual / Architectural', desc: 'Display, scale aesthetics' },
    { id: 'heat-resistant', label: 'High Temperature', desc: 'Resists up to 95°C engine/sun' },
    { id: 'flexible', label: 'Elastic / Impact Cushion', desc: 'Rubber-like shock absorbing' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* SLA Guarantee Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Guaranteed 1-Business-Day Engineering SLA</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Free Assessment
            </span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Custom CAD models require professional engineer review. You will receive a locked price quote and 3D printability evaluation within <strong>1 business day</strong>. No commitment required until you approve the quote.
          </p>
        </div>
      </div>

      {/* 1. Indicative Benchmark Selector (3 Tiers) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">1</span>
            Select Estimated Complexity Tier
          </h3>
          <span className="text-xs text-slate-400">Transparent baseline guide</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAD_COMPLEXITY_TIERS.map((tier) => {
            const isSelected = cadComplexity === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setCadDetails({ cadComplexity: tier.id })}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">{tier.typicalHours}</span>
                    <span className="text-sm font-bold text-amber-400">{tier.priceRange}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{tier.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-slate-300 font-medium">Turnaround: {tier.turnaround}</div>
                  <ul className="text-[10px] text-slate-400 space-y-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. File & Reference Images Intake */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
          Upload Reference Photos, Caliper Measurements, or Sketches
        </h3>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-500/50 hover:bg-slate-900/60 transition-all bg-slate-900/30"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadCloud className="w-8 h-8 text-amber-400" />
            <p className="text-sm font-semibold text-white">
              Drop reference images or <span className="text-amber-400 underline">browse</span>
            </p>
            <p className="text-xs text-slate-400">
              Supports PNG, JPG, or PDF (Photos of broken parts next to a ruler, hand sketches, technical drawings)
            </p>
          </div>
        </div>

        {/* Uploaded image badges */}
        {cadReferenceImages.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {cadReferenceImages.map((imgName, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-xs truncate">{imgName}</span>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Written Description & Requirements */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">3</span>
          Component Functionality &amp; Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Describe Functionality &amp; Purpose <span className="text-orange-400">*</span>
            </label>
            <textarea
              value={cadDescription}
              onChange={(e) => setCadDetails({ cadDescription: e.target.value })}
              placeholder="What does this part do? What does it connect to? E.g., Replacement gear for vintage coffee grinder, outer diameter 42mm, 18 teeth, press-fit onto 5mm D-shaft..."
              rows={4}
              className="w-full text-xs rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Fitting Requirements &amp; Mechanical Tolerances
            </label>
            <textarea
              value={cadFunctionalRequirements}
              onChange={(e) => setCadDetails({ cadFunctionalRequirements: e.target.value })}
              placeholder="E.g., Needs to slide smoothly through a 20mm slot; requires 2x M4 screw countersunk holes; must be waterproof; snaps into aluminum extrusion..."
              rows={4}
              className="w-full text-xs rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 4. Target Dimensions & End-Use */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {/* Dimensions */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Approximate Target Dimensions (mm)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-slate-500 block">WIDTH (X)</span>
              <input
                type="number"
                value={cadTargetDimensions.x}
                onChange={(e) =>
                  setCadDetails({
                    cadTargetDimensions: { ...cadTargetDimensions, x: Number(e.target.value) },
                  })
                }
                className="w-full text-xs rounded-lg bg-slate-900 border border-slate-800 p-2 text-white font-mono focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">DEPTH (Y)</span>
              <input
                type="number"
                value={cadTargetDimensions.y}
                onChange={(e) =>
                  setCadDetails({
                    cadTargetDimensions: { ...cadTargetDimensions, y: Number(e.target.value) },
                  })
                }
                className="w-full text-xs rounded-lg bg-slate-900 border border-slate-800 p-2 text-white font-mono focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">HEIGHT (Z)</span>
              <input
                type="number"
                value={cadTargetDimensions.z}
                onChange={(e) =>
                  setCadDetails({
                    cadTargetDimensions: { ...cadTargetDimensions, z: Number(e.target.value) },
                  })
                }
                className="w-full text-xs rounded-lg bg-slate-900 border border-slate-800 p-2 text-white font-mono focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Intended End Use */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Intended End-Use / Operating Environment
          </label>
          <div className="grid grid-cols-2 gap-2">
            {intendedUseOptions.map((opt) => {
              const isSelected = cadIntendedUse === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCadDetails({ cadIntendedUse: opt.id })}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-[11px]">{opt.label}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5 truncate">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Selected tier: <strong className="text-amber-400">{cadComplexity}</strong> (Estimated:{' '}
          {CAD_COMPLEXITY_TIERS.find((t) => t.id === cadComplexity)?.priceRange})
        </div>

        <button
          type="button"
          onClick={handleSubmitIntake}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Request 1-Day Review &amp; Quote</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
