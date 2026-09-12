'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const { setActiveView, setOrderType } = useAppStore();

  const handleOpenSlicer = () => {
    setOrderType('DIRECT_PRINT');
    setActiveView('order-a');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenUseCases = () => {
    setActiveView('landing');
    setTimeout(() => {
      document.getElementById('use-cases-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="w-full bg-surface border-t border-outline-variant/30 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-label-mono-xs text-label-mono-xs text-on-surface-variant">
        <div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface block mb-1">
            PrintLab<span className="text-primary-container">.nl</span>
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Singel 382, Amsterdam • Mon–Fri 08:30–18:30 • orders@printlab.nl
          </p>
        </div>

        <div className="flex items-center gap-6 font-label-mono text-label-mono-xs">
          <button
            onClick={handleOpenSlicer}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            3D Slicer
          </button>
          <button
            onClick={handleOpenUseCases}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Materials
          </button>
          <button
            onClick={() => alert('Privacy Policy: All uploaded CAD files are strictly confidential and automatically purged after production.')}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button
            onClick={() => alert('Terms of Service: Industrial tolerance guarantee of ±0.05mm. Free reprints if manufacturing tolerances are not satisfied.')}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}

