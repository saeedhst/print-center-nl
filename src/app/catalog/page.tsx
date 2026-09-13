import React from 'react';
import CatalogView from '@/components/quote/CatalogView';

export const metadata = {
  title: 'Pre-Approved Popular 3D Print Catalog | PrintLab.nl Amsterdam',
  description: 'Browse pre-tested commercial utility models with pre-calculated print dimensions, filament usage, and instant fixed pricing in the Netherlands.',
};

export default function CatalogPage() {
  return <CatalogView />;
}
