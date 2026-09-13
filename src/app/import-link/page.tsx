import React from 'react';
import ImportLinkView from '@/components/quote/ImportLinkView';

export const metadata = {
  title: 'Import 3D Model via Link | PrintLab.nl Amsterdam',
  description: 'Paste links from MakerWorld, Printables, or Thingiverse to inspect 3D geometry and calculate instant on-demand printing prices in the Netherlands.',
};

export default function ImportLinkPage() {
  return <ImportLinkView />;
}
