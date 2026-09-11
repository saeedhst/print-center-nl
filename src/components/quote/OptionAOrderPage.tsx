'use client';

import React from 'react';
import FileUploadDropzone from './FileUploadDropzone';
import ModelViewer3D from './ModelViewer3D';
import ConfigPanel from './ConfigPanel';
import PriceBreakdownCard from './PriceBreakdownCard';
import { useAppStore } from '@/lib/store';
import { UploadCloud, PenTool, Sparkles, ArrowLeft } from 'lucide-react';

export default function OptionAOrderPage() {
  const { setActiveView, setOrderType } = useAppStore();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => setActiveView('branch')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Choose Starting Option</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Option A
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              &ldquo;You Have a 3D File&rdquo; &mdash; Instant Quote &amp; Scale
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Drag and drop your file to inspect in 3D, slide to scale size, and see live pricing with 1-day delivery.
          </p>
        </div>

        {/* Quick toggle to Option B */}
        <button
          onClick={() => {
            setOrderType('DESIGN_AND_PRINT');
            setActiveView('order-b');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-2"
        >
          <PenTool className="w-3.5 h-3.5 text-slate-600" />
          <span>Need a design instead? (Option B)</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dropzone + 3D Viewport + Scaling/Config Panel */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <FileUploadDropzone />
          <ModelViewer3D />
          <ConfigPanel />
        </div>

        {/* Right Column: Live Price Breakdown Card */}
        <div className="lg:col-span-5 xl:col-span-4">
          <PriceBreakdownCard />
        </div>
      </div>
    </div>
  );
}
