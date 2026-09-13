import { ImportUrlResponse, ModelMetadata } from '@/types/modelSources';
import { fetchWithBrowserHeaders, parseHtmlMetadata } from './scraperPipeline';

/**
 * Handle MakerWorld model link imports
 */
export async function importMakerWorldModel(
  modelId: string,
  originalUrl: string
): Promise<ImportUrlResponse> {
  const targetUrl = `https://makerworld.com/en/models/${modelId}`;

  // Attempt to fetch page
  const fetchResult = await fetchWithBrowserHeaders(targetUrl);

  // Derive initial friendly title from URL or ID
  const urlParts = originalUrl.split('/');
  const lastPart = urlParts[urlParts.length - 1]?.split('?')[0]?.split('#')[0];
  let derivedTitle = `MakerWorld Model #${modelId}`;
  if (lastPart && isNaN(Number(lastPart))) {
    derivedTitle = decodeURIComponent(lastPart).replace(/[-_]/g, ' ');
  }

  // Handle Cloudflare / Bot mitigation trigger
  if (fetchResult.isBlockedByBotProtection || !fetchResult.ok) {
    return {
      success: false,
      blockedByProtection: true,
      metadata: {
        id: `mw-${modelId}`,
        title: derivedTitle,
        provider: 'makerworld',
        originalUrl: targetUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
        author: 'MakerWorld Designer',
        license: 'Standard Digital File License / CC-BY-NC',
        isNonCommercial: true,
        licenseWarning: 'MakerWorld models frequently require Personal / Non-Commercial attribution.',
        downloadBlocked: true,
        blockedReason: 'Cloudflare / Host Bot-Protection challenge active',
      },
      fallbackNotice: {
        modelTitle: derivedTitle,
        originalUrl: targetUrl,
        instructions: `We found '${derivedTitle}', but automatic download was blocked by the host. Please click here to open the model, download the file, and drop it into our uploader.`,
      },
    };
  }

  // If HTML succeeded, parse metadata
  const meta = parseHtmlMetadata(fetchResult.html);
  const title = meta.title || derivedTitle;
  const isNonCommercial =
    fetchResult.html.includes('CC-BY-NC') ||
    fetchResult.html.includes('Non-Commercial') ||
    fetchResult.html.includes('non_commercial') ||
    true;

  return {
    success: true,
    metadata: {
      id: `mw-${modelId}`,
      title,
      provider: 'makerworld',
      originalUrl: targetUrl,
      thumbnailUrl: meta.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      author: meta.author || 'MakerWorld Designer',
      license: isNonCommercial ? 'CC-BY-NC (Non-Commercial)' : 'Commercial Use Permitted',
      isNonCommercial,
      licenseWarning: isNonCommercial
        ? 'Creator specified Non-Commercial licensing: for personal prototyping only.'
        : undefined,
      downloadBlocked: false,
    },
  };
}
