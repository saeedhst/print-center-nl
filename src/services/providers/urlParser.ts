import { ModelSourceProvider } from '@/types/modelSources';

export interface ParsedModelUrl {
  isValid: boolean;
  provider: ModelSourceProvider | null;
  modelId: string | null;
  cleanUrl: string;
  error?: string;
}

// Regex patterns for supported providers
const MAKERWORLD_REGEX = /(?:https?:\/\/)?(?:www\.)?makerworld\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?models\/(\d+)/i;
const PRINTABLES_REGEX = /(?:https?:\/\/)?(?:www\.)?printables\.com\/(?:[a-z]{2}\/)?model\/(\d+)(?:-[\w-]+)?/i;
const THINGIVERSE_REGEX = /(?:https?:\/\/)?(?:www\.)?thingiverse\.com\/thing:(\d+)/i;

/**
 * Fast real-time provider detector for input fields
 */
export function detectProviderFromUrl(input: string): ModelSourceProvider | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.includes('makerworld.com')) return 'makerworld';
  if (trimmed.includes('printables.com')) return 'printables';
  if (trimmed.includes('thingiverse.com')) return 'thingiverse';

  return null;
}

/**
 * Full URL parser with ID extraction and normalization
 */
export function parseModelUrl(input: string): ParsedModelUrl {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      provider: null,
      modelId: null,
      cleanUrl: '',
      error: 'Please enter a 3D model URL.',
    };
  }

  // MakerWorld check
  const mwMatch = trimmed.match(MAKERWORLD_REGEX);
  if (mwMatch && mwMatch[1]) {
    const id = mwMatch[1];
    return {
      isValid: true,
      provider: 'makerworld',
      modelId: id,
      cleanUrl: `https://makerworld.com/en/models/${id}`,
    };
  }

  // Printables check
  const prMatch = trimmed.match(PRINTABLES_REGEX);
  if (prMatch && prMatch[1]) {
    const id = prMatch[1];
    return {
      isValid: true,
      provider: 'printables',
      modelId: id,
      cleanUrl: `https://www.printables.com/model/${id}`,
    };
  }

  // Thingiverse check
  const thMatch = trimmed.match(THINGIVERSE_REGEX);
  if (thMatch && thMatch[1]) {
    const id = thMatch[1];
    return {
      isValid: true,
      provider: 'thingiverse',
      modelId: id,
      cleanUrl: `https://www.thingiverse.com/thing:${id}`,
    };
  }

  // Check if domain was recognized but URL format invalid
  if (trimmed.includes('makerworld.com')) {
    return {
      isValid: false,
      provider: 'makerworld',
      modelId: null,
      cleanUrl: trimmed,
      error: 'Invalid MakerWorld URL format. Expected: makerworld.com/en/models/[id]',
    };
  }

  if (trimmed.includes('printables.com')) {
    return {
      isValid: false,
      provider: 'printables',
      modelId: null,
      cleanUrl: trimmed,
      error: 'Invalid Printables URL format. Expected: printables.com/model/[id]',
    };
  }

  if (trimmed.includes('thingiverse.com')) {
    return {
      isValid: false,
      provider: 'thingiverse',
      modelId: null,
      cleanUrl: trimmed,
      error: 'Invalid Thingiverse URL format. Expected: thingiverse.com/thing:[id]',
    };
  }

  return {
    isValid: false,
    provider: null,
    modelId: null,
    cleanUrl: trimmed,
    error: 'Unsupported website. Supported providers: MakerWorld, Printables, and Thingiverse.',
  };
}
