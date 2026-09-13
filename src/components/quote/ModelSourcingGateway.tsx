'use client';

import React from 'react';
import Link from 'next/link';
import {
  Link as LinkIcon,
  Search,
  Layers,
  ArrowRight,
  Sparkles,
  FileCode,
} from 'lucide-react';

export default function ModelSourcingGateway() {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors mb-4 cursor-pointer font-label-mono-xs uppercase tracking-wider"
        >
          &larr; Back to Home
        </Link>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Step 1 &bull; Model Sourcing Options</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight font-display">
            Don&rsquo;t Have a 3D File Yet?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-body-md">
            Choose how you&rsquo;d like to source your 3D design. Select a pathway below to proceed:
          </p>
        </div>
      </div>

      {/* 3 Main Sourcing Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pathway 1: Paste a Link */}
        <Link
          href="/import-link"
          className="group p-6 sm:p-7 rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-level-2 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                <LinkIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded font-label-mono-xs">
                Auto-Detection
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors font-display">
                Paste a 3D Model Link
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Found a design online? Paste any model URL from <strong>MakerWorld</strong>, <strong>Printables</strong>, or <strong>Thingiverse</strong>. We automatically extract metadata and prepare your print.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                MakerWorld
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Printables
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Thingiverse
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>Import via Link &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Pathway 2: Search & Browse Thingiverse */}
        <Link
          href="/thingiverse"
          className="group p-6 sm:p-7 rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-level-2 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded font-label-mono-xs">
                Open Hardware
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors font-display">
                Browse Thingiverse
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Explore trending open-source models directly on our site. Search phone stands, mounts, desk utilities, and toys with 1-click slicing.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Live Search
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Popular Gallery
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                1-Click Slicing
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>Explore Thingiverse Models &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Pathway 3: Pre-Approved Popular Catalog */}
        <Link
          href="/catalog"
          className="group p-6 sm:p-7 rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-level-2 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-label-mono-xs">
                Pre-Tested
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors font-display">
                Pre-Approved Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Curated everyday utility prints ready for commercial production. Tested geometries, fixed pricing, and 1-day delivery in the Netherlands.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Office &amp; Desk
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Workshop Tools
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-label-mono-xs">
                Instant Price
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>Browse Utility Catalog &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Direct Uploader Alternative Banner */}
      <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">
              Already have a 3D CAD or mesh file ready?
            </h4>
            <p className="text-xs text-slate-600">
              Skip sourcing and upload your .STL, .OBJ, or .3MF file directly for real-time 3D inspection and instant slicing.
            </p>
          </div>
        </div>

        <Link
          href="/have-3d-file"
          className="px-5 py-2.5 rounded bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          Open 3D File Slicer &rarr;
        </Link>
      </div>
    </div>
  );
}
