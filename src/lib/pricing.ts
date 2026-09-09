import { Dimensions, MaterialOption, MaterialType } from '@/types';

export const MATERIALS: Record<MaterialType, MaterialOption> = {
  PLA: {
    id: 'PLA',
    name: 'Polylactic Acid (PLA)',
    density: 1.24,
    ratePerGram: 0.08,
    description: 'Eco-friendly, rigid, and high-detail. Perfect for rapid prototypes, visual models, and consumer goods.',
    tag: 'Popular & Fast',
    accentColor: '#10b981', // emerald
    finish: 'Smooth satin',
    bestFor: 'Prototyping, architectural models, figurines',
    tensileStrength: '50 MPa',
    tempResistance: '55°C',
  },
  PETG: {
    id: 'PETG',
    name: 'Polyethylene Terephthalate (PETG)',
    density: 1.27,
    ratePerGram: 0.10,
    description: 'Tough, moisture-resistant, and chemically stable. Excellent for functional mechanical brackets and enclosures.',
    tag: 'Impact Resistant',
    accentColor: '#f97316', // orange
    finish: 'Semi-gloss durable',
    bestFor: 'Mechanical parts, outdoor use, waterproof containers',
    tensileStrength: '45 MPa',
    tempResistance: '75°C',
  },
  ABS: {
    id: 'ABS',
    name: 'Acrylonitrile Butadiene Styrene (ABS)',
    density: 1.04,
    ratePerGram: 0.11,
    description: 'High heat and impact resistance. Can be vapor smoothed with acetone. Great for automotive and engineering.',
    tag: 'High Heat',
    accentColor: '#3b82f6', // blue
    finish: 'Matte technical',
    bestFor: 'Automotive clips, gearboxes, high-temperature fittings',
    tensileStrength: '42 MPa',
    tempResistance: '95°C',
  },
  TPU: {
    id: 'TPU',
    name: 'Thermoplastic Polyurethane (TPU 95A)',
    density: 1.21,
    ratePerGram: 0.14,
    description: 'Flexible, rubber-like elastomer. Shock-absorbing, resistant to grease, tears, and abrasion.',
    tag: 'Flexible Rubber',
    accentColor: '#8b5cf6', // purple
    finish: 'Rubberized grip',
    bestFor: 'Gaskets, phone bumpers, drone vibration dampers',
    tensileStrength: '35 MPa',
    tempResistance: '80°C',
  },
  RESIN: {
    id: 'RESIN',
    name: 'High-Detail SLA Photopolymer Resin',
    density: 1.15,
    ratePerGram: 0.18,
    description: 'Ultra-high resolution stereolithography with microscopic layer lines (0.025mm). Smooth, injection-mold look.',
    tag: 'Ultra Detail',
    accentColor: '#ec4899', // pink
    finish: 'Ultra smooth / injection-molded feel',
    bestFor: 'Jewelry casting, dental scale, miniature collectibles',
    tensileStrength: '65 MPa',
    tempResistance: '60°C',
  },
};

export const BASE_SETUP_FEE_EUR = 3.50;
export const MACHINE_RATE_PER_HOUR_EUR = 2.40;
export const STUDENT_DISCOUNT_PERCENT = 15;

export interface ShippingTier {
  id: 'STANDARD' | 'EXPRESS' | 'COURIER_RANDSTAD' | 'PICKUP';
  name: string;
  carrier: string;
  duration: string;
  costEur: number;
  highlight?: string;
  availableCities?: string[];
}

export const SHIPPING_TIERS: ShippingTier[] = [
  {
    id: 'STANDARD',
    name: 'PostNL Standard Parcel',
    carrier: 'PostNL with Track & Trace',
    duration: '3–4 business days',
    costEur: 4.95,
  },
  {
    id: 'EXPRESS',
    name: 'PostNL Express Priority',
    carrier: 'PostNL Next-Day Express',
    duration: '1–2 business days',
    costEur: 8.50,
    highlight: 'Fast Nationwide',
  },
  {
    id: 'COURIER_RANDSTAD',
    name: 'Randstad Eco Cargo Bike Courier',
    carrier: 'Direct Urban Cargo Courier',
    duration: 'Same-day / Next-day (Within 24h)',
    costEur: 14.50,
    highlight: 'Same-Day Randstad (AMS / UTR / DHG)',
    availableCities: ['Amsterdam', 'Utrecht', 'The Hague', 'Rotterdam'],
  },
  {
    id: 'PICKUP',
    name: 'Free Studio Pickup',
    carrier: 'PrintLab Hub Amsterdam / Utrecht Science Park',
    duration: 'Ready in 24–48h',
    costEur: 0.00,
    highlight: 'Zero Shipping Fee',
  },
];

