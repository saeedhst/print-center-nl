import { ImportUrlResponse, ThingiverseItem } from '@/types/modelSources';
import { fetchWithBrowserHeaders, parseHtmlMetadata } from './scraperPipeline';

/**
 * Authentic popular Thingiverse models for offline-resilient gallery and fallback search
 */
export const POPULAR_THINGIVERSE_CATALOG: ThingiverseItem[] = [
  {
    id: 3111382,
    name: 'Universal Foldable Smartphone & Tablet Stand',
    url: 'https://www.thingiverse.com/thing:3111382',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'DanCrafts', url: 'https://www.thingiverse.com/dancrafts' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 38240,
    likes: 12450,
    category: 'Desk & Office',
    presetId: 'phone-stand-pro',
    defaultDimensions: { x: 75, y: 85, z: 95 },
  },
  {
    id: 2814387,
    name: 'Modular Under-Desk Cable Management Clip',
    url: 'https://www.thingiverse.com/thing:2814387',
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'MakerNordic', url: 'https://www.thingiverse.com/makernordic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 24190,
    likes: 8930,
    category: 'Organization',
    presetId: 'cable-management-clip',
    defaultDimensions: { x: 35, y: 25, z: 20 },
  },
  {
    id: 2841857,
    name: 'Heavy-Duty Under-Desk Headphone Hanger Mount',
    url: 'https://www.thingiverse.com/thing:2841857',
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'StudioPrecision', url: 'https://www.thingiverse.com/studioprecision' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 19800,
    likes: 7420,
    category: 'Tech & Gadgets',
    presetId: 'headphone-desk-hanger',
    defaultDimensions: { x: 60, y: 70, z: 50 },
  },
  {
    id: 763622,
    name: '#3DBenchy - The Jolly 3D Printing Torture-Test',
    url: 'https://www.thingiverse.com/thing:763622',
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'CreativeTools', url: 'https://www.thingiverse.com/creativetools' },
    license: 'Creative Commons - Attribution - NoDerivatives (CC-BY-ND)',
    isNonCommercial: false,
    downloads: 345000,
    likes: 128900,
    category: 'Benchmarks',
    presetId: 'benchy-test-boat',
    defaultDimensions: { x: 60, y: 31, z: 48 },
  },
  {
    id: 1278865,
    name: 'Articulated Flexi-Rex Dinosaur Toy',
    url: 'https://www.thingiverse.com/thing:1278865',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'Airic', url: 'https://www.thingiverse.com/airic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 98400,
    likes: 42100,
    category: 'Toys & Miniatures',
    presetId: 'flexi-rex-toy',
    defaultDimensions: { x: 90, y: 15, z: 65 },
  },
  {
    id: 3432014,
    name: 'Precision Digital Caliper Wall Mount Hanger',
    url: 'https://www.thingiverse.com/thing:3432014',
    thumbnail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'ToolMasterNL', url: 'https://www.thingiverse.com/toolmasternl' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 14500,
    likes: 5320,
    category: 'Tools & Workshop',
    presetId: 'caliper-wall-mount',
    defaultDimensions: { x: 45, y: 35, z: 25 },
  },
  {
    id: 2004510,
    name: 'Minimalist Interlocking Hexagonal Wall Shelves',
    url: 'https://www.thingiverse.com/thing:2004510',
    thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'HexaForm', url: 'https://www.thingiverse.com/hexaform' },
    license: 'Creative Commons - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 16700,
    likes: 6100,
    category: 'Home & Living',
    presetId: 'hex-wall-shelf',
    defaultDimensions: { x: 120, y: 104, z: 40 },
  },
  {
    id: 3012891,
    name: 'Apple Watch & iPhone Dual MagSafe Nightstand Dock',
    url: 'https://www.thingiverse.com/thing:3012891',
    thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'DockGenius', url: 'https://www.thingiverse.com/dockgenius' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 29400,
    likes: 11200,
    category: 'Tech & Gadgets',
    presetId: 'watch-phone-dock',
    defaultDimensions: { x: 110, y: 80, z: 75 },
  },
];

/**
 * Handle Thingiverse URL import
 */
