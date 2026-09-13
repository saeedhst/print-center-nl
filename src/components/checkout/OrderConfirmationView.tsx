'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, Clock, Truck, ArrowRight, Box, ShieldCheck } from 'lucide-react';
import { formatEur } from '@/lib/pricing';

export default function OrderConfirmationView() {
  const { lastSubmittedOrder, orders } = useAppStore();

  const activeOrder = lastSubmittedOrder || (orders.length > 0 ? orders[0] : null);

  if (!activeOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">No active order found.</p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 rounded bg-primary text-white text-xs font-bold"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const isDirect = activeOrder.type === 'DIRECT_PRINT';

  return (
    <div className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-white border border-outline-variant p-8 sm:p-12 shadow-level-2 text-center space-y-6">
        {/* Checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded font-label-mono-xs inline-block mb-3">
            {isDirect ? 'Order Confirmed & Queued' : 'CAD Request Submitted'}
          </span>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight font-display">
            {isDirect ? 'We&apos;re Printing Your Model!' : 'We Received Your Design Request!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed font-body-md">
            {isDirect
              ? 'Your 3D model geometry has been parsed and sent to our Singel 382 print fleet. Dispatched within 1 working day.'
              : 'Our Amsterdam CAD team is reviewing your dimensions and photos. You will receive a locked price quote within 1 business day.'}
          </p>
        </div>

        {/* Details card */}
        <div className="p-6 rounded-lg bg-surface-container-low border border-outline-variant text-left text-xs space-y-3 font-body-sm">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <span className="text-slate-500 font-label-mono-xs uppercase">Order Reference:</span>
            <span className="font-label-mono font-bold text-on-surface text-sm">
              {activeOrder.id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Customer Name:</span>
            <span className="font-semibold text-on-surface">{activeOrder.customer.fullName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Email Address:</span>
            <span className="font-semibold text-on-surface">{activeOrder.customer.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Destination:</span>
            <span className="font-semibold text-on-surface">
              {activeOrder.customer.city} ({activeOrder.customer.address})
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
            <span className="text-slate-500 font-label-mono-xs uppercase">Target Delivery:</span>
            <span className="font-bold text-primary flex items-center gap-1 font-label-mono-xs">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Dispatched in 1 Working Day
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/admin"
            className="w-full sm:w-auto px-6 py-3 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white text-xs font-bold transition-all shadow-level-1 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View in Orders Queue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded bg-white border border-outline hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
