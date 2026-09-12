'use client';

import React, { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  parseStlBuffer,
  calculateGeometryVolumeCm3,
  getBoundingBoxDimensions,
  PRESET_MODELS,
} from '@/lib/meshUtils';
import { UploadCloud, CheckCircle2, Sparkles, AlertCircle, Loader2, FileCheck, Layers } from 'lucide-react';

export default function FileUploadDropzone() {
  const {
    setModelGeometry,
    fileName,
    selectedPresetId,
    priceBreakdown,
  } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);
    const validExtensions = ['.stl', '.obj', '.3mf'];
    const lowerName = file.name.toLowerCase();
    const hasValidExt = validExtensions.some((ext) => lowerName.endsWith(ext));

    if (!hasValidExt) {
      setErrorMessage('Please upload a valid 3D file (.STL, .OBJ, or .3MF).');
      return;
    }

    try {
      setIsLoadingFile(true);
      const arrayBuffer = await file.arrayBuffer();

      const geometry = await parseStlBuffer(arrayBuffer);
      const dims = getBoundingBoxDimensions(geometry);
      const volume = calculateGeometryVolumeCm3(geometry);

      setModelGeometry(file.name, geometry, dims, volume, null);
    } catch (err) {
      console.error('Failed to parse 3D file:', err);
      setErrorMessage('Unable to parse file geometry. Please ensure it is a valid binary or ASCII STL file.');
    } finally {
      setIsLoadingFile(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESET_MODELS.find((p) => p.id === presetId);
    if (!preset) return;

    setIsLoadingFile(true);
    setTimeout(() => {
      const geometry = preset.generateGeometry();
      const dims = getBoundingBoxDimensions(geometry);
      const volume = calculateGeometryVolumeCm3(geometry);

      setModelGeometry(preset.fileName, geometry, dims, volume, preset.id);
      setIsLoadingFile(false);
    }, 120);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all bg-white ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.005]'
            : 'border-outline hover:border-primary hover:bg-slate-50/70 shadow-level-1'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".stl,.obj,.3mf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            {isLoadingFile ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-on-surface">
              Drag &amp; drop your CAD or 3D mesh here, or <span className="text-primary underline font-semibold">browse local files</span>
            </p>
            <div className="flex items-center justify-center gap-1.5 font-label-mono-xs text-xs text-slate-500 mt-1.5">
              <span>SUPPORTED FORMATS:</span>
              <span className="font-bold text-on-surface bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">.STL</span>
              <span className="font-bold text-on-surface bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">.OBJ</span>
              <span className="font-bold text-on-surface bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">.3MF</span>
              <span className="text-slate-400 font-normal">(Up to 100MB)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-label-mono-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct In-Browser Inspection
            </span>
            <span>&bull;</span>
            <span className="text-slate-600">
              Automated Watertight &amp; Slicing Analysis
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 justify-center">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Benchmark Sample Model Selector */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-on-surface flex items-center gap-1.5 font-label-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Or test with a benchmark 3D sample:
          </span>
          <span className="text-[11px] font-label-mono-xs text-slate-400">
            Instant load &bull; Zero upload needed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_MODELS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePresetSelect(preset.id);
                }}
                className={`p-2.5 rounded text-left border transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-on-surface shadow-xs ring-1 ring-primary'
                    : 'bg-white border-outline-variant text-on-surface hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-on-surface truncate">{preset.name.split(' (')[0]}</div>
                <div className="text-[10px] font-label-mono-xs text-slate-500 mt-0.5">{preset.tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
