export type OrderType = 'DIRECT_PRINT' | 'DESIGN_AND_PRINT';
export type MaterialType = 'PLA' | 'PETG' | 'TPU' | 'ABS' | 'RESIN';

export interface Dimensions {
  x: number; // mm
  y: number; // mm
  z: number; // mm
}

export interface DirectPrintQuote {
  fileUrl: string;
  fileName: string;
  volumeCm3: number;
  dimensions: Dimensions;
  material: MaterialType;
  infillPercentage: number; // e.g. 15, 40, 100
  colorCount: number; // 1, 2, 3, 4+
  deliverySpeed: 'STANDARD' | 'EXPRESS' | 'COURIER_RANDSTAD' | 'PICKUP';
  estimatedWeightGrams: number;
  estimatedPrintTimeMinutes: number;
  baseSetupFeeEur: number;
  materialCostEur: number;
  machineCostEur: number;
  colorMultiplier: number;
  shippingCostEur: number;
  studentDiscountEur: number;
  calculatedPriceEur: number;
  specialInstructions?: string;
}

export type DesignComplexity = 'SIMPLE' | 'MEDIUM' | 'COMPLEX';
export type DesignQuoteStatus = 'PENDING_REVIEW' | 'QUOTED' | 'ACCEPTED' | 'REJECTED';

export interface DesignRequestQuote {
  referenceImages: string[];
  description: string;
  targetDimensions: Dimensions;
  functionalRequirements?: string;
  intendedUse?: 'functional' | 'decorative' | 'heat-resistant' | 'flexible';
  estimatedComplexity: DesignComplexity;
  status: DesignQuoteStatus;
  quotedPriceEur?: number;
  estimatedTurnaroundDays?: number;
  engineerNotes?: string;
}

export type DutchCity = 'Amsterdam' | 'Utrecht' | 'The Hague' | 'Rotterdam' | 'Delft' | 'Eindhoven' | 'Other';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  city: 'Amsterdam' | 'Utrecht' | 'The Hague' | 'Other';
  address: string;
  postalCode?: string;
  isStudent: boolean;
  studentInstitution?: string;
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
  notes?: string;
}

export interface MaterialOption {
  id: MaterialType;
  name: string;
  density: number; // g/cm3
  ratePerGram: number; // EUR/g
  description: string;
  tag: string;
  accentColor: string;
  finish: string;
  bestFor: string;
  tensileStrength: string;
  tempResistance: string;
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
  clientType: 'Student' | 'Architecture Firm' | 'Engineering Lab' | 'Consumer';
  city: string;
  description: string;
}
