'use client';

import React from 'react';

export default function HowItWorks() {
  return (
    <section className="w-full bg-surface py-20 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14 space-y-2">
          <span className="font-label-mono text-label-mono uppercase text-primary font-bold tracking-wider">
            How It Works
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            3D Printing, Made Simple
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-label-mono text-headline-sm text-primary font-bold">01</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Choose Track
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Ready to print? Upload your CAD file or drop a link from{' '}
              <strong className="text-on-surface">MakerWorld</strong> or{' '}
              <strong className="text-on-surface">Printables</strong>, and we’ll handle the printing.
            </p>
          </div>

          {/* Step 02 */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-label-mono text-headline-sm text-primary font-bold">02</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Upload &amp; Configure
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Inspect your geometry instantly in 3D, select material and color, and view exact pricing
              before confirmation.
            </p>
          </div>

          {/* Step 03 */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/40 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-label-mono text-headline-sm text-primary font-bold">03</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Fast Delivery
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              The moment your print finishes and passes quality check, we package and ship it straight
              to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

