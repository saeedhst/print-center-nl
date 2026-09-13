'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Box, User, LogOut, Inbox } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, orders, setOrderType } = useAppStore();
  const [lang, setLang] = useState<'NL' | 'EN'>('NL');
  const router = useRouter();
  const pathname = usePathname();

  const pendingCount = orders.filter(
    (o) => o.status === 'QUOTE_SUBMITTED' || o.status === 'IN_PRODUCTION'
  ).length;

  const handleStartPrint = () => {
    setOrderType('DIRECT_PRINT');
    router.push('/order-a');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface leading-none">
                PrintLab<span className="text-primary-container">.nl</span>
              </span>
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider mt-1">
                AMS Industrial 3D Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Order Queue - ONLY SHOWN WHEN ADMIN IS LOGGED IN */}
          {currentUser?.role === 'admin' && (
            <Link
              href="/admin"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                pathname === '/admin'
                  ? 'bg-primary-fixed text-primary border-primary/40'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/40'
              }`}
            >
              <Inbox className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Orders Queue</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-primary text-white text-[10px] font-bold">
                  {pendingCount}
                </span>
              )}
            </Link>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-surface-container px-2 py-1 rounded-lg text-on-surface font-label-mono text-label-mono-xs">
            <button
              onClick={() => setLang('NL')}
              className={`px-1 transition-colors cursor-pointer ${
                lang === 'NL'
                  ? 'font-bold text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              NL
            </button>
            <span className="text-outline-variant">/</span>
            <button
              onClick={() => setLang('EN')}
              className={`px-1 transition-colors cursor-pointer ${
                lang === 'EN'
                  ? 'font-bold text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              EN
            </button>
          </div>

          {/* Primary CTA: Start 3D Print */}
          <button
            onClick={handleStartPrint}
            className="inline-flex items-center justify-center bg-primary-container text-on-primary font-label-lg text-label-lg px-4 py-2.5 rounded hover:bg-primary transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">view_in_ar</span>
            <span>Start 3D Print</span>
          </button>

          {/* Profile / Auth Avatar */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1">
              <Link
                href="/auth"
                title={`${currentUser.name} (${currentUser.role})`}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs ring-1 ring-outline-variant cursor-pointer"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center pl-1">
              <Link
                href="/auth"
                className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-outline-variant hover:ring-primary transition-all cursor-pointer flex items-center justify-center bg-surface-container"
                title="Log in / Sign up"
              >
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzcWqRmi8GjbcgJp1ax-xBdHaZb3SuQKjJRLYTbbwPp0lT95h4r67jL6nNT1Zr4Uel219YQ5ZhoTBlhTqCK-9GLB8FW5ip0cmoL1eX-wsmYpSBjrFoqRaiVCbi3O98ZjFRIeGgHQw2bbprDSvvLPTNvdEKqEvQ0ANnfZ4F3tWES0Ih1XIqxAF-XQ3xVF9XGt37jer5JoUkwuUp5CuvQSl07Z1DyC_SV59uEug7kYR-gVIrv9ftxOC6cg"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
