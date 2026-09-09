'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import FileUploadDropzone from './FileUploadDropzone';
import ModelViewer3D from './ModelViewer3D';
import ConfigPanel from './ConfigPanel';
import PriceBreakdownCard from './PriceBreakdownCard';
import CadDesignIntake from './CadDesignIntake';
import CustomerCheckoutModal from './CustomerCheckoutModal';
import OrderSuccessModal from './OrderSuccessModal';
import { UploadCloud, PenTool, Sparkles } from 'lucide-react';

export default function QuoteWizard() {
  const { orderType, setOrderType } = useAppStore();

  return (
    <div id="quote-wizard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Wizard Path Switcher */}
      <div className="flex flex-col items-center justify-center text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Interactive Quotation System</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Configure Your Print or Engineering Request
        </h2>
        <p className="text-sm text-slate-400 max-w-xl">
          Choose whether you have a print-ready 3D file or need our industrial CAD engineers to design your model.
        </p>

        {/* Dual Path Selector */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl max-w-xl w-full">
          <button
            type="button"
            onClick={() => setOrderType('DIRECT_PRINT')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              orderType === 'DIRECT_PRINT'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Path A: Ready 3D File (.STL/.OBJ)</span>
          </button>

          <button
            type="button"
            onClick={() => setOrderType('DESIGN_AND_PRINT')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              orderType === 'DESIGN_AND_PRINT'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Path B: Need CAD Design</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      {orderType === 'DIRECT_PRINT' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dropzone + 3D Viewport + Config Panel */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <FileUploadDropzone />
            <ModelViewer3D />
            <ConfigPanel />
          </div>

          {/* Right Column: Live Price Breakdown Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <PriceBreakdownCard />
          </div>
        </div>
      ) : (
        /* Path B: CAD Design Intake */
        <CadDesignIntake />
      )}

      {/* Modals */}
      <CustomerCheckoutModal />
      <OrderSuccessModal />
    </div>
  );
}
