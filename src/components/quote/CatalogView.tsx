'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { PRE_APPROVED_CATALOG } from '@/lib/catalogData';
import { CatalogItem } from '@/types/modelSources';
import { PRESET_MODELS } from '@/lib/meshUtils';
import {
  Layers,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Box,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Office & Desk',
  'Tools & Workshop',
  'Home & Living',
  'Tech & Gadgets',
];

export default function CatalogView() {
  const router = useRouter();
  const { setModelGeometry, setSourcedModelMetadata } = useAppStore();

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? PRE_APPROVED_CATALOG
      : PRE_APPROVED_CATALOG.filter((item) => item.category === activeCategory);

  const handleSelectCatalogItem = (item: CatalogItem) => {
    const matchedPreset =
      PRESET_MODELS.find((p) => p.id === item.presetId) || PRESET_MODELS[0];
    const geometry = matchedPreset.generateGeometry();

    setSourcedModelMetadata({
      id: item.id,
      title: item.name,
      provider: 'catalog',
      originalUrl: '/catalog',
      thumbnailUrl: item.thumbnailUrl,
      author: 'PrintLab Amsterdam Engineering',
      license: 'Commercial Production License (Included)',
      isNonCommercial: false,
      dimensions: item.dimensions,
      volumeCm3: item.volumeCm3,
    });

    setModelGeometry(
      `${item.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()}.stl`,
      geometry,
      item.dimensions,
      item.volumeCm3,
      matchedPreset.id
    );

    router.push('/have-3d-file');
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div>
        <Link
          href="/have-idea-or-photo"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors mb-4 cursor-pointer font-label-mono-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>&larr; Back to Sourcing Options</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Pre-Approved Commercial Prints</span>
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight font-display">
              Popular Utility Catalog
            </h1>
            <p className="text-sm text-slate-600 font-body-md">
              High-demand daily utility items with pre-calculated print dimensions, verified watertight meshes, and instant 1-day delivery in Amsterdam &amp; the Netherlands.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-label-mono-xs ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-level-2 transition-all flex flex-col justify-between overflow-hidden shadow-xs"
          >
            <div>
              {/* Image */}
              <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-700 text-white font-label-mono-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase font-label-mono-xs">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-label-mono">
                    From €{item.basePriceEur.toFixed(2)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-label-mono-xs">
                  <div className="flex items-center gap-1">
                    <Box className="w-3 h-3 text-slate-400" />
                    <span>{item.dimensions.x}×{item.dimensions.y}×{item.dimensions.z}mm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>~{item.printTimeHours}h print</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-4 pt-0">
              <button
                onClick={() => handleSelectCatalogItem(item)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-primary text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configure &amp; Print &rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
