'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatEur, MATERIALS, SHIPPING_TIERS } from '@/lib/pricing';
import {
  CreditCard,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight,
  GraduationCap,
  Layers,
} from 'lucide-react';

export default function PriceBreakdownCard() {
  const {
    priceBreakdown,
    material,
    colorCount,
    deliverySpeed,
    isStudent,
    setIsCheckoutModalOpen,
  } = useAppStore();

  const matConfig = MATERIALS[material] || MATERIALS.PLA;
  const shippingTier = SHIPPING_TIERS.find((s) => s.id === deliverySpeed) || SHIPPING_TIERS[0];

  const estHours = Math.floor(priceBreakdown.estimatedPrintTimeMinutes / 60);
  const estMins = priceBreakdown.estimatedPrintTimeMinutes % 60;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl flex flex-col justify-between space-y-6 sticky top-20">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
              Quotation Summary
            </span>
            <h3 className="text-lg font-extrabold text-white">Live Price Breakdown</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/25 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Locked Quote
          </span>
        </div>

        {/* Detailed Math Itemization */}
        <div className="mt-4 space-y-3 text-xs">
          {/* Base Setup */}
          <div className="flex items-center justify-between text-slate-300">
            <div>
              <span>Base Setup &amp; Slicing Prep</span>
              <span className="text-[10px] text-slate-500 block">Bed cleaning, calibration, QA</span>
            </div>
            <span className="font-mono text-slate-200">{formatEur(priceBreakdown.baseSetupFeeEur)}</span>
          </div>

          {/* Filament Weight */}
          <div className="flex items-center justify-between text-slate-300">
            <div>
              <span>
                Filament: {priceBreakdown.weightGrams}g of {material}
              </span>
              <span className="text-[10px] text-slate-500 block">
                @ €{matConfig.ratePerGram.toFixed(2)}/g ({matConfig.name.split(' (')[0]})
              </span>
            </div>
            <span className="font-mono text-slate-200">{formatEur(priceBreakdown.materialCostEur)}</span>
          </div>

          {/* Machine Runtime */}
          <div className="flex items-center justify-between text-slate-300">
            <div>
              <span>Machine Runtime &amp; Power</span>
              <span className="text-[10px] text-slate-500 block">
                Est. {estHours > 0 ? `${estHours}h ` : ''}{estMins}m @ €2.40/hr
              </span>
            </div>
            <span className="font-mono text-slate-200">{formatEur(priceBreakdown.machineCostEur)}</span>
          </div>

          {/* Multi-Color Multiplier */}
          {priceBreakdown.colorMultiplier > 1.0 && (
            <div className="flex items-center justify-between text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <div>
                <span className="font-semibold">AMS Multi-Material Multiplier</span>
                <span className="text-[10px] text-amber-400/80 block">
                  {colorCount} Colors ({priceBreakdown.colorMultiplier}x purge &amp; swap cycle)
                </span>
              </div>
              <span className="font-mono font-bold">
                +{Math.round((priceBreakdown.colorMultiplier - 1) * 100)}%
              </span>
            </div>
          )}

          {/* Subtotal before discounts */}
          <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-slate-800">
            <span>Production Subtotal</span>
            <span className="font-mono text-slate-300 font-semibold">
              {formatEur(priceBreakdown.productionSubtotalEur)}
            </span>
          </div>

          {/* Student Discount */}
          {isStudent && priceBreakdown.studentDiscountEur > 0 && (
            <div className="flex items-center justify-between text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="font-semibold">Dutch Student Perk (-15%)</span>
              </div>
              <span className="font-mono font-bold">-{formatEur(priceBreakdown.studentDiscountEur)}</span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex items-center justify-between text-slate-300 pt-1">
            <div>
              <span>Shipping &amp; Logistics</span>
              <span className="text-[10px] text-slate-500 block">{shippingTier.name}</span>
            </div>
            <span className="font-mono font-semibold text-slate-200">
              {priceBreakdown.shippingCostEur === 0 ? 'FREE' : formatEur(priceBreakdown.shippingCostEur)}
            </span>
          </div>
        </div>
      </div>

      {/* Total & Checkout Section */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Total (Incl. 21% BTW / VAT)</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              {shippingTier.duration}
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-white font-mono">
              {formatEur(priceBreakdown.totalPriceEur)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <span>Proceed to Instant Checkout</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Guarantees */}
        <div className="space-y-2 pt-1 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Reprint guarantee against mechanical or dimensional failure</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Pay securely with iDEAL, Bancontact, Klarna or Card</span>
          </div>
        </div>
      </div>
    </div>
  );
}
