'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ThingiverseItem, ThingiverseFile } from '@/types/modelSources';
import { PRESET_MODELS } from '@/lib/meshUtils';
import ThingiverseInspectionModal from './ThingiverseInspectionModal';
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
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  FileCode,
  Check,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Benchmarks',
  'Desk & Office',
  'Tools & Workshop',
  'Tech & Gadgets',
  'Home & Living',
  'Toys & Miniatures',
];

const QUICK_TRENDING_CHIPS = [
  { label: '#3DBenchy', query: 'benchy' },
  { label: 'Phone Stand', query: 'phone stand' },
  { label: 'Cali Cat', query: 'cali cat' },
  { label: 'Gridfinity', query: 'gridfinity' },
  { label: 'Cable Clip', query: 'cable' },
  { label: 'Flexi Rex', query: 'flexi-rex' },
  { label: 'Headphone Mount', query: 'headphone' },
  { label: 'Raspberry Pi', query: 'raspberry pi' },
];

export default function ThingiverseGalleryView() {
  const router = useRouter();
  const { setModelGeometry, setSourcedModelMetadata, setMaterial } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'downloads' | 'likes'>('popular');
  const [commercialOnly, setCommercialOnly] = useState(false);
  const [items, setItems] = useState<ThingiverseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Selected item for inspection modal
  const [inspectingItem, setInspectingItem] = useState<ThingiverseItem | null>(null);

  const fetchItems = async (
    query = '',
    category = 'All',
    sort = 'popular',
    commOnly = false
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (category !== 'All') params.set('category', category);
      params.set('sort', sort);
      if (commOnly) params.set('commercialOnly', 'true');

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
      fetchItems(searchQuery, activeCategory, sortBy, commercialOnly);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, sortBy, commercialOnly]);

  const handleSelectModel = (item: ThingiverseItem, selectedFile?: ThingiverseFile) => {
    // Select matching procedural Three.js geometry from preset library
    const matchedPreset =
      PRESET_MODELS.find((p) => p.id === item.presetId) ||
      PRESET_MODELS[0];

    const geometry = matchedPreset.generateGeometry();
    const dims = item.defaultDimensions || { x: 75, y: 65, z: 50 };
    const volume = 32.5;

    // If item recommends PETG, configure store material
    if (item.printSettings?.recommendedMaterial === 'PETG') {
      setMaterial('PETG');
    } else {
      setMaterial('STANDARD');
    }

    const resolvedFileName = selectedFile
      ? selectedFile.name
      : `${item.name.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()}.stl`;

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
        ? 'Thingiverse author tagged this design as Non-Commercial (personal use).'
        : undefined,
      fileName: resolvedFileName,
      dimensions: dims,
      volumeCm3: volume,
    });

    setModelGeometry(
      resolvedFileName,
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
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Thingiverse.com Explorer</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-label-mono-xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Multi-Angle Preview &amp; Direct Slicing</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight font-display">
              Popular 3D Prints on Thingiverse
            </h1>
            <p className="text-sm text-slate-600 font-body-md max-w-2xl">
              Showing top trending and all-time popular community designs from{' '}
              <a
                href="https://www.thingiverse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-semibold hover:text-primary/80 inline-flex items-center gap-0.5"
              >
                <span>Thingiverse.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
              Inspect multiple photos, files, print recipes, or load straight into our 3D slicer for instant Dutch delivery.
            </p>
          </div>

          <div className="text-right shrink-0 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-label-mono-xs block">
              Showing {items.length} designs {commercialOnly && '(Commercial Only)'}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-outline-variant shadow-level-1 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Thingiverse: e.g. 'phone stand', 'benchy', 'cable clip', 'gridfinity', or Thing ID #..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls Right Side (Sort + Commercial Filter) */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Commercial Filter Toggle */}
            <button
              onClick={() => setCommercialOnly(!commercialOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                commercialOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  commercialOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {commercialOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commercial License Only</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 font-label-mono-xs text-xs">
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'popular'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Popular</span>
              </button>
              <button
                onClick={() => setSortBy('downloads')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'downloads'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Downloads</span>
              </button>
              <button
                onClick={() => setSortBy('likes')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  sortBy === 'likes'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Likes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Trending Keyword Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase font-label-mono-xs mr-1">
            Trending:
          </span>
          {QUICK_TRENDING_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip.query)}
              className="text-[11px] font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-primary border border-slate-200 rounded-lg px-2.5 py-0.5 transition-colors cursor-pointer font-label-mono-xs"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 font-label-mono-xs mr-1 hidden sm:inline">
            Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-label-mono-xs ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
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
        <div className="py-24 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs text-slate-500 font-label-mono-xs">
            Syncing models from Thingiverse...
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-outline-variant text-center space-y-3 shadow-xs">
          <p className="text-sm font-bold text-slate-800">
            No designs found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for &ldquo;phone stand&rdquo;, &ldquo;benchy&rdquo;, or &ldquo;cali cat&rdquo;, or reset the commercial license filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
              setCommercialOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold transition-all cursor-pointer"
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
                {/* Thumbnail with overlay badges */}
                <div
                  className="h-48 w-full bg-slate-100 overflow-hidden relative cursor-pointer"
                  onClick={() => setInspectingItem(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600 text-white font-label-mono-xs shadow-xs">
                      Thing #{item.id}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-white font-label-mono-xs backdrop-blur-xs">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Multi-photo badge */}
                  {item.images && item.images.length > 1 && (
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white font-label-mono-xs backdrop-blur-xs flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" />
                      <span>{item.images.length} photos</span>
                    </span>
                  )}

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Open on Thingiverse.com"
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {item.isNonCommercial ? (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Personal Use (CC-BY-NC)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        <span>Commercial OK</span>
                      </span>
                    )}

                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-label-mono-xs">
                      {item.downloads && (
                        <span className="flex items-center gap-0.5" title={`${item.downloads} downloads`}>
                          <Download className="w-3 h-3 text-slate-400" />
                          <span>{(item.downloads / 1000).toFixed(0)}k</span>
                        </span>
                      )}
                      {item.likes && (
                        <span className="flex items-center gap-0.5 text-rose-600" title={`${item.likes} likes`}>
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>{(item.likes / 1000).toFixed(0)}k</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    onClick={() => setInspectingItem(item)}
                    className="text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  {/* Print settings tags pill */}
                  {item.printSettings && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-label-mono-xs">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                        {item.printSettings.recommendedMaterial}
                      </span>
                      <span>&bull;</span>
                      <span>{item.printSettings.recommendedInfillPercent}% infill</span>
                      {item.files && (
                        <>
                          <span>&bull;</span>
                          <span className="text-slate-400">{item.files.length} file{item.files.length > 1 ? 's' : ''}</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <a
                      href={item.creator.url || `https://www.thingiverse.com/${item.creator.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-slate-800 flex items-center gap-1 text-[11px]"
                    >
                      <span>by</span>
                      <strong className="text-slate-700">@{item.creator.name}</strong>
                    </a>
                    <button
                      onClick={() => setInspectingItem(item)}
                      className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setInspectingItem(item)}
                  title="Inspect Photos & Files"
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSelectModel(item)}
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configure &amp; 3D Slice &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Model Inspection Modal */}
      <ThingiverseInspectionModal
        item={inspectingItem}
        onClose={() => setInspectingItem(null)}
        onSlice={(item, file) => {
          setInspectingItem(null);
          handleSelectModel(item, file);
        }}
      />
    </div>
  );
}
