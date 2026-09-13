export type ModelSourceProvider =
  | 'makerworld'
  | 'printables'
  | 'thingiverse'
  | 'catalog'
  | 'upload';

export interface ModelMetadata {
  id: string;
  title: string;
  provider: ModelSourceProvider;
  originalUrl: string;
  thumbnailUrl?: string;
  author?: string;
  license?: string;
  isNonCommercial: boolean;
  licenseWarning?: string;
  fileUrl?: string;
  fileName?: string;
  fileFormat?: 'stl' | 'obj' | '3mf';
  fileSizeBytes?: number;
  downloadBlocked?: boolean;
  blockedReason?: string;
  dimensions?: { x: number; y: number; z: number };
  volumeCm3?: number;
}

export interface FallbackNotice {
  modelTitle: string;
  originalUrl: string;
  instructions: string;
}

export interface ImportUrlResponse {
  success: boolean;
  metadata?: ModelMetadata;
  blockedByProtection?: boolean;
  fallbackNotice?: FallbackNotice;
  error?: string;
}

export interface ThingiverseItem {
  id: number | string;
  name: string;
  url: string;
  thumbnail: string;
  creator: {
    name: string;
    url?: string;
  };
  license: string;
  isNonCommercial: boolean;
  downloads?: number;
  likes?: number;
  category?: string;
  fileUrl?: string;
  defaultDimensions?: { x: number; y: number; z: number };
  presetId?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: 'Office & Desk' | 'Tools & Workshop' | 'Home & Living' | 'Tech & Gadgets';
  description: string;
  thumbnailUrl: string;
  dimensions: { x: number; y: number; z: number };
  volumeCm3: number;
  basePriceEur: number;
  printTimeHours: number;
  recommendedMaterial: 'PLA' | 'PETG' | 'ASA';
  tag: string;
  presetId: string;
}
