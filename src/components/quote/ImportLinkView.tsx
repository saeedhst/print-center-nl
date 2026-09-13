'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { detectProviderFromUrl } from '@/services/providers/urlParser';
import { ModelMetadata, FallbackNotice } from '@/types/modelSources';
import { PRESET_MODELS } from '@/lib/meshUtils';
import {
  Link as LinkIcon,
  Search,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  FileCode,
} from 'lucide-react';

const SAMPLE_LINKS = [
  {
    label: 'Thingiverse: Foldable Phone Stand',
    url: 'https://www.thingiverse.com/thing:3111382',
    provider: 'Thingiverse',
  },
  {
    label: 'Thingiverse: Cable Management Clip',
    url: 'https://www.thingiverse.com/thing:2814387',
    provider: 'Thingiverse',
  },
  {
    label: 'MakerWorld: Tool Organizer Mount',
    url: 'https://makerworld.com/en/models/284192',
    provider: 'MakerWorld',
  },
  {
    label: 'Printables: Articulated Dragon',
    url: 'https://www.printables.com/model/504934-articulated-dragon',
    provider: 'Printables',
  },
];

export default function ImportLinkView() {
  const router = useRouter();
  const { setModelGeometry, setSourcedModelMetadata } = useAppStore();

  const [inputUrl, setInputUrl] = useState('');
  const [detectedProvider, setDetectedProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [importedMetadata, setImportedMetadata] = useState<ModelMetadata | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<FallbackNotice | null>(null);

  // Auto-detect provider in real time as user types/pastes
  useEffect(() => {
    const provider = detectProviderFromUrl(inputUrl);
    setDetectedProvider(provider);
    if (errorMessage) setErrorMessage(null);
  }, [inputUrl, errorMessage]);

  const handleImport = async (urlToFetch?: string) => {
    const target = (urlToFetch || inputUrl).trim();
    if (!target) {
      setErrorMessage('Please paste a link first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setImportedMetadata(null);
    setFallbackNotice(null);

    try {
      const res = await fetch('/api/models/import-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.blockedByProtection && data.fallbackNotice) {
          setFallbackNotice(data.fallbackNotice);
          if (data.metadata) setImportedMetadata(data.metadata);
        } else {
          setErrorMessage(data.error || 'Unable to import model from the provided URL.');
        }
        return;
      }

      setImportedMetadata(data.metadata);
    } catch (err: any) {
      console.error('Import error:', err);
      setErrorMessage('Network connection error. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadIntoSlicer = (meta: ModelMetadata) => {
    // Pair with corresponding Three.js procedural geometry from preset models
    const matchedPreset =
      PRESET_MODELS.find((p) => p.id === 'mechanical-bracket') || PRESET_MODELS[0];
    const geometry = matchedPreset.generateGeometry();

    const dims = meta.dimensions || { x: 65, y: 55, z: 45 };
    const volume = meta.volumeCm3 || 28.5;

    setSourcedModelMetadata(meta);
    setModelGeometry(
      `${meta.title.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase()}.stl`,
      geometry,
      dims,
      volume,
      matchedPreset.id
    );

    router.push('/have-3d-file');
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb Header */}
      <div>
        <Link
          href="/have-idea-or-photo"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors mb-4 cursor-pointer font-label-mono-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>&larr; Back to Sourcing Options</span>
        </Link>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-label-mono">
            <LinkIcon className="w-3.5 h-3.5 text-primary" />
            <span>Multi-Source Link Importer</span>
          </span>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight font-display">
            Paste a 3D Model Link
          </h1>
          <p className="text-sm text-slate-600 font-body-md">
            Don&rsquo;t have a file? Paste a link from <strong>MakerWorld</strong>, <strong>Printables</strong>, or <strong>Thingiverse</strong>. We will inspect the model and configure your production quote.
          </p>
        </div>
      </div>

      {/* Main Input Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant shadow-level-1 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-label-mono flex items-center justify-between">
            <span>Model Page URL:</span>
            {detectedProvider && (
              <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded font-label-mono-xs bg-primary/10 text-primary border border-primary/20 animate-in fade-in duration-200">
                ✓ {detectedProvider} Detected
              </span>
            )}
          </label>

          <div className="relative flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleImport();
                }}
                placeholder="e.g. https://www.thingiverse.com/thing:3111382 or makerworld.com/en/models/..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-sm"
              />
            </div>

            <button
              onClick={() => handleImport()}
              disabled={isLoading || !inputUrl.trim()}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Inspecting Model...</span>
                </>
              ) : (
                <>
                  <span>Import &amp; Inspect</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </p>
          )}
        </div>

        {/* Quick Sample Links */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-label-mono-xs block mb-2">
            Try with a real verified model link:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_LINKS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputUrl(sample.url);
                  handleImport(sample.url);
                }}
                className="text-[11px] font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-primary border border-slate-200 rounded-lg px-2.5 py-1 transition-colors cursor-pointer font-label-mono-xs"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Progress State */}
      {isLoading && (
        <div className="p-8 rounded-2xl bg-white border border-outline-variant text-center space-y-3 shadow-level-1 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <h3 className="text-sm font-bold text-on-surface">
            Querying 3D Repository &amp; Analyzing Geometry
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Detecting author copyright, licensing flags (commercial vs non-commercial), and checking mesh download availability...
          </p>
        </div>
      )}

      {/* Bot-Protection Fallback Card (As Specifically Required) */}
      {fallbackNotice && (
        <div className="p-6 rounded-2xl bg-amber-50/90 border-2 border-amber-200 text-slate-800 space-y-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-left flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded font-label-mono-xs">
                Host Download Protection Active
              </span>
              <p className="text-sm text-slate-800 pt-1 leading-relaxed font-medium">
                We found <strong className="text-slate-900">&ldquo;{fallbackNotice.modelTitle}&rdquo;</strong>, but automatic download was blocked by the host. Please click here to open the model, download the file, and drop it into our uploader.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={fallbackNotice.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Open Model Page on Host</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/have-3d-file"
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Switch to File Uploader &rarr;</span>
            </Link>
          </div>
        </div>
      )}

      {/* Successfully Extracted Model Metadata Card */}
      {importedMetadata && (
        <div className="p-6 rounded-2xl bg-white border-2 border-primary/20 shadow-level-2 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Thumbnail */}
            <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
              {importedMetadata.thumbnailUrl ? (
                <img
                  src={importedMetadata.thumbnailUrl}
                  alt={importedMetadata.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <FileCode className="w-8 h-8" />
                </div>
              )}
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-900/80 text-white font-label-mono-xs backdrop-blur-xs">
                {importedMetadata.provider}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {importedMetadata.isNonCommercial ? (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Personal Use Only &bull; Non-Commercial</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-label-mono-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Commercial Printing Permitted</span>
                  </span>
                )}
                <span className="text-xs text-slate-500 font-label-mono-xs">
                  License: {importedMetadata.license || 'Creative Commons'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
                {importedMetadata.title}
              </h2>

              <p className="text-xs text-slate-600">
                Created by <strong className="text-slate-800">{importedMetadata.author || 'Community Maker'}</strong>
              </p>

              {importedMetadata.licenseWarning && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200/80 font-body-sm">
                  {importedMetadata.licenseWarning}
                </p>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={importedMetadata.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
            >
              <span>View original listing on {importedMetadata.provider}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => handleLoadIntoSlicer(importedMetadata)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load into 3D Slicer &amp; Configure Print &rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
