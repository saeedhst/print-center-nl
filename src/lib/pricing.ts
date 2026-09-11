import { DeliverySpeedOption, Dimensions, MaterialOption, MaterialType, SimpleColorOption } from '@/types';

export const SIMPLE_MATERIALS: Record<string, MaterialOption> = {
  STANDARD: {
    id: 'STANDARD',
    name: 'Standard (PLA)',
    simpleName: 'Standard',
    density: 1.24,
    ratePerGram: 0.08,
    description: 'Clean surface finish, rigid, and eco-friendly. Ideal for visual prototypes, scale models, and household items.',
    tag: 'Most Popular',
    finish: 'Smooth matte-satin',
    colorSwatch: '#64748b', // clean slate
    colorHex: 0xf1f5f9,
  },
  TOUGH: {
    id: 'TOUGH',
    name: 'Tough (PETG / Engineering)',
    simpleName: 'Tough',
    density: 1.27,
    ratePerGram: 0.10,
    description: 'High impact resistance, chemical stability, and weatherproof. Perfect for functional brackets and moving parts.',
    tag: 'High Strength',
    finish: 'Durable semi-gloss',
    colorSwatch: '#ea580c', // modern orange
    colorHex: 0xea580c,
  },
  RESIN: {
    id: 'RESIN',
    name: 'Smooth Resin (SLA Photopolymer)',
    simpleName: 'Smooth Resin',
    density: 1.15,
    ratePerGram: 0.18,
    description: 'Microscopic 0.03mm layer height for ultra-smooth, injection-molded precision with razor-sharp detailing.',
    tag: 'Ultra Detail',
    finish: 'Ultra-smooth glass-like',
    colorSwatch: '#0284c7', // cobalt
    colorHex: 0x94a3b8,
  },
};

// Aliases for any legacy references
export const MATERIALS: Record<string, MaterialOption> = {
  ...SIMPLE_MATERIALS,
  PLA: SIMPLE_MATERIALS.STANDARD,
  PETG: SIMPLE_MATERIALS.TOUGH,
  ABS: SIMPLE_MATERIALS.TOUGH,
  TPU: SIMPLE_MATERIALS.TOUGH,
};

export const BASE_SETUP_FEE_EUR = 3.50;
export const MACHINE_RATE_PER_HOUR_EUR = 2.40;

export interface ShippingTier {
  id: DeliverySpeedOption;
  name: string;
  carrier: string;
  duration: string;
  costEur: number;
  highlight?: string;
}

export const DELIVERY_OPTIONS: ShippingTier[] = [
  {
    id: 'STANDARD',
    name: 'Standard Delivery (PostNL / DHL)',
    carrier: 'PostNL & DHL Parcel Network',
    duration: '2–3 working days',
    costEur: 4.95,
  },
  {
    id: 'COURIER_RANDSTAD',
    name: 'Fast Randstad Courier (Haarlem, Amsterdam, Utrecht)',
    carrier: 'Direct Urban Bike & Electric Van Courier',
    duration: 'Dispatched in 1 working day',
    costEur: 12.50,
    highlight: 'Dispatched in 1 working day',
  },
  {
    id: 'PICKUP',
    name: 'Local Pick-up (Studio Amsterdam / Haarlem)',
    carrier: 'Self-pickup at studio counter',
    duration: 'Ready tomorrow at 14:00',
    costEur: 0.00,
    highlight: 'Free',
  },
];

export function getDeliveryDateString(option: DeliverySpeedOption): string {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday

  if (option === 'COURIER_RANDSTAD') {
    return 'Tomorrow by 18:00 (1 working day)';
  } else if (option === 'PICKUP') {
    return 'Tomorrow afternoon from 14:00';
  } else {
    // 2-3 days
    const target = new Date();
    target.setDate(now.getDate() + 3);
    return target.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
}

export interface CalculatePriceInput {
  baseVolumeCm3: number;
  baseDimensions: Dimensions;
  scaleFactor: number; // e.g. 0.5, 1.0, 1.5
  material: MaterialType;
  colorOption: SimpleColorOption;
  deliverySpeed: DeliverySpeedOption;
}

export interface PriceBreakdownResult {
  scaledDimensions: Dimensions;
  scaledVolumeCm3: number;
  weightGrams: number;
  estimatedPrintTimeMinutes: number;
  estimatedDeliveryDate: string;
  baseSetupFeeEur: number;
  materialCostEur: number;
  machineCostEur: number;
  colorMultiplier: number;
  shippingCostEur: number;
  productionSubtotalEur: number;
  totalPriceEur: number;
}

export function calculatePrintPrice(input: CalculatePriceInput): PriceBreakdownResult {
  const {
    baseVolumeCm3,
    baseDimensions,
    scaleFactor,
    material,
    colorOption,
    deliverySpeed,
  } = input;

  const validScale = Math.max(0.1, Math.min(3.0, scaleFactor || 1.0));

  // Scale dimensions linearly
  const scaledDimensions: Dimensions = {
    x: Math.round(baseDimensions.x * validScale * 10) / 10,
    y: Math.round(baseDimensions.y * validScale * 10) / 10,
    z: Math.round(baseDimensions.z * validScale * 10) / 10,
  };

  // Scale volume cubically (scale^3)
  const rawScaledVolume = baseVolumeCm3 * Math.pow(validScale, 3);
  const scaledVolumeCm3 = Math.max(0.1, Math.round(rawScaledVolume * 10) / 10);

  // Material configuration
  const matKey = (material in SIMPLE_MATERIALS ? material : 'STANDARD');
  const mat = SIMPLE_MATERIALS[matKey] || SIMPLE_MATERIALS.STANDARD;

  // Weight calculation (infill factor standard ~0.35)
  const weightGrams = Math.max(1, Math.round(scaledVolumeCm3 * mat.density * 0.38 * 10) / 10);
  const materialCostEur = Math.round(weightGrams * mat.ratePerGram * 100) / 100;

  // Print time estimation
  const zHeightMm = Math.max(5, scaledDimensions.z);
  const rawHours = (scaledVolumeCm3 * 0.38 / 14) + (zHeightMm / 75);
  const estHours = Math.max(0.3, rawHours);
  const estimatedPrintTimeMinutes = Math.round(estHours * 60);

  const machineCostEur = Math.round(estHours * MACHINE_RATE_PER_HOUR_EUR * 100) / 100;
  const colorMultiplier = colorOption === 'MULTI' ? 1.35 : 1.0;

  const productionSubtotalEur = Math.round((BASE_SETUP_FEE_EUR + materialCostEur + machineCostEur) * colorMultiplier * 100) / 100;

  const shippingOption = DELIVERY_OPTIONS.find((d) => d.id === deliverySpeed) || DELIVERY_OPTIONS[0];
  const shippingCostEur = shippingOption.costEur;

  const totalPriceEur = Math.round((productionSubtotalEur + shippingCostEur) * 100) / 100;
  const estimatedDeliveryDate = getDeliveryDateString(deliverySpeed);

  return {
    scaledDimensions,
    scaledVolumeCm3,
    weightGrams,
    estimatedPrintTimeMinutes,
    estimatedDeliveryDate,
    baseSetupFeeEur: BASE_SETUP_FEE_EUR,
    materialCostEur,
    machineCostEur,
    colorMultiplier,
    shippingCostEur,
    productionSubtotalEur,
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
