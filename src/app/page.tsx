'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import BenchmarkPortfolio from '@/components/home/BenchmarkPortfolio';
import StudentPerks from '@/components/home/StudentPerks';
import MaterialShowcase from '@/components/home/MaterialShowcase';
import QuoteWizard from '@/components/quote/QuoteWizard';
import OrderTable from '@/components/admin/OrderTable';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { activeTab } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] bg-grid-pattern relative">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'admin' ? (
          <OrderTable />
        ) : activeTab === 'portfolio' ? (
          <div className="space-y-12">
            <BenchmarkPortfolio />
            <QuoteWizard />
          </div>
        ) : activeTab === 'materials' ? (
          <div className="space-y-12">
            <MaterialShowcase />
            <QuoteWizard />
          </div>
        ) : (
          /* Default tab: 'quote' */
          <div className="space-y-6">
            <Hero />
            <HowItWorks />
            <QuoteWizard />
            <BenchmarkPortfolio />
            <StudentPerks />
            <MaterialShowcase />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
