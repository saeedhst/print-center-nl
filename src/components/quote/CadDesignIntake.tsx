'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
    router.push('/confirmation');
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Header & Breadcrumb */}
      <div>
        <Link
          href="/order"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors mb-4 cursor-pointer font-label-mono-xs uppercase tracking-wider"
        >
          &larr; Switch Workflow Option
        </Link>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Track 02 &bull; Parametric CAD Design Service</span>
          </span>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-display">
            You Need a Design (No 3D File)
          </h2>
          <p className="text-sm text-slate-600 font-body-md">
            Share your concept, photos, or rough sketches. Our industrial CAD engineers in Haarlem, Amsterdam &amp; Utrecht will turn it into a printable 3D model.
          </p>
        </div>
      </div>

      {/* 1. Price Guide Gallery (Benchmark Visual Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2 font-headline-sm">
            <Tag className="w-4 h-4 text-primary" />
            <span>Price Guide Gallery &amp; Benchmarks</span>
          </h3>
          <span className="text-xs text-slate-500">Select what matches your concept best</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESIGN_BENCHMARK_CARDS.map((card) => {
            const isSelected = selectedBenchmarkCardId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setCadDetails({ selectedBenchmarkCardId: card.id })}
                className={`p-5 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary'
                    : 'bg-white border-outline-variant hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded font-label-mono-xs bg-slate-100 text-slate-700">
                      Tier {card.tierNumber}
                    </span>
                    <span className="text-sm font-bold text-on-surface font-label-mono">
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
          <label className="text-sm font-bold text-on-surface flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-primary" />
            <span>Upload Reference Photos, Rough Sketches, or Links</span>
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-outline rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-slate-50 transition-all bg-surface-container-low"
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
              <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-on-surface">
                Drop smartphone photos or sketches here, or <span className="text-primary underline font-semibold">browse files</span>
              </p>
              <p className="text-[11px] text-slate-500 font-label-mono-xs">
                PNG, JPG, or PDF (Broken part next to a ruler, napkin sketch, or technical drawing)
              </p>
            </div>
          </div>

          {/* Reference files list */}
          {cadReferenceImages.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {cadReferenceImages.map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-xs text-slate-800 border border-slate-200 font-label-mono-xs"
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
              className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
            />
          </div>
        </div>

        {/* 3. Basic Details: Dimensions, Description of Use, Notes */}
        <div className="space-y-6 pt-4 border-t border-outline-variant">
          {/* Desired Dimensions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface flex items-center gap-1.5 uppercase font-label-mono tracking-wider">
              <Maximize2 className="w-3.5 h-3.5 text-primary" />
              <span>Target Dimensions (Length &times; Width &times; Height in mm)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1 font-label-mono-xs">Length (X)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.x}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, x: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2 text-on-surface font-label-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1 font-label-mono-xs">Width (Y)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.y}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, y: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2 text-on-surface font-label-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1 font-label-mono-xs">Height (Z)</span>
                <input
                  type="number"
                  value={cadTargetDimensions.z}
                  onChange={(e) =>
                    setCadDetails({
                      cadTargetDimensions: { ...cadTargetDimensions, z: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2 text-on-surface font-label-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Brief description of what the item is used for */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase font-label-mono tracking-wider">
              Item Application &amp; Use Case <span className="text-primary">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={cadDescription}
              onChange={(e) => setCadDetails({ cadDescription: e.target.value })}
              placeholder="E.g. Replacement hinge latch for vintage record player, or mounting bracket for handlebars, or custom cable organizer..."
              className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
            />
          </div>

          {/* Simple customer notes field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface uppercase font-label-mono tracking-wider">
              Customer Notes &amp; Special Tolerances
            </label>
            <textarea
              rows={2}
              value={cadCustomerNotes}
              onChange={(e) => setCadDetails({ cadCustomerNotes: e.target.value })}
              placeholder="E.g. Must fit snugly around a 22mm tube; needs to be heat-resistant for outdoor car use; smooth surface finish preferred..."
              className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
            />
          </div>
        </div>

        {/* 4. 24-Hour Quote Submission Section */}
        <div className="space-y-4 pt-6 border-t border-outline-variant">
          {/* Required Callout */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs leading-relaxed">
              <strong className="text-on-surface font-bold block mb-0.5">
                Submit your project &mdash; our engineering team will inspect the request and email a guaranteed fixed-price quote within 1 business day.
              </strong>
              <span className="text-slate-500">
                Includes interactive 3D inspection render and locked manufacturing price before any production starts.
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
                className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
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
                className="w-full text-xs rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
              />
            </div>
          </div>

          {/* Button: "Send Design Request" */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Selected Benchmark: <strong className="text-on-surface font-semibold">{DESIGN_BENCHMARK_CARDS.find((c) => c.id === selectedBenchmarkCardId)?.title}</strong>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-sm shadow-level-1 hover:shadow-level-2 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Submit Design Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
