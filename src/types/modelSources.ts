export type ModelSourceProvider =
  | 'makerworld'
  | 'printables'
  | 'thingiverse'
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

export interface ThingiverseFile {
  name: string;
  sizeBytes?: number;
  format: string;
}

export interface ThingiversePrintSettings {
  recommendedMaterial: 'PLA' | 'PETG' | 'ASA';
  recommendedInfillPercent: number;
  layerHeightMm: number;
  supportsRequired: boolean;
}

export interface ThingiverseItem {
  id: number | string;
  name: string;
  url: string;
  thumbnail: string;
  images?: string[];
  description?: string;
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
  files?: ThingiverseFile[];
  printSettings?: ThingiversePrintSettings;
  instructions?: string;
  tags?: string[];
  defaultDimensions?: { x: number; y: number; z: number };
  presetId?: string;
}
