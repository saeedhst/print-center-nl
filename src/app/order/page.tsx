import React from 'react';
import OrderBranchPoint from '@/components/quote/OrderBranchPoint';

export const metadata = {
  title: 'Choose 3D Print Track | PrintLab.nl',
  description: 'Select Track 01 for instant 3D file quoting & slicing or Track 02 for 24h CAD design intake.',
};

export default function OrderPage() {
  return <OrderBranchPoint />;
}