export function getInfillFactor(infillPercentage: number): number {
  if (infillPercentage <= 15) return 0.35; // Shells + 15% infill
  if (infillPercentage <= 40) return 0.58; // Thicker walls + 40% infill
  return 1.0; // 100% solid
}

export function getColorMultiplier(colorCount: number): number {
  switch (colorCount) {
    case 1:
      return 1.0;
    case 2:
      return 1.25;
    case 3:
      return 1.50;
    case 4:
    default:
      return 1.75;
  }
}

export interface PriceCalculationInput {
  volumeCm3: number;
  dimensions: Dimensions;
  material: MaterialType;
  infillPercentage: number;
  colorCount: number;
  deliverySpeed: 'STANDARD' | 'EXPRESS' | 'COURIER_RANDSTAD' | 'PICKUP';
  isStudent?: boolean;
}

export interface DetailedPriceBreakdown {
  volumeCm3: number;
  weightGrams: number;
  estimatedPrintTimeMinutes: number;
  baseSetupFeeEur: number;
  materialCostEur: number;
  machineCostEur: number;
  colorMultiplier: number;
  productionSubtotalEur: number;
  studentDiscountEur: number;
  shippingCostEur: number;
  totalPriceEur: number;
}

export function calculatePrintPrice(input: PriceCalculationInput): DetailedPriceBreakdown {
  const {
    volumeCm3,
    dimensions,
    material,
    infillPercentage,
    colorCount,
    deliverySpeed,
    isStudent = false,
  } = input;

  const matConfig = MATERIALS[material] || MATERIALS.PLA;
  const infillFactor = getInfillFactor(infillPercentage);

  // Filament weight calculation
  const weightGrams = Math.max(1, Math.round(volumeCm3 * matConfig.density * infillFactor * 10) / 10);
  const materialCostEur = Math.round(weightGrams * matConfig.ratePerGram * 100) / 100;

  // Print time estimation: deposition rate ~ 14 cm3/hr + layer height count
  const zHeightMm = Math.max(5, dimensions.z || 20);
  const effectiveVolume = volumeCm3 * infillFactor;
  const rawHours = (effectiveVolume / 13) + (zHeightMm / 85);
  // Add slight overhead for resin or multi-color tool switches
  const colorSwitchesOverhead = (colorCount - 1) * 0.4;
  const totalHours = Math.max(0.4, rawHours + colorSwitchesOverhead);
  const estimatedPrintTimeMinutes = Math.round(totalHours * 60);

  const machineCostEur = Math.round(totalHours * MACHINE_RATE_PER_HOUR_EUR * 100) / 100;
  const colorMultiplier = getColorMultiplier(colorCount);

  // Subtotal before color multiplier and setup
  const baseManufacturing = (BASE_SETUP_FEE_EUR + materialCostEur + machineCostEur) * colorMultiplier;
  const roundedManufacturing = Math.round(baseManufacturing * 100) / 100;

  // Student perk: 15% off manufacturing
  const studentDiscountEur = isStudent
    ? Math.round(roundedManufacturing * (STUDENT_DISCOUNT_PERCENT / 100) * 100) / 100
    : 0;

  const manufacturingAfterDiscount = Math.max(5.00, roundedManufacturing - studentDiscountEur);

  // Shipping
  const shippingTier = SHIPPING_TIERS.find((t) => t.id === deliverySpeed) || SHIPPING_TIERS[0];
  const shippingCostEur = shippingTier.costEur;

  const totalPriceEur = Math.round((manufacturingAfterDiscount + shippingCostEur) * 100) / 100;

  return {
    volumeCm3: Math.round(volumeCm3 * 10) / 10,
    weightGrams,
    estimatedPrintTimeMinutes,
    baseSetupFeeEur: BASE_SETUP_FEE_EUR,
    materialCostEur,
    machineCostEur,
    colorMultiplier,
    productionSubtotalEur: roundedManufacturing,
    studentDiscountEur,
    shippingCostEur,
    totalPriceEur,
  };
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
}
