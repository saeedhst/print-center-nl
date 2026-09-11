'use client';

import React, { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { DESIGN_BENCHMARK_CARDS } from '@/lib/sampleData';
import {
  UploadCloud,
  Clock,
  CheckCircle2,
  FileText,
  Link as LinkIcon,
  X,
  Maximize2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  HelpCircle,
} from 'lucide-react';

export default function CadDesignIntake() {
  const {
    cadDescription,
    cadTargetDimensions,
    cadCustomerNotes,
    cadReferenceLinks,
    cadReferenceImages,
    selectedBenchmarkCardId,
    cadContactName,
    cadContactEmail,
    setCadDetails,
    submitDesignRequest,
    setActiveView,
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newImgs = [...cadReferenceImages];
    for (let i = 0; i < files.length; i++) {
      newImgs.push(files[i].name);
    }
    setCadDetails({ cadReferenceImages: newImgs });
  };

  const handleRemoveImage = (index: number) => {
    setCadDetails({
      cadReferenceImages: cadReferenceImages.filter((_, idx) => idx !== index),
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cadContactName.trim() || !cadContactEmail.trim()) {
      setFormError('Please provide your name and email address so we can send your fixed quote.');
      return;
    }
    if (!cadDescription.trim()) {
      setFormError('Please briefly describe what the item is used for.');
      return;
    }

    setFormError(null);
    submitDesignRequest();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Option B &bull; Custom CAD Design Service</span>
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          You Need a Design (No 3D File)
        </h2>
        <p className="text-sm text-slate-600">
          Share your idea, photos, or rough sketches. Our industrial CAD engineers in Haarlem, Amsterdam &amp; Utrecht will turn it into a printable 3D model.
        </p>
      </div>

      {/* 1. Price Guide Gallery (Benchmark Visual Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-orange-600" />
            <span>Price Guide Gallery &amp; Benchmarks</span>
          </h3>
          <span className="text-xs text-slate-500">Select what matches your idea best</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESIGN_BENCHMARK_CARDS.map((card) => {
            const isSelected = selectedBenchmarkCardId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setCadDetails({ selectedBenchmarkCardId: card.id })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-orange-50/50 border-orange-600 shadow-soft ring-1 ring-orange-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Tier {card.tierNumber}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono">
                      {card.priceRange}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {card.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                  <div className="text-slate-500">
                    <strong className="text-slate-700">Examples:</strong> {card.exampleParts.slice(0, 2).join(', ')}
                  </div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Turnaround: {card.turnaround}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-card">
        {formError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {formError}
          </div>
        )}

        {/* 2. Upload Area for Reference Photos / Sketches / Links */}
        <div className="space-y-3">
          <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-orange-600" />
            <span>Upload Reference Photos, Rough Sketches, or Links</span>
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all bg-slate-50/50"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900">
                Drop phone photos or sketches here, or <span className="text-orange-600 underline">browse</span>
              </p>
              <p className="text-[11px] text-slate-500">
                PNG, JPG, or PDF (Photos of broken parts next to a ruler, napkin sketches, or blueprint diagrams)
              </p>
            </div>
          </div>

          {/* Reference files list */}
          {cadReferenceImages.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {cadReferenceImages.map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-xs text-slate-800 border border-slate-200"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-[200px]">{name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Web links input */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Or paste links to reference models / images (e.g. Thingiverse, Printables, Google Drive):</span>
            </div>
            <input
              type="text"
              value={cadReferenceLinks}
              onChange={(e) => setCadDetails({ cadReferenceLinks: e.target.value })}
              placeholder="https://drive.google.com/... or https://www.printables.com/model/..."
              className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-orange-600"
            />
          </div>
        </div>

        {/* 3. Basic Details: Dimensions, Description of Use, Notes */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          {/* Desired Dimensions */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Desired Dimensions (Length &times; Width &times; Height in mm)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Length (X)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.x}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, x: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-slate-900 font-mono focus:border-orange-600 outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Width (Y)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.y}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, y: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-slate-900 font-mono focus:border-orange-600 outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Height (Z)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.z}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, z: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-slate-900 font-mono focus:border-orange-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Brief description of what the item is used for */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-900">
              Brief Description of What the Item is Used For <span className="text-orange-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={cadDescription}
              onChange={(e) => setCadDetails({ cadDescription: e.target.value })}
              placeholder="E.g. Replacement hinge latch for vintage record player, or mounting bracket for handlebars, or custom cable organizer..."
              className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-600"
            />
          </div>

          {/* Simple customer notes field */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-900">
              Customer Notes &amp; Special Requirements
            </label>
            <textarea
              rows={2}
              value={cadCustomerNotes}
              onChange={(e) => setCadDetails({ cadCustomerNotes: e.target.value })}
              placeholder="E.g. Must fit snugly around a 22mm tube; needs to be heat-resistant for outdoor car use; smooth surface finish preferred..."
              className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-600"
            />
          </div>
        </div>

        {/* 4. 24-Hour Quote Submission Section */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          {/* Required Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-0.5">
                Submit your request &mdash; we will review your idea and email you a fixed price quote within 1 business day.
              </strong>
              <span className="text-slate-500">
                You will receive a clear 3D preview render and locked price before committing to manufacturing.
              </span>
            </div>
          </div>

          {/* Contact inputs: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Your Full Name *</label>
              <input
                type="text"
                required
                value={cadContactName}
                onChange={(e) => setCadDetails({ cadContactName: e.target.value })}
                placeholder="Jan de Vries"
                className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-orange-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Your Email Address *</label>
              <input
                type="email"
                required
                value={cadContactEmail}
                onChange={(e) => setCadDetails({ cadContactEmail: e.target.value })}
                placeholder="jan.devries@example.nl"
                className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-orange-600"
              />
            </div>
          </div>

          {/* Button: "Send Design Request" */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Selected Benchmark: <strong className="text-slate-900">{DESIGN_BENCHMARK_CARDS.find((c) => c.id === selectedBenchmarkCardId)?.title}</strong>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Send Design Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
