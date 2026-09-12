'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, Clock, Truck, ArrowRight, Box, ShieldCheck } from 'lucide-react';
import { formatEur } from '@/lib/pricing';

export default function OrderConfirmationView() {
  const { lastSubmittedOrder, setActiveView } = useAppStore();

  if (!lastSubmittedOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">No active order found.</p>
        <button
          onClick={() => setActiveView('landing')}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const isDirect = lastSubmittedOrder.type === 'DIRECT_PRINT';

  return (
    <div className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-card text-center space-y-6">
        {/* Checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-3">
            {isDirect ? 'Order Confirmed & Queued' : 'CAD Request Submitted'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isDirect ? 'We&apos;re Printing Your Model!' : 'We Received Your Design Request!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            {isDirect
              ? 'Your 3D model geometry has been parsed and sent to our local print fleet. Dispatched within 1 working day.'
              : 'Our engineering team is reviewing your dimensions and photos. You will receive a locked price quote within 1 business day.'}
          </p>
        </div>

        {/* Details card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-500">Order Reference:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              {lastSubmittedOrder.id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Customer Name:</span>
            <span className="font-semibold text-slate-900">{lastSubmittedOrder.customer.fullName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Email Address:</span>
            <span className="font-semibold text-slate-900">{lastSubmittedOrder.customer.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-slate-900">
              {lastSubmittedOrder.customer.city} ({lastSubmittedOrder.customer.address})
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <span className="text-slate-500">Target Delivery:</span>
            <span className="font-bold text-primary flex items-center gap-1 font-label-mono-xs">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Dispatched in 1 Working Day
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setActiveView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>View in Orders Queue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
