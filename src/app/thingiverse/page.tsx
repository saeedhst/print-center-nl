import React from 'react';
import ThingiverseGalleryView from '@/components/quote/ThingiverseGalleryView';

export const metadata = {
  title: 'Thingiverse Popular 3D Prints & Search | PrintLab.nl Amsterdam',
  description: 'Search and slice popular 3D models from Thingiverse with instant pricing, multi-axis inspection, and 24-hour delivery in the Netherlands.',
};

export default function ThingiversePage() {
  return <ThingiverseGalleryView />;
}
