'use client';

import React, { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  parseStlBuffer,
  calculateGeometryVolumeCm3,
  getBoundingBoxDimensions,
  PRESET_MODELS,
} from '@/lib/meshUtils';
import { UploadCloud, FileText, CheckCircle, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export default function FileUploadDropzone() {
  const {
    setModelGeometry,
    fileName,
    selectedPresetId,
    dimensions,
    volumeCm3,
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

      // Parse STL geometry directly in browser
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
    }, 150);
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
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-orange-500 bg-orange-500/10 scale-[1.01]'
            : 'border-slate-700/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-600'
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
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shadow-inner">
            {isLoadingFile ? (
              <Loader2 className="w-6 h-6 animate-spin text-orange-400" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Drop your 3D model here or <span className="text-orange-400 underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports <strong>.STL</strong>, <strong>.OBJ</strong>, and <strong>.3MF</strong> (Max 100MB)
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" /> Client-Side Slicing Analysis
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              Instant mm &amp; cm³ extraction
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 justify-center">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Preset sample model quick-selector */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Don&apos;t have a file ready? Load a real Dutch sample model:
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
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-orange-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="font-semibold text-white truncate">{preset.name.split(' (')[0]}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{preset.tag}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
