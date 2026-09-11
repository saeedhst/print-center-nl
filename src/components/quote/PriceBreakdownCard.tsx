'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatEur, SIMPLE_MATERIALS, DELIVERY_OPTIONS } from '@/lib/pricing';
import { Clock, Truck, ShieldCheck, ArrowRight, Sparkles, Scale, Layers } from 'lucide-react';

export default function PriceBreakdownCard() {
  const {
    priceBreakdown,
    material,
    colorOption,
    deliverySpeed,
    scaleFactor,
    setActiveView,
  } = useAppStore();

  const mat = SIMPLE_MATERIALS[material] || SIMPLE_MATERIALS.STANDARD;
  const deliveryTier = DELIVERY_OPTIONS.find((d) => d.id === deliverySpeed) || DELIVERY_OPTIONS[1];

  const estHours = Math.floor(priceBreakdown.estimatedPrintTimeMinutes / 60);
  const estMins = priceBreakdown.estimatedPrintTimeMinutes % 60;

  const handleProceedToCheckout = () => {
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-card flex flex-col justify-between space-y-6 sticky top-24">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Instant Price Quote
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">
              Live Calculation
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            1-Day Dispatch
          </span>
        </div>

        {/* Required 4 Metrics Overview */}
        <div className="mt-4 grid grid-cols-2 gap-3 pb-4 border-b border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Filament Weight</span>
            <span className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
              <Scale className="w-4 h-4 text-slate-500" />
              {priceBreakdown.weightGrams} grams
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Estimated Print Time</span>
            <span className="text-base font-extrabold text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-slate-500" />
              {estHours > 0 ? `${estHours}h ` : ''}{estMins}m
            </span>
          </div>
        </div>

        {/* Estimated Delivery Date Callout */}
        <div className="mt-4 p-3.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center gap-3">
          <Truck className="w-5 h-5 text-orange-600 shrink-0" />
          <div className="text-xs">
            <span className="text-orange-950 font-bold block">Estimated Delivery Date:</span>
            <span className="text-orange-800 font-medium">
              {priceBreakdown.estimatedDeliveryDate}
            </span>
          </div>
        </div>

        {/* Math Itemization Breakdown */}
        <div className="mt-4 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span>Base Setup &amp; Slicing QA</span>
            <span className="font-mono text-slate-900 font-semibold">
              {formatEur(priceBreakdown.baseSetupFeeEur)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Material ({mat.simpleName} &bull; {priceBreakdown.weightGrams}g)
            </span>
            <span className="font-mono text-slate-900 font-semibold">
              {formatEur(priceBreakdown.materialCostEur)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Machine Fleet Runtime</span>
            <span className="font-mono text-slate-900 font-semibold">
              {formatEur(priceBreakdown.machineCostEur)}
            </span>
          </div>

          {priceBreakdown.colorMultiplier > 1.0 && (
            <div className="flex items-center justify-between text-orange-700 bg-orange-50/70 p-2 rounded-lg border border-orange-200">
              <span className="font-semibold">AMS Multi-Material Multiplier</span>
              <span className="font-mono font-bold">+35%</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Shipping ({deliveryTier.name.split(' (')[0]})</span>
            <span className="font-mono text-slate-900 font-semibold">
              {priceBreakdown.shippingCostEur === 0 ? 'FREE' : formatEur(priceBreakdown.shippingCostEur)}
            </span>
          </div>
        </div>
      </div>

      {/* Total Price & Checkout Action */}
      <div className="pt-4 border-t border-slate-200 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Total Price (Incl. 21% BTW)</span>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Reprint Guarantee
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {formatEur(priceBreakdown.totalPriceEur)}
            </span>
          </div>
        </div>

        <button
          onClick={handleProceedToCheckout}
          className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="pt-1 text-[11px] text-slate-500 text-center space-y-1">
          <p>Dispatched in 1 working day across Haarlem, Amsterdam &amp; Utrecht.</p>
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <span>iDEAL</span>
            <span>&bull;</span>
            <span>Credit Card</span>
            <span>&bull;</span>
            <span>Bancontact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
