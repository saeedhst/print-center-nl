'use client';

import React, { useState } from 'react';
import { BENCHMARK_PORTFOLIO } from '@/lib/sampleData';
import { BenchmarkPortfolioItem, MaterialType } from '@/types';
import { MATERIALS, formatEur } from '@/lib/pricing';
import { useAppStore } from '@/lib/store';
import { PRESET_MODELS, calculateGeometryVolumeCm3, getBoundingBoxDimensions } from '@/lib/meshUtils';
import {
  Clock,
  Layers,
  Maximize2,
  Tag,
  ArrowUpRight,
  GraduationCap,
  Building,
  Wrench,
  Sparkles,
  MapPin,
} from 'lucide-react';

export default function BenchmarkPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { setMaterial, setModelGeometry, setActiveTab, setOrderType } = useAppStore();

  const categories = ['All', 'Engineering & Marine', 'Architecture & Urban', 'Robotics', 'Medical & Functional', 'Consumer'];

  const filteredItems = selectedCategory === 'All'
    ? BENCHMARK_PORTFOLIO
    : BENCHMARK_PORTFOLIO.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));

  const handleLoadBenchmarkIntoViewer = (item: BenchmarkPortfolioItem) => {
    // Find matching preset model or load default bracket
    let preset = PRESET_MODELS[0];
    if (item.category.includes('Architecture')) {
      preset = PRESET_MODELS[1];
    } else if (item.category.includes('Robotics') || item.category.includes('Marine')) {
      preset = PRESET_MODELS[2];
    } else if (item.category.includes('Product') || item.category.includes('Consumer')) {
      preset = PRESET_MODELS[3];
    }

    const geom = preset.generateGeometry();
    const dims = getBoundingBoxDimensions(geom);
    const volume = calculateGeometryVolumeCm3(geom);

    setModelGeometry(preset.fileName, geom, dims, volume, preset.id);
    setMaterial(item.material);
    setOrderType('DIRECT_PRINT');
    setActiveTab('quote');

    const quoteEl = document.getElementById('quote-wizard');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio-benchmarks" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Benchmark Prints</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Real Randstad Production &amp; Pricing
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-1.5">
            Transparent pricing benchmarks based on actual client projects manufactured in our Amsterdam &amp; Utrecht hubs.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of benchmark cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const mat = MATERIALS[item.material];
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-orange-500/5"
            >
              {/* Card visual badge header */}
              <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-950 p-5 flex flex-col justify-between relative overflow-hidden border-b border-slate-800/80">
                <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    {item.city} • {item.clientType}
                  </span>

                  {item.clientType === 'Student' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      -15% Applied
                    </span>
                  )}
                </div>

                {/* Simulated 3D isometric representation */}
                <div className="flex items-center justify-between z-10 mt-auto">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">{item.category}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Delivered</span>
                    <span className="text-xl font-extrabold text-white">
                      {formatEur(item.priceEur)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs list */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block font-medium">MATERIAL</span>
                    <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: mat.accentColor }}
                      />
                      {item.material}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block font-medium">DIMENSIONS</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">
                      {item.dimensions.x}×{item.dimensions.y}×{item.dimensions.z} mm
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block font-medium">PRINT DURATION</span>
                    <span className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.printDurationHours} hrs
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleLoadBenchmarkIntoViewer(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-orange-500 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Load Similar Spec in 3D Viewer</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
