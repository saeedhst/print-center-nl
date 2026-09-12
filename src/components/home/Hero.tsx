'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { setActiveView, setOrderType } = useAppStore();

  const handleStart3DFile = () => {
    setOrderType('DIRECT_PRINT');
    setActiveView('order-a');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestDesign = () => {
    setOrderType('DESIGN_AND_PRINT');
    setActiveView('order-b');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-surface py-16 lg:py-24 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines & Dual Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-display text-on-surface tracking-tight leading-[1.06]">
                No 3D printer?
                <br />
                <span style={{ letterSpacing: '-0.025em' }}>Consider it printed :)</span>
                <br />
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                From a student project to a broken home part or an engineering prototype
                <br />
                we print and deliver it in 24 hours !
              </p>
            </div>

            {/* Dual Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Direct 3D File */}
              <button
                onClick={handleStart3DFile}
                className="group p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/40 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 text-left cursor-pointer"
              >
                <div className="space-y-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-bold">
                    I Have a 3D File
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Drop your 3D file to see an instant 3D preview and price.
                  </p>
                </div>
                <div className="flex items-center text-primary font-label-lg text-label-lg font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Start</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </button>

              {/* Card 2: Custom Design / Photo */}
              <button
                onClick={handleRequestDesign}
                className="group p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/40 hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 text-left cursor-pointer"
              >
                <div className="space-y-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors font-bold">
                    I Have an Idea or Photo
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Send sketches, broken components, or concept drawings.
                  </p>
                </div>
                <div className="flex items-center text-secondary font-label-lg text-label-lg font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Request 3D Design</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Precision Components Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-outline-variant/40 bg-surface-container-high">
              <img
                alt="3D printed precision components on workbench"
                className="w-full h-[480px] object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wy5Qq7iFivgbT62_Y_kQD4qwB6rMrMlMT6IQ1fN4ecyzhu1dmKXm4JcLRPLA8Kx2ylxOKSG6C2QG_enaDHewfxJ1uzOFuRiFTdo7MEufDb6KXfnKsYNkjvna9_Ulg-OP7VbAc-u18yRIXZapVCFEDUWIBmf-7FoPc0cQx7y7deWLptb3yCBXmu2IW5fzeL41ZG6BLxa35xf09_QAclej7yHD_J2CCBCTNDito6vMQeAKNS68sWaBDWUZoh"
                onError={(e) => {
                  // Fallback to high-contrast technical placeholder if image fails to load
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

