'use client';

import React from 'react';
import { Box, MapPin, Shield, Truck, CreditCard, Sparkles, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Dutch Registration */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white">
                <Box className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PrintLab NL</span>
              <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">
                Randstad Hub
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 pr-6">
              Precision on-demand 3D printing and professional CAD engineering service localized in the Netherlands. Rapid turnaround with Bambu Lab multi-material AMS and Formlabs stereolithography printing fleets.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div><strong>KvK (Chamber of Commerce):</strong> 89234812 (Amsterdam)</div>
              <div><strong>BTW-Id (VAT):</strong> NL89234812B01</div>
              <div><strong>Registered Office:</strong> Science Park 402, 1098 XH Amsterdam, Nederland</div>
            </div>
          </div>

          {/* Col 2: Priority Delivery Hubs */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Randstad Delivery</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong>Amsterdam:</strong> Same-day courier / Pick-up
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong>Utrecht:</strong> Same-day cargo bike / Science Park hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong>The Hague (Den Haag):</strong> Next-day express
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <strong>Rotterdam &amp; Delft:</strong> Campus pickup / Courier
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                Rest of NL &amp; Flanders: 1–2 days PostNL
              </li>
            </ul>
          </div>

          {/* Col 3: Materials & Specs */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>• Bambu Lab AMS 4-Color Multi-Filament</li>
              <li>• Formlabs SLA High-Precision Resin</li>
              <li>• Tough PETG for functional mechanical jigs</li>
              <li>• Heat-resistant engineering ABS (95°C)</li>
              <li>• Shore 95A Flexible Elastic TPU</li>
              <li>• Tolerances down to ±0.05 mm</li>
            </ul>
          </div>

          {/* Col 4: Trust, SLA & Payments */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>SLA &amp; Guarantee</span>
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <p>
                <strong>1-Day CAD Review:</strong> All custom design intakes receive engineer review and fixed quote within 24h.
              </p>
              <p>
                <strong>Reprint Guarantee:</strong> In case of mechanical dimension defect or print failure, immediate free reprint.
              </p>
              <div className="pt-2 border-t border-slate-800">
                <p className="text-[11px] text-slate-500 mb-1 font-medium">Supported Payment Methods:</p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">iDEAL</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Bancontact</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Credit Card</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Klarna</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PrintLab NL B.V. • All rights reserved. Handcrafted in the Randstad.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service (Algemene Voorwaarden)</a>
            <a href="#iso" className="hover:text-slate-300 transition-colors">ISO 9001 Compliant Fleet</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
