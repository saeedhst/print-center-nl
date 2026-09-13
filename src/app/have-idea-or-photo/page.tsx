import React from 'react';
import ModelSourcingGateway from '@/components/quote/ModelSourcingGateway';

export const metadata = {
  title: 'Source or Design a 3D Model | PrintLab.nl Amsterdam',
  description: 'Choose how to source or design your 3D print: paste a link from MakerWorld, Printables, or Thingiverse, browse our curated catalog, or request custom CAD design engineering.',
};

export default function HaveIdeaOrPhotoPage() {
  return <ModelSourcingGateway />;
}
