'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import PricingSection from '@/components/home/PricingSection';
import HowItWorks from '@/components/home/HowItWorks';
import BenchmarkPortfolio from '@/components/home/BenchmarkPortfolio';
import ReviewsSection from '@/components/home/ReviewsSection';
import OrderBranchPoint from '@/components/quote/OrderBranchPoint';
import OptionAOrderPage from '@/components/quote/OptionAOrderPage';
import CadDesignIntake from '@/components/quote/CadDesignIntake';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';
import OrderTable from '@/components/admin/OrderTable';
import AuthPage from '@/components/auth/AuthPage';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { activeView } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md">
      <Navbar />

      <main className="flex-1">
        {activeView === 'auth' ? (
          <AuthPage />
        ) : activeView === 'branch' ? (
          <OrderBranchPoint />
        ) : activeView === 'order-a' ? (
          <OptionAOrderPage />
        ) : activeView === 'order-b' ? (
          <CadDesignIntake />
        ) : activeView === 'checkout' ? (
          <CheckoutPage />
        ) : activeView === 'confirmation' ? (
          <OrderConfirmationView />
        ) : activeView === 'portfolio' ? (
          <BenchmarkPortfolio />
        ) : activeView === 'reviews' ? (
          <ReviewsSection />
        ) : activeView === 'admin' ? (
          <OrderTable />
        ) : (
          /* Default: 'landing' */
          <div className="space-y-0 pt-20">
            <Hero />
            <PricingSection />
            <BenchmarkPortfolio />
            <HowItWorks />
            <ReviewsSection />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
