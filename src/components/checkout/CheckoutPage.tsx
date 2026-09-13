'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { formatEur, SIMPLE_MATERIALS, DELIVERY_OPTIONS } from '@/lib/pricing';
import { DeliverySpeedOption } from '@/types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Box,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  Scale,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    orderType,
    fileName,
    priceBreakdown,
    material,
    colorOption,
    scaleFactor,
    deliverySpeed,
    setDeliverySpeed,
    customer,
    setCustomer,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    submitDirectOrder,
  } = useAppStore();

  const [formError, setFormError] = useState<string | null>(null);

  const mat = SIMPLE_MATERIALS[material] || SIMPLE_MATERIALS.STANDARD;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.email.trim() || !customer.address.trim()) {
      setFormError('Please complete your full name, email, and delivery street address.');
      return;
    }

    setFormError(null);
    submitDirectOrder();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0052ff', '#00d2ff', '#0f172a', '#10b981'],
      });
    } catch (e) {
      // ignore
    }

    router.push('/confirmation');
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/have-3d-file"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-on-surface transition-colors cursor-pointer font-label-mono-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Back to 3D File Configuration</span>
        </Link>
      </div>

      <div className="text-left space-y-1">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout &amp; Delivery
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Review your 3D print specifications, select your delivery option, and complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Details & Payment */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
          {formError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {formError}
            </div>
          )}

          {/* 1. Customer Contact Details */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Contact &amp; Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ fullName: e.target.value })}
                  placeholder="Jan de Vries"
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ email: e.target.value })}
                  placeholder="jan@example.nl"
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Phone Number</label>
                <input
                  type="tel"
                  value={customer.phone || ''}
                  onChange={(e) => setCustomer({ phone: e.target.value })}
                  placeholder="+31 6 1234 5678"
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">City / Region *</label>
                <select
                  value={customer.city}
                  onChange={(e) => setCustomer({ city: e.target.value as any })}
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm font-medium"
                >
                  <option value="Haarlem">Haarlem (Direct 1-day hub)</option>
                  <option value="Amsterdam">Amsterdam (Same-day courier hub)</option>
                  <option value="Utrecht">Utrecht (Science Park hub)</option>
                  <option value="The Hague">The Hague / Den Haag</option>
                  <option value="Other">Other Netherlands</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-800">Street &amp; Number *</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ address: e.target.value })}
                  placeholder="Gierstraat 12"
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Postal Code</label>
                <input
                  type="text"
                  value={customer.postalCode || ''}
                  onChange={(e) => setCustomer({ postalCode: e.target.value })}
                  placeholder="2011 GA"
                  className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-label-mono-xs"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Options */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Select Delivery Option</span>
            </h3>

            <div className="space-y-2.5">
              {DELIVERY_OPTIONS.map((tier) => {
                const isSelected = deliverySpeed === tier.id;
                return (
                  <label
                    key={tier.id}
                    onClick={() => setDeliverySpeed(tier.id)}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary'
                        : 'bg-white border-outline-variant hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={isSelected}
                        onChange={() => setDeliverySpeed(tier.id)}
                        className="mt-1 text-primary focus:ring-0"
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-on-surface flex items-center gap-2">
                          <span>{tier.name}</span>
                          {tier.highlight && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded font-label-mono-xs bg-primary/10 text-primary border border-primary/20">
                              {tier.highlight}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{tier.carrier}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1 font-label-mono-xs">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          {tier.duration}
                        </div>
                      </div>
                    </div>

                    <div className="font-bold text-sm text-on-surface font-label-mono">
                      {tier.costEur === 0 ? 'FREE' : formatEur(tier.costEur)}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Payment Section: iDEAL and Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Method</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('ideal')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPaymentMethod === 'ideal'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="font-extrabold text-sm mb-1">iDEAL</div>
                <div className={`text-xs ${selectedPaymentMethod === 'ideal' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Instant Dutch bank transfer (ABN, ING, Rabo, ASN)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="font-extrabold text-sm mb-1">Credit Card</div>
                <div className={`text-xs ${selectedPaymentMethod === 'card' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Visa, Mastercard, American Express
                </div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-base shadow-level-1 hover:shadow-level-2 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Confirm Order &amp; Pay {formatEur(priceBreakdown.totalPriceEur)}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Right Column: Clean Summary Card */}
        <div className="lg:col-span-5">
          <div className="rounded-xl bg-white border border-outline-variant p-6 shadow-level-2 space-y-6 sticky top-24">
            <div className="pb-4 border-b border-outline-variant">
              <span className="text-[10px] font-bold uppercase tracking-wider font-label-mono-xs text-slate-500 block">
                PRODUCTION ORDER REVIEW
              </span>
              <h3 className="text-lg font-bold text-on-surface font-headline-sm">
                Summary Card
              </h3>
            </div>

            {/* Model Details */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded bg-surface-container-low border border-outline-variant space-y-2">
                <div className="font-bold text-on-surface flex items-center gap-2 text-sm">
                  <Box className="w-4 h-4 text-primary" />
                  <span className="truncate">{fileName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block font-label-mono-xs uppercase">Dimensions:</span>
                    <strong className="text-on-surface font-label-mono">
                      {priceBreakdown.scaledDimensions.x} &times; {priceBreakdown.scaledDimensions.y} &times; {priceBreakdown.scaledDimensions.z} mm
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-label-mono-xs uppercase">Scale:</span>
                    <strong className="text-on-surface font-label-mono">
                      {Math.round(scaleFactor * 100)}% ({priceBreakdown.scaledVolumeCm3} cm&sup3;)
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-label-mono-xs uppercase">Material:</span>
                    <strong className="text-on-surface">{mat.simpleName}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-label-mono-xs uppercase">Color:</span>
                    <strong className="text-on-surface">
                      {colorOption === 'MULTI' ? 'Multi-Color (AMS)' : 'Single Color'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Delivery Schedule Callout */}
              <div className="p-3.5 rounded bg-primary/5 border border-primary/20 flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-on-surface block font-label-mono-xs uppercase">Estimated Delivery:</span>
                  <span className="text-primary font-semibold">
                    {priceBreakdown.estimatedDeliveryDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakdown Math */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span>Setup &amp; Slicing Base</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {formatEur(priceBreakdown.baseSetupFeeEur)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  Material ({priceBreakdown.weightGrams}g of {mat.simpleName})
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

              <div className="flex items-center justify-between">
                <span>Delivery ({DELIVERY_OPTIONS.find((d) => d.id === deliverySpeed)?.name.split(' (')[0]})</span>
                <span className="font-mono text-slate-900 font-semibold">
                  {priceBreakdown.shippingCostEur === 0 ? 'FREE' : formatEur(priceBreakdown.shippingCostEur)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Total Due</span>
                <span className="text-[10px] text-slate-400">Incl. 21% BTW (VAT)</span>
              </div>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {formatEur(priceBreakdown.totalPriceEur)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free reprint guarantee in case of dimensional tolerance defect.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
