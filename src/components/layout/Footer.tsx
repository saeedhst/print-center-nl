'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const { setOrderType } = useAppStore();
  const router = useRouter();

  const handleOpenSlicer = () => {
    setOrderType('DIRECT_PRINT');
    router.push('/have-3d-file');
  };

  return (
    <footer className="w-full bg-surface border-t border-outline-variant/30 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-label-mono-xs text-label-mono-xs text-on-surface-variant">
        <div>
          <Link href="/" className="font-headline-sm text-headline-sm font-bold text-on-surface block mb-1">
            PrintLab<span className="text-primary-container">.nl</span>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Singel 382, Amsterdam • Mon–Fri 08:30–18:30 • orders@printlab.nl
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-label-mono text-label-mono-xs">
          <button
            onClick={handleOpenSlicer}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            3D Slicer
          </button>
          <Link
            href="/import-link"
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Import Link
          </Link>
          <Link
            href="/thingiverse"
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Thingiverse
          </Link>
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
