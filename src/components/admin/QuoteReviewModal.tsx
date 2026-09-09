'use client';

import React, { useState } from 'react';
import { CustomerOrder, DesignRequestQuote } from '@/types';
import { useAppStore } from '@/lib/store';
import { formatEur } from '@/lib/pricing';
import {
  X,
  PenTool,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  AlertCircle,
} from 'lucide-react';

interface Props {
  order: CustomerOrder;
  onClose: () => void;
}

export default function QuoteReviewModal({ order, onClose }: Props) {
  const { updateCadQuotePrice } = useAppStore();
  const details = order.details as DesignRequestQuote;

  const [priceInput, setPriceInput] = useState<number>(details.quotedPriceEur || 85.0);
  const [engineerNotes, setEngineerNotes] = useState<string>(
    details.engineerNotes ||
      'SolidWorks parametric model created with 0.2mm mechanical clearance for assembly. Recommended print material: Tough PETG.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSaveAndSendQuote = () => {
    updateCadQuotePrice(order.id, priceInput, engineerNotes);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Engineer CAD Review: {order.id}
              </h3>
              <p className="text-[11px] text-slate-400">
                1-Business-Day Engineering Assessment &amp; Quote Locking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Customer & Submission details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-500 text-[10px] block font-semibold">CUSTOMER</span>
              <span className="text-white font-bold">{order.customer.fullName}</span>
              <div className="text-slate-400 text-[11px]">{order.customer.email}</div>
              <div className="text-slate-400 text-[11px]">
                {order.customer.city} • {order.customer.isStudent ? 'Student Discount Eligible' : 'Standard Rate'}
              </div>
            </div>

            <div>
              <span className="text-slate-500 text-[10px] block font-semibold">ESTIMATED TIER</span>
              <span className="text-amber-400 font-bold">{details.estimatedComplexity}</span>
              <div className="text-slate-400 text-[11px]">
                Target Dimensions: {details.targetDimensions.x}×{details.targetDimensions.y}×{details.targetDimensions.z} mm
              </div>
              <div className="text-slate-400 text-[11px]">
                End Use: {details.intendedUse || 'General'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="text-slate-400 font-semibold block">Customer Functional Description:</span>
            <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
              {details.description}
            </p>
          </div>

          {/* Functional Requirements */}
          {details.functionalRequirements && (
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold block">Tolerances &amp; Mechanical Requirements:</span>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                {details.functionalRequirements}
              </p>
            </div>
          )}

          {/* Reference Images List */}
          {details.referenceImages && details.referenceImages.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-slate-400 font-semibold block">Submitted Reference Files:</span>
              <div className="flex flex-wrap gap-2">
                {details.referenceImages.map((img, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 text-[11px]"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    {img}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Engineer Pricing & Notes inputs */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Engineering Assessment &amp; Locked Price Quote</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Fixed Quoted CAD + Print Price (€ EUR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono">€</span>
                  <input
                    type="number"
                    step="5"
                    value={priceInput}
                    onChange={(e) => setPriceInput(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Estimated Turnaround</label>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>1–2 Business Days</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Engineering Feasibility Notes (Sent to Customer)
              </label>
              <textarea
                value={engineerNotes}
                onChange={(e) => setEngineerNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-slate-200 focus:border-amber-500 outline-none text-xs"
              />
            </div>
          </div>

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Locked quote generated and simulated customer email notification sent!</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
            >
              Close
            </button>

            <button
              onClick={handleSaveAndSendQuote}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Approve &amp; Send 1-Day Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
