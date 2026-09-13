'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Box, Lock, Mail, User, ShieldCheck, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [roleOption, setRoleOption] = useState<'customer' | 'admin'>('customer');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in your email and password.');
      return;
    }

    // Determine role (if email starts with admin or role selected is admin)
    const role = email.toLowerCase().includes('admin') || roleOption === 'admin' ? 'admin' : 'customer';
    login(email.trim(), role, fullName.trim() || undefined);
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  const handleQuickLogin = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      login('admin@printlab.nl', 'admin', 'Haarlem Studio Operations Admin');
      router.push('/admin');
    } else {
      login('sander@studionord.nl', 'customer', 'Sander de Wit');
      router.push('/');
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6">
      {/* Return link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-on-surface transition-colors font-label-mono-xs uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Return to Store</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-card space-y-6">
        {/* Brand Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
            <Box className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Log in to PrintLab NL' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your orders, track 3D prints, or manage studio queue.'
              : 'Create your account for 1-click quotes and order tracking.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jan de Vries"
                className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.nl (or admin@printlab.nl)"
              className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
            />
          </div>

          {/* Role selector dropdown */}
          <div className="space-y-1 pt-1">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span>Account Type:</span>
              <span className="text-[10px] text-slate-400 font-normal">Choose your access</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoleOption('customer')}
                className={`py-2 px-3 rounded border text-center font-bold text-xs transition-all cursor-pointer ${
                  roleOption === 'customer'
                    ? 'bg-on-surface text-white border-on-surface'
                    : 'bg-white text-slate-700 border-outline hover:bg-slate-50'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRoleOption('admin')}
                className={`py-2 px-3 rounded border text-center font-bold text-xs transition-all cursor-pointer ${
                  roleOption === 'admin'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-700 border-outline hover:bg-slate-50'
                }`}
              >
                Admin (Staff)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white font-bold text-sm shadow-level-1 hover:shadow-level-2 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Buttons for Convenience */}
        <div className="pt-4 border-t border-slate-200 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center font-label-mono-xs">
            One-Click Demo Access
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-2.5 px-3 rounded bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Demo Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="py-2.5 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              <span>Demo Customer</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 text-center pt-1 leading-snug">
            Tip: Logging in as <strong>Admin</strong> unlocks the <strong>&ldquo;Orders Queue&rdquo;</strong> in the header to review CAD requests and manage production.
          </p>
        </div>
      </div>
    </div>
  );
}
