export type OrderType = 'DIRECT_PRINT' | 'DESIGN_AND_PRINT';

// Simple materials requested: Standard, Tough, Smooth Resin (with backward compatibility)
export type SimpleMaterialType = 'STANDARD' | 'TOUGH' | 'RESIN';
export type MaterialType = SimpleMaterialType | 'PLA' | 'PETG' | 'TPU' | 'ABS';

export type SimpleColorOption = 'SINGLE' | 'MULTI';

export interface Dimensions {
  x: number; // mm (Length/Width)
  y: number; // mm (Depth/Width)
  z: number; // mm (Height)
}

export type DeliverySpeedOption = 'STANDARD' | 'COURIER_RANDSTAD' | 'PICKUP';

export interface DirectPrintQuote {
  fileUrl: string;
  fileName: string;
  baseDimensions: Dimensions; // unscaled dimensions
  dimensions: Dimensions; // scaled dimensions
  scaleFactor: number; // e.g. 0.5, 1.0, 1.5
  baseVolumeCm3: number; // unscaled
  volumeCm3: number; // scaled
  material: MaterialType;
  colorOption: SimpleColorOption;
  colorCount: number; // 1 or 2+
  deliverySpeed: DeliverySpeedOption;
  estimatedWeightGrams: number;
  estimatedPrintTimeMinutes: number;
  estimatedDeliveryDate: string;
  baseSetupFeeEur: number;
  materialCostEur: number;
  machineCostEur: number;
  colorMultiplier: number;
  shippingCostEur: number;
  calculatedPriceEur: number;
  specialInstructions?: string;
}

export interface DesignRequestQuote {
  referenceImages: string[];
  referenceLinks?: string;
  description: string;
  targetDimensions: Dimensions;
  customerNotes?: string;
  estimatedComplexity: 'SIMPLE' | 'MEDIUM' | 'COMPLEX' | 'CUSTOM_FULL';
  benchmarkCardId?: string;
  status: 'PENDING_REVIEW' | 'QUOTED' | 'ACCEPTED' | 'REJECTED';
  quotedPriceEur?: number;
  estimatedTurnaroundDays?: number;
  engineerNotes?: string;
}

export type PriorityCity = 'Haarlem' | 'Amsterdam' | 'Utrecht' | 'The Hague' | 'Other';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone?: string;
  city: PriorityCity;
  address: string;
  postalCode?: string;
  notes?: string;
}

export type OrderStatus =
  | 'QUOTE_SUBMITTED'
  | 'APPROVED'
  | 'IN_PRODUCTION'
  | 'DISPATCHED'
  | 'COMPLETED';

export interface CustomerOrder {
  id: string;
  createdAt: string;
  type: OrderType;
  customer: CustomerDetails;
  details: DirectPrintQuote | DesignRequestQuote;
  status: OrderStatus;
  paymentMethod?: 'ideal' | 'card';
  notes?: string;
}

export interface MaterialOption {
  id: MaterialType;
  name: string;
  simpleName: string;
  density: number; // g/cm3
  ratePerGram: number; // EUR/g
  description: string;
  tag: string;
  finish: string;
  colorSwatch: string;
  colorHex: number;
  accentColor?: string;
  tensileStrength?: string;
  tempResistance?: string;
  bestFor?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  avatarInitials: string;
  verifiedOrder: string;
}

export interface DesignBenchmarkCard {
  id: string;
  tierNumber: number;
  title: string;
  priceRange: string;
  turnaround: string;
  description: string;
  idealFor: string;
  exampleParts: string[];
  iconType: 'clip' | 'enclosure' | 'bracket' | 'custom';
}

export interface BenchmarkPortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  material: MaterialType;
  dimensions: Dimensions;
  printDurationHours: number;
  priceEur: number;
  clientType: string;
  city: string;
  description: string;
}
