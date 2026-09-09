'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CustomerDetails } from '@/types';
import { formatEur } from '@/lib/pricing';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  MapPin,
  CheckCircle,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function CustomerCheckoutModal() {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    orderType,
    priceBreakdown,
    cadComplexity,
    isStudent,
    studentInstitution,
    submitOrder,
  } = useAppStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+31 6 ');
  const [city, setCity] = useState<'Amsterdam' | 'Utrecht' | 'The Hague' | 'Other'>('Amsterdam');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [studentChecked, setStudentChecked] = useState(isStudent);
  const [institution, setInstitution] = useState(studentInstitution || 'TU Delft');
  const [paymentMethod, setPaymentMethod] = useState<'ideal' | 'card' | 'bancontact' | 'invoice'>('ideal');
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill in your full name, email address, and delivery address.');
      return;
    }

    const customer: CustomerDetails = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city,
      address: `${address.trim()}${postalCode ? `, ${postalCode.trim()}` : ''}`,
      isStudent: studentChecked,
      studentInstitution: studentChecked ? institution : undefined,
    };

    const newOrder = submitOrder(customer);

    // Launch festive confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#f97316', '#10b981', '#3b82f6'],
      });
    } catch (e) {
      // ignore
    }
  };

  const estimatedPrice = orderType === 'DIRECT_PRINT'
    ? priceBreakdown.totalPriceEur
    : cadComplexity === 'SIMPLE' ? 45.0 : cadComplexity === 'MEDIUM' ? 95.0 : 210.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {orderType === 'DIRECT_PRINT' ? 'Complete Print Order' : 'Submit CAD Design Request'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {orderType === 'DIRECT_PRINT' ? 'Instant manufacturing queue' : 'Guaranteed 1-business-day quote'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="px-6 py-3 bg-orange-500/10 border-b border-orange-500/20 flex items-center justify-between text-xs">
          <span className="text-orange-300 font-medium">
            {orderType === 'DIRECT_PRINT' ? 'Calculated Total (Incl. Shipping & VAT)' : 'Estimated CAD Tier Fee'}
          </span>
          <span className="text-base font-extrabold text-white font-mono">
            {orderType === 'DIRECT_PRINT' ? formatEur(estimatedPrice) : `Est. ${formatEur(estimatedPrice)}`}
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {formError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jan de Vries"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white focus:border-orange-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jan.devries@tudelft.nl"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Phone Number (+31) *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+31 6 1234 5678"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white focus:border-orange-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">City / Randstad Region *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white focus:border-orange-500 outline-none"
              >
                <option value="Amsterdam">Amsterdam (Same-day courier hub)</option>
                <option value="Utrecht">Utrecht (Science park hub)</option>
                <option value="The Hague">The Hague / Den Haag</option>
                <option value="Other">Other Netherlands / Flanders</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-slate-300 font-semibold">Street &amp; House Number *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Keizersgracht 42"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white focus:border-orange-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="1015 CR"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white uppercase focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Student checkbox */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={studentChecked}
                onChange={(e) => setStudentChecked(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="font-semibold text-white flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                I am a student at a Dutch university or college (-15%)
              </span>
            </label>

            {studentChecked && (
              <div className="pt-1">
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. TU Delft, UvA, Utrecht University"
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 p-2 text-slate-200 text-xs"
                />
              </div>
            )}
          </div>

          {/* Payment method selection */}
          <div className="space-y-2 pt-1">
            <label className="text-slate-300 font-semibold block">Preferred Payment Method</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('ideal')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'ideal'
                    ? 'bg-orange-500/15 border-orange-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                iDEAL
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-orange-500/15 border-orange-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bancontact')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'bancontact'
                    ? 'bg-orange-500/15 border-orange-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Bancontact
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('invoice')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'invoice'
                    ? 'bg-orange-500/15 border-orange-500 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Business Invoice
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>{orderType === 'DIRECT_PRINT' ? 'Confirm & Pay' : 'Submit CAD Request'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
