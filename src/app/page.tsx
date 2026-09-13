import React from 'react';
import Hero from '@/components/home/Hero';
import PricingSection from '@/components/home/PricingSection';
import BenchmarkPortfolio from '@/components/home/BenchmarkPortfolio';
import HowItWorks from '@/components/home/HowItWorks';
import ReviewsSection from '@/components/home/ReviewsSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <PricingSection />
      <BenchmarkPortfolio />
      <HowItWorks />
      <ReviewsSection />
    </div>
  );
}
