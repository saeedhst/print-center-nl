'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FileUploadDropzone from './FileUploadDropzone';
import ModelViewer3D from './ModelViewer3D';
import ConfigPanel from './ConfigPanel';
import PriceBreakdownCard from './PriceBreakdownCard';
import { useAppStore } from '@/lib/store';
import { PenTool, ArrowLeft } from 'lucide-react';

export default function OptionAOrderPage() {
  const { setOrderType, sourcedModelMetadata } = useAppStore();
  const router = useRouter();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-outline-variant">
        <div>
          <Link
            href="/order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors mb-2 cursor-pointer font-label-mono-xs uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Switch Workflow Option</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded uppercase font-label-mono tracking-wider">
              Track 01
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight font-display">
              &ldquo;I Have a 3D File&rdquo; &mdash; Instant Slicing &amp; Quote
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Direct CAD/mesh upload, real-time geometric inspection, custom scaling, and instant production pricing with 1-day delivery.
          </p>
        </div>

        {/* Quick toggle to Option B */}
        <button
          onClick={() => {
            setOrderType('DESIGN_AND_PRINT');
            router.push('/have-idea-or-photo');
          }}
          className="self-start sm:self-auto px-3.5 py-2 rounded bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-outline transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <PenTool className="w-3.5 h-3.5 text-primary" />
          <span>Need a design/CAD instead? (Track 02)</span>
        </button>
      </div>

      {/* Sourced Model Origin Notice Banner */}
      {sourcedModelMetadata && (
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            {sourcedModelMetadata.thumbnailUrl && (
              <img
                src={sourcedModelMetadata.thumbnailUrl}
                alt={sourcedModelMetadata.title}
                className="w-12 h-12 rounded-lg object-cover border border-blue-200 shrink-0"
              />
            )}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600 text-white font-label-mono-xs">
                  Sourced from {sourcedModelMetadata.provider}
                </span>
                {sourcedModelMetadata.isNonCommercial ? (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 font-label-mono-xs">
                    Non-Commercial (Personal Use)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-label-mono-xs">
                    Commercial Permitted
                  </span>
                )}
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {sourcedModelMetadata.title}
              </div>
              {sourcedModelMetadata.author && (
                <div className="text-slate-500 text-[11px]">
                  Original Creator: <span className="font-medium text-slate-700">{sourcedModelMetadata.author}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => router.push('/have-idea-or-photo')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer self-start sm:self-auto shrink-0"
          >
            Change / Source Another &rarr;
          </button>
        </div>
      )}

      {/* 65% / 35% Dual-Pane Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (65% / 8 cols): Dropzone + 3D Viewport + Industrial Config Panel */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <FileUploadDropzone />
          <ModelViewer3D />
          <ConfigPanel />
        </div>

        {/* Right Column (35% / 4 cols): Live Price Breakdown Card */}
        <div className="lg:col-span-5 xl:col-span-4">
          <PriceBreakdownCard />
        </div>
      </div>
    </div>
  );
}
