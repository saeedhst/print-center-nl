'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatEur, SIMPLE_MATERIALS, DELIVERY_OPTIONS } from '@/lib/pricing';
import { Clock, Truck, ShieldCheck, ArrowRight, Sparkles, Scale, CheckCircle2, Zap } from 'lucide-react';

export default function PriceBreakdownCard() {
  const {
    priceBreakdown,
    material,
    colorOption,
    deliverySpeed,
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
    <div className="rounded-xl bg-white border border-outline-variant p-6 shadow-level-2 flex flex-col justify-between space-y-6 sticky top-24">
      {/* Header & Turnaround Tag */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider font-label-mono-xs text-slate-500 block">
              INSTANT INDUSTRIAL QUOTE
            </span>
            <h3 className="text-lg font-bold text-on-surface font-headline-sm">
              Live Production Cost
            </h3>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold border border-primary/20 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
            24h Dispatch
          </span>
        </div>

        {/* 2 Primary Telemetry Readouts */}
        <div className="mt-4 grid grid-cols-2 gap-3 pb-4 border-b border-outline-variant">
          <div className="p-3 rounded bg-surface-container-low border border-outline-variant">
            <span className="text-[10px] text-slate-500 font-label-mono-xs uppercase block font-semibold">
              Filament Weight
            </span>
            <span className="text-base font-bold text-on-surface font-label-mono flex items-center gap-1.5 mt-0.5">
              <Scale className="w-4 h-4 text-primary" />
              {priceBreakdown.weightGrams} <span className="text-xs text-slate-500 font-normal">grams</span>
            </span>
          </div>

          <div className="p-3 rounded bg-surface-container-low border border-outline-variant">
            <span className="text-[10px] text-slate-500 font-label-mono-xs uppercase block font-semibold">
              Machine Runtime
            </span>
            <span className="text-base font-bold text-on-surface font-label-mono flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-primary" />
              {estHours > 0 ? `${estHours}h ` : ''}{estMins}m
            </span>
          </div>
        </div>

        {/* Local Randstad Dispatch Banner */}
        <div className="mt-4 p-3.5 rounded bg-primary/5 border border-primary/20 flex items-start gap-3">
          <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="text-on-surface font-bold block">
              ⚡ Amsterdam Precision Hub (Singel 382)
            </span>
            <span className="text-slate-600 mt-0.5 block leading-relaxed">
              Dispatched in 1 working day across Haarlem, Amsterdam &amp; Utrecht.
              Estimated delivery: <strong className="text-primary font-semibold">{priceBreakdown.estimatedDeliveryDate}</strong>
            </span>
          </div>
        </div>

        {/* Mathematical Cost Itemization */}
        <div className="mt-4 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span>Base Setup &amp; Slicing QA</span>
            <span className="font-label-mono text-on-surface font-semibold">
              {formatEur(priceBreakdown.baseSetupFeeEur)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>
              Material ({mat.simpleName} &bull; {priceBreakdown.weightGrams}g)
            </span>
            <span className="font-label-mono text-on-surface font-semibold">
              {formatEur(priceBreakdown.materialCostEur)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Machine Fleet Runtime ({estHours > 0 ? `${estHours}h ` : ''}{estMins}m)</span>
            <span className="font-label-mono text-on-surface font-semibold">
              {formatEur(priceBreakdown.machineCostEur)}
            </span>
          </div>

          {priceBreakdown.colorMultiplier > 1.0 && (
            <div className="flex items-center justify-between text-primary bg-primary/5 p-2 rounded border border-primary/20">
              <span className="font-semibold">AMS Multi-Material Multiplier</span>
              <span className="font-label-mono font-bold">+35%</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
            <span>Shipping ({deliveryTier.name.split(' (')[0]})</span>
            <span className="font-label-mono text-on-surface font-semibold">
              {priceBreakdown.shippingCostEur === 0 ? (
                <span className="text-emerald-700 font-bold">FREE</span>
              ) : (
                formatEur(priceBreakdown.shippingCostEur)
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Total Price & Checkout Action */}
      <div className="pt-4 border-t border-outline-variant space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-label-mono-xs uppercase text-slate-500 block font-semibold">
              Total Price (Incl. 21% BTW)
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Reprint Guarantee
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-on-surface font-label-mono tracking-tight">
              {formatEur(priceBreakdown.totalPriceEur)}
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={handleProceedToCheckout}
          className="w-full py-3.5 px-6 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-sm shadow-level-1 hover:shadow-level-2 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Proceed to Instant Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Payment and Local Dutch Trust Badges */}
        <div className="pt-1 text-[11px] text-slate-500 text-center space-y-1">
          <p className="font-medium text-slate-600">
            Industrial print farm located at Singel 382, Amsterdam
          </p>
          <div className="flex items-center justify-center gap-2.5 font-label-mono-xs text-slate-400 pt-0.5">
            <span>iDEAL</span>
            <span>&bull;</span>
            <span>Bancontact</span>
            <span>&bull;</span>
            <span>Credit Card</span>
            <span>&bull;</span>
            <span>SEPA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
