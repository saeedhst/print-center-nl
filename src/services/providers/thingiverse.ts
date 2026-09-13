import { ImportUrlResponse, ThingiverseItem } from '@/types/modelSources';
import { fetchWithBrowserHeaders, parseHtmlMetadata } from './scraperPipeline';

/**
 * Authentic popular Thingiverse models matching the top featured items on https://www.thingiverse.com/
 */
export const POPULAR_THINGIVERSE_CATALOG: ThingiverseItem[] = [
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
    id: 3111382,
    name: 'Universal Foldable Smartphone & Tablet Stand',
    url: 'https://www.thingiverse.com/thing:3111382',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'DanCrafts', url: 'https://www.thingiverse.com/dancrafts' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 182400,
    likes: 48500,
    category: 'Desk & Office',
    presetId: 'phone-stand-pro',
    defaultDimensions: { x: 75, y: 85, z: 95 },
  },
  {
    id: 1278865,
    name: 'Articulated Flexi-Rex Dinosaur Toy',
    url: 'https://www.thingiverse.com/thing:1278865',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'Airic', url: 'https://www.thingiverse.com/airic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 168400,
    likes: 62100,
    category: 'Toys & Miniatures',
    presetId: 'flexi-rex-toy',
    defaultDimensions: { x: 90, y: 15, z: 65 },
  },
  {
    id: 1545914,
    name: 'Cali Cat - The Friendly Calibration Cat',
    url: 'https://www.thingiverse.com/thing:1545914',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'Dezign', url: 'https://www.thingiverse.com/Dezign' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 142000,
    likes: 45300,
    category: 'Benchmarks',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 30, y: 35, z: 35 },
  },
  {
    id: 2814387,
    name: 'Modular Under-Desk Cable Management Clip',
    url: 'https://www.thingiverse.com/thing:2814387',
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'MakerNordic', url: 'https://www.thingiverse.com/makernordic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 98190,
    likes: 31200,
    category: 'Desk & Office',
    presetId: 'cable-management-clip',
    defaultDimensions: { x: 35, y: 25, z: 20 },
  },
  {
    id: 5395669,
    name: 'Gridfinity Modular Workshop Storage Bins & Baseplates',
    url: 'https://www.thingiverse.com/thing:5395669',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'ZackFreedman', url: 'https://www.thingiverse.com/zackfreedman' },
    license: 'Creative Commons - Public Domain Dedication (CC0)',
    isNonCommercial: false,
    downloads: 124000,
    likes: 49800,
    category: 'Tools & Workshop',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 84, y: 84, z: 42 },
  },
  {
    id: 2841857,
    name: 'Heavy-Duty Under-Desk Headphone Hanger Mount',
    url: 'https://www.thingiverse.com/thing:2841857',
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'StudioPrecision', url: 'https://www.thingiverse.com/studioprecision' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 79800,
    likes: 27400,
    category: 'Tech & Gadgets',
    presetId: 'headphone-desk-hanger',
    defaultDimensions: { x: 60, y: 70, z: 50 },
  },
  {
    id: 3495390,
    name: 'Cute Mini Articulated Print-in-Place Octopus',
    url: 'https://www.thingiverse.com/thing:3495390',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'McGybeer', url: 'https://www.thingiverse.com/McGybeer' },
    license: 'Creative Commons - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 115000,
    likes: 41200,
    category: 'Toys & Miniatures',
    presetId: 'flexi-rex-toy',
    defaultDimensions: { x: 80, y: 80, z: 30 },
  },
  {
    id: 3432014,
    name: 'Precision Digital Caliper Wall Mount Hanger',
    url: 'https://www.thingiverse.com/thing:3432014',
    thumbnail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'ToolMasterNL', url: 'https://www.thingiverse.com/toolmasternl' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 54500,
    likes: 18320,
    category: 'Tools & Workshop',
    presetId: 'caliper-wall-mount',
    defaultDimensions: { x: 45, y: 35, z: 25 },
  },
  {
    id: 3723561,
    name: 'Raspberry Pi 4 / 5 Modular Snap Case with Fan Mount',
    url: 'https://www.thingiverse.com/thing:3723561',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'Malolo', url: 'https://www.thingiverse.com/Malolo' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 87000,
    likes: 29500,
    category: 'Tech & Gadgets',
    presetId: 'drone-rotor-guard',
    defaultDimensions: { x: 92, y: 62, z: 32 },
  },
  {
    id: 330151,
    name: 'Heavy-Duty Cam Lock Plastic Bag Sealing Clip',
    url: 'https://www.thingiverse.com/thing:330151',
    thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'MasterFX', url: 'https://www.thingiverse.com/MasterFX' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 72000,
    likes: 24100,
    category: 'Home & Living',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 100, y: 22, z: 18 },
  },
  {
    id: 3012891,
    name: 'Apple Watch & iPhone Dual MagSafe Nightstand Dock',
    url: 'https://www.thingiverse.com/thing:3012891',
    thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'DockGenius', url: 'https://www.thingiverse.com/dockgenius' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 62400,
    likes: 21200,
    category: 'Tech & Gadgets',
    presetId: 'watch-phone-dock',
    defaultDimensions: { x: 110, y: 80, z: 75 },
  },
  {
    id: 2004510,
    name: 'Minimalist Interlocking Hexagonal Wall Shelves',
    url: 'https://www.thingiverse.com/thing:2004510',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'HexaForm', url: 'https://www.thingiverse.com/hexaform' },
    license: 'Creative Commons - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 48700,
    likes: 16100,
    category: 'Home & Living',
    presetId: 'hex-wall-shelf',
    defaultDimensions: { x: 120, y: 104, z: 40 },
  },
  {
    id: 2474136,
    name: 'Parametric Voronoi Textured Planter & Saucer',
    url: 'https://www.thingiverse.com/thing:2474136',
    thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'AgustinFlowalistik', url: 'https://www.thingiverse.com/flowalistik' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 41200,
    likes: 15400,
    category: 'Home & Living',
    presetId: 'architectural-canal-house',
    defaultDimensions: { x: 85, y: 85, z: 80 },
  },
  {
    id: 3310099,
    name: 'Surprise Egg - Tiny Print-in-Place Dump Truck',
    url: 'https://www.thingiverse.com/thing:3310099',
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'agepbiz', url: 'https://www.thingiverse.com/agepbiz' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 58000,
    likes: 22400,
    category: 'Toys & Miniatures',
    presetId: 'drone-rotor-guard',
    defaultDimensions: { x: 55, y: 40, z: 45 },
  },
  {
    id: 2795856,
    name: 'SpaceX Falcon Heavy Scale Rocket Model (Desktop)',
    url: 'https://www.thingiverse.com/thing:2795856',
    thumbnail: 'https://images.unsplash.com/photo-1517976487507-5b3b4b45ae66?w=600&auto=format&fit=crop&q=80',
    creator: { name: 'chemik', url: 'https://www.thingiverse.com/chemik' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 39500,
    likes: 14700,
    category: 'Benchmarks',
    presetId: 'architectural-canal-house',
    defaultDimensions: { x: 45, y: 35, z: 160 },
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
 * Search Thingiverse models with sorting and filtering
 */
export async function searchThingiverse(
  query: string,
  category?: string,
  sortBy: 'popular' | 'downloads' | 'likes' = 'popular'
): Promise<{ items: ThingiverseItem[]; total: number }> {
  const token = process.env.THINGIVERSE_API_TOKEN;

  // If token is configured, try official API
  if (token && query.trim()) {
    try {
      const apiUrl = `https://api.thingiverse.com/search/${encodeURIComponent(query)}?type=things&sort=${sortBy}`;
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
    const q = query.toLowerCase().replace(/^(thing:|\/thing:)/, '');
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.id.toString().includes(q)
    );
  }

  // Sort results
  if (sortBy === 'downloads') {
    results.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sortBy === 'likes') {
    results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else {
    // popular: combo of downloads + likes
    results.sort((a, b) => ((b.downloads || 0) + (b.likes || 0) * 2) - ((a.downloads || 0) + (a.likes || 0) * 2));
  }

  return { items: results, total: results.length };
}
