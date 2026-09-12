'use client';

import React from 'react';

export default function PricingSection() {
  return (
    <section className="w-full bg-surface py-20 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14 space-y-2">
          <span className="font-label-mono text-label-mono uppercase text-primary font-bold tracking-wider">
            Pricing
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Pay Only for the Final Product.
            <br />
            Zero Hidden Fees.
            <br />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Material Cost */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
              Material Cost
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-display text-on-surface font-extrabold">€1.5</span>
              <span className="font-label-mono text-body-md text-on-surface-variant">/ 100 gram</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              You can select material types and colors.
            </p>
          </div>

          {/* Card 2: Printer Runtime */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
              Printer Runtime
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-display text-on-surface font-extrabold">€3</span>
              <span className="font-label-mono text-body-md text-on-surface-variant">/ hour</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              It is depend on the Object size you want to Print.
            </p>
          </div>

          {/* Card 3: Shipment */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">
              Shipment
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-display text-primary font-extrabold">Free</span>
              <span className="font-label-mono text-body-md text-on-surface-variant"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              For a limited time in the Netherlands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
