'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ThingiverseItem } from '@/types/modelSources';
import { PRESET_MODELS } from '@/lib/meshUtils';
import {
  Search,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Download,
  Heart,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  SlidersHorizontal,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Desk & Office',
  'Tools & Workshop',
  'Tech & Gadgets',
  'Home & Living',
  'Benchmarks',
  'Toys & Miniatures',
];

export default function ThingiverseGalleryView() {
  const router = useRouter();
  const { setModelGeometry, setSourcedModelMetadata } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState<ThingiverseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchItems = async (query = '', category = 'All') => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (category !== 'All') params.set('category', category);

      const res = await fetch(`/api/models/search-thingiverse?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load Thingiverse gallery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(searchQuery, activeCategory);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  const handleSelectModel = (item: ThingiverseItem) => {
    // Select matching procedural Three.js geometry from preset library
    const matchedPreset =
      PRESET_MODELS.find((p) => p.id === item.presetId) ||
      PRESET_MODELS[0];

    const geometry = matchedPreset.generateGeometry();
    const dims = item.defaultDimensions || { x: 75, y: 65, z: 50 };
    const volume = 32.5;

    setSourcedModelMetadata({
      id: `tv-${item.id}`,
      title: item.name,
      provider: 'thingiverse',
      originalUrl: item.url,
      thumbnailUrl: item.thumbnail,
      author: item.creator.name,
      license: item.license,
      isNonCommercial: item.isNonCommercial,
      licenseWarning: item.isNonCommercial
        ? 'Thingiverse author marked this design as Non-Commercial.'
        : undefined,
      dimensions: dims,
      volumeCm3: volume,
    });

    setModelGeometry(
      `${item.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()}.stl`,
      geometry,
      dims,
      volume,
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
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Thingiverse Open Hardware</span>
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight font-display">
              Popular 3D Prints &amp; Search
            </h1>
            <p className="text-sm text-slate-600 font-body-md">
              Explore trending open-source models from{' '}
              <a
                href="https://www.thingiverse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-semibold hover:text-primary/80"
              >
                Thingiverse.com
              </a>{' '}
              with instant 1-click slicing and next-day Dutch delivery.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-label-mono-xs shrink-0 self-start sm:self-auto">
            Showing {items.length} items {totalCount > 0 && `of ${totalCount}`}
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-5 rounded-2xl bg-white border border-outline-variant shadow-level-1 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs: e.g. 'phone stand', 'cable clip', 'headphone', 'benchy'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 font-label-mono-xs mr-1 hidden sm:inline">
            Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-label-mono-xs ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Models */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs text-slate-500 font-label-mono-xs">
            Loading Thingiverse models...
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-outline-variant text-center space-y-3">
          <p className="text-sm font-bold text-slate-700">
            No models found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-xs text-slate-500">
            Try searching for &ldquo;phone stand&rdquo;, &ldquo;cable clip&rdquo;, or click &ldquo;All&rdquo; to reset.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-level-2 transition-all flex flex-col justify-between overflow-hidden shadow-xs"
            >
              <div>
                {/* Thumbnail */}
                <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600/90 text-white font-label-mono-xs backdrop-blur-xs">
                      Thingiverse
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900/70 text-white font-label-mono-xs backdrop-blur-xs">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    {item.isNonCommercial ? (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Non-Commercial</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        <span>Commercial OK</span>
                      </span>
                    )}

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-label-mono-xs">
                      {item.downloads && (
                        <span className="flex items-center gap-0.5">
                          <Download className="w-2.5 h-2.5" />
                          {item.downloads.toLocaleString()}
                        </span>
                      )}
                      {item.likes && (
                        <span className="flex items-center gap-0.5">
                          <Heart className="w-2.5 h-2.5 text-red-500" />
                          {item.likes.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-slate-500">
                    By <span className="font-semibold text-slate-700">{item.creator.name}</span>
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleSelectModel(item)}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configure &amp; Print &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
