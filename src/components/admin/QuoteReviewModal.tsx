'use client';

import React, { useState } from 'react';
import { CustomerOrder, DesignRequestQuote } from '@/types';
import { useAppStore } from '@/lib/store';
import { formatEur } from '@/lib/pricing';
import {
  X,
  PenTool,
  CheckCircle2,
  FileText,
  Clock,
  Send,
} from 'lucide-react';

interface Props {
  order: CustomerOrder;
  onClose: () => void;
}

export default function QuoteReviewModal({ order, onClose }: Props) {
  const { updateCadQuotePrice } = useAppStore();
  const details = order.details as DesignRequestQuote;

  const [priceInput, setPriceInput] = useState<number>(details.quotedPriceEur || 48.0);
  const [engineerNotes, setEngineerNotes] = useState<string>(
    details.engineerNotes ||
      'CAD modeled in SolidWorks with 0.15mm snap-fit tolerance. Recommended print material: Tough PETG.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSaveAndSendQuote = () => {
    updateCadQuotePrice(order.id, priceInput, engineerNotes);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                CAD Review &amp; 1-Day Quote: {order.id}
              </h3>
              <p className="text-[11px] text-slate-500">
                Customer: {order.customer.fullName} ({order.customer.city})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Dimensions:</span>
              <strong className="text-slate-900 font-mono">
                {details.targetDimensions.x}&times;{details.targetDimensions.y}&times;{details.targetDimensions.z} mm
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Description:</span>
              <p className="text-slate-800 leading-relaxed font-medium">{details.description}</p>
            </div>
            {details.customerNotes && (
              <div>
                <span className="text-slate-500 block mb-0.5">Customer Notes:</span>
                <p className="text-slate-700">{details.customerNotes}</p>
              </div>
            )}
          </div>

          {/* Pricing input */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Fixed Quoted CAD + Print Price (€ EUR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-mono">€</span>
                <input
                  type="number"
                  step="5"
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded bg-surface-container-low border border-outline-variant text-on-surface font-label-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Engineering Notes for Customer
              </label>
              <textarea
                value={engineerNotes}
                onChange={(e) => setEngineerNotes(e.target.value)}
                rows={2}
                className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs"
              />
            </div>
          </div>

          {isSuccess && (
            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Quote locked and email notification simulated to {order.customer.email}!</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-slate-600 hover:text-on-surface font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAndSendQuote}
              className="px-5 py-2.5 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-xs flex items-center gap-2 shadow-level-1 cursor-pointer"
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
