'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { PRESET_MODELS, calculateGeometryVolumeCm3, getBoundingBoxDimensions } from '@/lib/meshUtils';

interface UseCaseItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  presetIndex: number;
  material: 'STANDARD' | 'TOUGH' | 'RESIN';
}

const USE_CASES: UseCaseItem[] = [
  {
    id: 'robotics',
    tag: '01. Robotics',
    title: 'Functional Parts',
    description: 'From individual printed components to a complete, working mechanism.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAihKnCwYbARye2n2I8BcMid4q_DeYtq5AzHapo6fIEmbX9avBy67UJSmvphDBzq73eR6RNNTz4OHGco5gmmEX1Zi472mCiRrdvB14R7B1_AuKntg830BaTb9r5Bx4VjspjAaFMDsWDtCwVbPcbVLqfbp3ZxcFV7MiRsv95U2EqwuVaElLZjwWOsjnP96iYu6z6qftL4mywEsJ0hzjMHO0YQvJw9lXRk20COTeEqqaL8zSsekAkhZKScA',
    presetIndex: 0,
    material: 'TOUGH',
  },
  {
    id: 'architecture',
    tag: '02. Architecture',
    title: 'Scale Facades',
    description: 'High-detail matte white architectural PLA and resin prints depicting intricate geometries.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD21mcOyha-qPrjjxAT4YzEvmOEl7hrJoWNnjaJs_5owMWl2J9u8jRLvHeHn5oAYuzdNsa_0YlLM5KwswNLYxKTj0sZrBsQqCMjwjEdbPAKXyS-Pe7zUFnA40XsctCSTQ1WcoY-cUdHmMFviZ17irZxywsIHDmjFxxb4a0JjsnZiS3PEVhn9MApEX8oDmd53eigiMnsoLtrdGrpHGG6q2wOvle2vpTnAiSIuTYXOPnSXiKAChVbh7RXwQ',
    presetIndex: 1,
    material: 'RESIN',
  },
  {
    id: 'academic',
    tag: '03. Academic',
    title: 'Visual Learning',
    description: 'Fast, affordable design iterations for industrial design and engineering students.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByubltvWwMxDN15Z7_GaoXLlCvaDepGiwpBhWbPgLEtIC_gAMr_HsoyhEhtvLbYYzWYdQ8Ap0mxdcGaGjDr6QjiMd3NTKH5K5PXGlnPEvQjec5g06R8KmEVZsUmZGWb2qqel-F0dxKXeTG8AfRz1_mAMz4wSrfI8goavkUASoMWs15UC6CFWb9P5coBcFHTXdYS8fprlUdcYH_sVGe2CHK-PSPaSBU7Y0uiHUrpMB6_M-KV428QQplcQ',
    presetIndex: 2,
    material: 'STANDARD',
  },
  {
    id: 'gadgets',
    tag: '04. Custom Gadgets',
    title: 'Everyday Hardware',
    description: 'Camera accessories, ergonomic enclosures, and custom bracket solutions.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQsM3dP2FGdJ-Hsds7dOaATTCvgffmXITGEBIfab-hoDnTnC8tWkdEAPdMEFV7LnupI9Sul7RGnA9gyobVQwnbHHrC7g9CnWIS07FbyRBkIzlLiTk2BUjIGNctQE6CYBrDDHGcsAkXIgNSy1jEzMonuFRUvSVqI0UT2_9MIU2mtUvP6h6Wej2uxNYjXoC5fykuMSui3k8GkbWgywAYVumYZ3aFmNv1TtLZznh0DEBkvvILM_EwkDLNog',
    presetIndex: 3,
    material: 'TOUGH',
  },
];

export default function BenchmarkPortfolio() {
  const { setModelGeometry, setMaterial, setActiveView, setOrderType } = useAppStore();

  const handleSelectCase = (item: UseCaseItem) => {
    const preset = PRESET_MODELS[item.presetIndex] || PRESET_MODELS[0];
    const geom = preset.generateGeometry();
    const dims = getBoundingBoxDimensions(geom);
    const volume = calculateGeometryVolumeCm3(geom);

    setModelGeometry(preset.fileName, geom, dims, volume, preset.id);
    setMaterial(item.material);
    setOrderType('DIRECT_PRINT');
    setActiveView('order-a');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="use-cases-section" className="w-full py-20 lg:py-24 bg-surface border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="font-label-mono text-label-mono uppercase text-secondary font-bold tracking-wider">
            USE CASES
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Bring Any Idea to Life
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            High-precision 3D printing for engineers, architects, students, and makers.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectCase(item)}
              className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/40 hover:border-primary/60 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="h-44 overflow-hidden bg-surface-container relative">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  onError={(e) => {
                    // Fallback to crisp generic tech image if link is inaccessible
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider mb-1">
                    {item.tag}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

