'use client';

import React, { useState } from 'react';
import { BENCHMARK_PORTFOLIO } from '@/lib/sampleData';
import { BenchmarkPortfolioItem } from '@/types';
import { SIMPLE_MATERIALS, formatEur } from '@/lib/pricing';
import { useAppStore } from '@/lib/store';
import { PRESET_MODELS, calculateGeometryVolumeCm3, getBoundingBoxDimensions } from '@/lib/meshUtils';
import { Clock, MapPin, ArrowUpRight, Box, Sparkles, Layers } from 'lucide-react';

export default function BenchmarkPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { setModelGeometry, setMaterial, setActiveView, setOrderType } = useAppStore();

  const categories = ['All', 'Functional Parts', 'Prototypes', 'Aesthetic / Multi-Color'];

  const filteredItems = selectedCategory === 'All'
    ? BENCHMARK_PORTFOLIO
    : BENCHMARK_PORTFOLIO.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));

  const handleLoadItem = (item: BenchmarkPortfolioItem) => {
    let preset = PRESET_MODELS[0];
    if (item.category.includes('Architecture') || item.category.includes('Facade')) {
      preset = PRESET_MODELS[1];
    } else if (item.category.includes('Drone') || item.category.includes('Aesthetic')) {
      preset = PRESET_MODELS[2];
    } else if (item.category.includes('Dial') || item.category.includes('Knob')) {
      preset = PRESET_MODELS[3];
    }

    const geom = preset.generateGeometry();
    const dims = getBoundingBoxDimensions(geom);
    const volume = calculateGeometryVolumeCm3(geom);

    setModelGeometry(preset.fileName, geom, dims, volume, preset.id);
    setMaterial(item.material === 'RESIN' ? 'RESIN' : item.material === 'TOUGH' ? 'TOUGH' : 'STANDARD');
    setOrderType('DIRECT_PRINT');
    setActiveView('order-a');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="portfolio-section" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full">
              Real Sample Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Printed Samples &amp; Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Clean sample cards showing real-world printed items across Haarlem, Amsterdam, and Utrecht with exact dimensions and pricing.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-slate-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const mat = SIMPLE_MATERIALS[item.material] || SIMPLE_MATERIALS.STANDARD;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header */}
                <div className="p-5 bg-gradient-to-br from-slate-100 via-slate-50 to-white border-b border-slate-200 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-600 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      {item.city} &bull; {item.clientType}
                    </span>

                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {formatEur(item.priceEur)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Body & Specs */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">MATERIAL</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate">
                        {mat.simpleName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">SIZE</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block font-mono">
                        {item.dimensions.x}&times;{item.dimensions.y}&times;{item.dimensions.z}mm
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">PRINT TIME</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.printDurationHours}h
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLoadItem(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Load Spec into 3D Viewer</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
