'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatEur } from '@/lib/pricing';
import { CheckCircle2, Clock, Truck, ArrowRight, ShieldCheck, Box, UserCheck } from 'lucide-react';

export default function OrderSuccessModal() {
  const { lastSubmittedOrder, setLastSubmittedOrder, setActiveTab } = useAppStore();

  if (!lastSubmittedOrder) return null;

  const isDirect = lastSubmittedOrder.type === 'DIRECT_PRINT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            {isDirect ? 'Order Confirmed & Sliced!' : 'CAD Request Submitted!'}
          </h3>

          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            {isDirect
              ? 'Your 3D model geometry has been parsed and queued in our Randstad production fleet.'
              : 'Our engineering team in Amsterdam/Utrecht is reviewing your CAD specifications. Locked quote will arrive within 1 business day.'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Order Reference:</span>
            <span className="font-mono font-bold text-orange-400 text-sm">
              {lastSubmittedOrder.id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Customer Name:</span>
            <span className="text-white font-semibold">{lastSubmittedOrder.customer.fullName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">City / Delivery Zone:</span>
            <span className="text-white font-semibold">
              {lastSubmittedOrder.customer.city} ({lastSubmittedOrder.customer.address})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Service Type:</span>
            <span className="text-white font-semibold">
              {isDirect ? 'Direct 3D Print (STL/OBJ)' : 'Custom CAD Engineering & Print'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-slate-400">Status:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              {lastSubmittedOrder.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              setLastSubmittedOrder(null);
              setActiveTab('admin');
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Track in Admin Order Queue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setLastSubmittedOrder(null)}
            className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
          >
            Submit Another Quote
          </button>
        </div>
      </div>
    </div>
  );
}