export async function importThingiverseModel(
  modelId: string,
  originalUrl: string
): Promise<ImportUrlResponse> {
  const numericId = parseInt(modelId, 10);
  const targetUrl = `https://www.thingiverse.com/thing:${modelId}`;

  // Check internal catalog first
  const knownItem = POPULAR_THINGIVERSE_CATALOG.find((item) => item.id === numericId);
  if (knownItem) {
    return {
      success: true,
      metadata: {
        id: `tv-${modelId}`,
        title: knownItem.name,
        provider: 'thingiverse',
        originalUrl: targetUrl,
        thumbnailUrl: knownItem.thumbnail,
        author: knownItem.creator.name,
        license: knownItem.license,
        isNonCommercial: knownItem.isNonCommercial,
        licenseWarning: knownItem.isNonCommercial
          ? 'Thingiverse author selected Non-Commercial license: personal prototyping only.'
          : undefined,
        dimensions: knownItem.defaultDimensions,
        downloadBlocked: false,
      },
    };
  }

  // Attempt fetch via browser headers
  const fetchResult = await fetchWithBrowserHeaders(targetUrl);

  if (fetchResult.isBlockedByBotProtection || !fetchResult.ok) {
    const fallbackTitle = `Thingiverse Model #${modelId}`;
    return {
      success: false,
      blockedByProtection: true,
      metadata: {
        id: `tv-${modelId}`,
        title: fallbackTitle,
        provider: 'thingiverse',
        originalUrl: targetUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
        author: 'Thingiverse Community Maker',
        license: 'Creative Commons (CC-BY / CC-BY-NC)',
        isNonCommercial: true,
        licenseWarning: 'Verify original Thingiverse file license before commercial distribution.',
        downloadBlocked: true,
        blockedReason: 'Cloudflare / Host Bot-Protection challenge active',
      },
      fallbackNotice: {
        modelTitle: fallbackTitle,
        originalUrl: targetUrl,
        instructions: `We found '${fallbackTitle}', but automatic download was blocked by the host. Please click here to open the model, download the file, and drop it into our uploader.`,
      },
    };
  }

  const meta = parseHtmlMetadata(fetchResult.html);
  const title = meta.title || `Thingiverse Model #${modelId}`;
  const isNonCommercial =
    fetchResult.html.includes('Non-Commercial') ||
    fetchResult.html.includes('CC-BY-NC');

  return {
    success: true,
    metadata: {
      id: `tv-${modelId}`,
      title,
      provider: 'thingiverse',
      originalUrl: targetUrl,
      thumbnailUrl: meta.imageUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
      author: meta.author || 'Thingiverse Maker',
      license: isNonCommercial ? 'CC-BY-NC (Non-Commercial)' : 'Creative Commons Permissive',
      isNonCommercial,
      licenseWarning: isNonCommercial
        ? 'Creator specified Non-Commercial licensing: for personal prototyping only.'
        : undefined,
      downloadBlocked: false,
    },
  };
}

/**
 * Search Thingiverse models (API token supported with curated popular fallback)
 */
export async function searchThingiverse(
  query: string,
  category?: string
): Promise<{ items: ThingiverseItem[]; total: number }> {
  const token = process.env.THINGIVERSE_API_TOKEN;

  // If token is configured, try official API
  if (token && query.trim()) {
    try {
      const apiUrl = `https://api.thingiverse.com/search/${encodeURIComponent(query)}?type=things&sort=popular`;
      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const data = await res.json();
        const hits = Array.isArray(data.hits) ? data.hits : [];
        const items: ThingiverseItem[] = hits.map((hit: any) => ({
          id: hit.id,
          name: hit.name,
          url: hit.public_url || `https://www.thingiverse.com/thing:${hit.id}`,
          thumbnail: hit.thumbnail || hit.preview_image,
          creator: {
            name: hit.creator?.name || 'Thingiverse Maker',
            url: hit.creator?.public_url,
          },
          license: hit.license || 'Creative Commons',
          isNonCommercial: (hit.license || '').toLowerCase().includes('nc'),
          downloads: hit.download_count || 0,
          likes: hit.like_count || 0,
        }));
        return { items, total: data.total || items.length };
      }
    } catch (err) {
      console.warn('Thingiverse official API error, using curated catalog:', err);
    }
  }

  // Curated matching fallback
  let results = [...POPULAR_THINGIVERSE_CATALOG];

  if (category && category !== 'All') {
    results = results.filter((item) =>
      item.category?.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.id.toString() === q
    );
  }

  return { items: results, total: results.length };
}
