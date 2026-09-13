'use client';

import React, { useState } from 'react';
import { ThingiverseItem, ThingiverseFile } from '@/types/modelSources';
import {
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Download,
  Heart,
  FileCode,
  Layers,
  Box,
  Settings2,
  CheckCircle2,
  Sliders,
  Info,
} from 'lucide-react';

interface Props {
  item: ThingiverseItem | null;
  onClose: () => void;
  onSlice: (item: ThingiverseItem, selectedFile?: ThingiverseFile) => void;
}

export default function ThingiverseInspectionModal({ item, onClose, onSlice }: Props) {
  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : [item.thumbnail];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<ThingiverseFile | undefined>(
    item.files && item.files.length > 0 ? item.files[0] : undefined
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-outline-variant shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded bg-blue-600 text-white font-label-mono-xs shadow-xs">
              Thing #{item.id}
            </span>
            {item.category && (
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded bg-slate-200/80 text-slate-800 font-label-mono-xs">
                {item.category}
              </span>
            )}
            <span className="text-xs text-slate-400 font-label-mono-xs hidden sm:inline">
              &bull; Official Thingiverse Model
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Images & 3D Specs) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="w-full h-72 sm:h-80 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 relative group">
                <img
                  src={images[activeImageIndex]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="text-[11px] font-bold bg-slate-900/80 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs font-label-mono-xs">
                    Image {activeImageIndex + 1} of {images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Carousel */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-primary ring-2 ring-primary/20 scale-105'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Dimensions Card */}
              {item.defaultDimensions && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-label-mono-xs uppercase block">Width (X)</span>
                    <strong className="text-slate-800 font-label-mono">{item.defaultDimensions.x} mm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-label-mono-xs uppercase block">Depth (Y)</span>
                    <strong className="text-slate-800 font-label-mono">{item.defaultDimensions.y} mm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-label-mono-xs uppercase block">Height (Z)</span>
                    <strong className="text-slate-800 font-label-mono">{item.defaultDimensions.z} mm</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Details, License, Print Recipe, Files) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display leading-snug">
                  {item.name}
                </h2>
                <div className="flex items-center gap-3 pt-1.5 text-xs text-slate-500">
                  <span>
                    Created by{' '}
                    <a
                      href={item.creator.url || `https://www.thingiverse.com/${item.creator.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline"
                    >
                      @{item.creator.name}
                    </a>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{(item.downloads || 0).toLocaleString()}</strong> downloads
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-rose-600">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <strong>{(item.likes || 0).toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              {/* License Verification Card */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  item.isNonCommercial
                    ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                }`}
              >
                {item.isNonCommercial ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 text-xs">
                  <div className="font-bold flex items-center gap-2">
                    <span>{item.isNonCommercial ? 'Personal Use Only (CC-BY-NC)' : 'Commercial Use Permitted'}</span>
                    <span className="text-[10px] font-label-mono font-normal opacity-80">({item.license})</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {item.isNonCommercial
                      ? 'The designer specified a Non-Commercial Creative Commons license. Free to print for personal prototypes, testing, or home use.'
                      : 'This model allows commercial production and distribution with standard creator attribution.'}
                  </p>
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <div className="space-y-1 text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 font-label-mono-xs block">
                    Model Description:
                  </span>
                  <p>{item.description}</p>
                </div>
              )}

              {/* Recommended Print Settings (From Community Makes) */}
              {item.printSettings && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase text-blue-900 font-label-mono-xs flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>Recommended Production Recipe (Community Verified):</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-400 block font-label-mono-xs">Material</span>
                      <strong className="text-blue-900 font-label-mono">{item.printSettings.recommendedMaterial}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-400 block font-label-mono-xs">Infill %</span>
                      <strong className="text-blue-900 font-label-mono">{item.printSettings.recommendedInfillPercent}%</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-400 block font-label-mono-xs">Layer Height</span>
                      <strong className="text-blue-900 font-label-mono">{item.printSettings.layerHeightMm}mm</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-400 block font-label-mono-xs">Supports</span>
                      <strong className="text-blue-900 font-label-mono">
                        {item.printSettings.supportsRequired ? 'Required' : 'None'}
                      </strong>
                    </div>
                  </div>
                  {item.instructions && (
                    <p className="text-[11px] text-blue-800/90 pt-1 leading-relaxed">
                      💡 <em>Tip: {item.instructions}</em>
                    </p>
                  )}
                </div>
              )}

              {/* Files Included In This Model */}
              {item.files && item.files.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 font-label-mono-xs uppercase flex items-center justify-between">
                    <span>Available Model Files ({item.files.length}):</span>
                    <span className="text-[10px] font-normal text-slate-400">Select file to slice</span>
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {item.files.map((file, idx) => {
                      const isSelected = selectedFile?.name === file.name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-slate-900 font-semibold ring-1 ring-primary'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileCode className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-label-mono-xs">
                              {file.format}
                            </span>
                            {file.sizeBytes && (
                              <span className="text-[10px] text-slate-400 font-label-mono-xs">
                                {(file.sizeBytes / 1000000).toFixed(1)}MB
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Listing on Thingiverse.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onSlice(item, selectedFile)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load into 3D Slicer &amp; Print &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
