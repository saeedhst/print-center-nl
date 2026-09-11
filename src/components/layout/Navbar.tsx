'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Box, User, LogOut, ShieldCheck, Inbox, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { activeView, setActiveView, currentUser, logout, orders } = useAppStore();

  const pendingCount = orders.filter(
    (o) => o.status === 'QUOTE_SUBMITTED' || o.status === 'IN_PRODUCTION'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-announcement banner */}
      <div className="bg-slate-50 border-b border-slate-200/80 text-slate-700 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>
              <strong>Local Randstad Hubs:</strong> Dispatched in just <strong>1 working day</strong> across Haarlem, Amsterdam &amp; Utrecht.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
            <span>Fast turnaround &bull; Industrial quality &bull; Transparent pricing</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 text-left group transition-transform active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-orange-600 transition-colors">
              <Box className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">PrintLab</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-700 border border-orange-200">
                  NL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Haarlem &bull; Amsterdam &bull; Utrecht</p>
            </div>
          </button>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3">
            {/* Order Queue - ONLY SHOWN WHEN ADMIN IS LOGGED IN */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeView === 'admin'
                    ? 'bg-orange-50 text-orange-700 border-orange-200 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                }`}
              >
                <Inbox className="w-3.5 h-3.5 text-orange-600" />
                <span>Orders Queue</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-orange-600 text-white text-[10px] font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}

            {/* User Session or Login/Sign up Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.role === 'admin' ? 'A' : 'U'}
                  </div>
                  <div className="text-left leading-tight">
                    <span className="font-bold text-slate-900 block truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-orange-600 font-semibold uppercase tracking-wider">
                      {currentUser.role === 'admin' ? 'Staff Admin' : 'Customer'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  title="Log out"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </div>
            ) : (
              /* Instead of Start your Order make it Login / Sign up */
              <button
                onClick={() => setActiveView('auth')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 ${
                  activeView === 'auth'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-900 hover:bg-orange-600 text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Log in / Sign up</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
