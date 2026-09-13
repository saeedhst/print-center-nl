import { ImportUrlResponse } from '@/types/modelSources';
import { fetchWithBrowserHeaders, parseHtmlMetadata } from './scraperPipeline';

/**
 * Handle Printables model link imports
 */
export async function importPrintablesModel(
  modelId: string,
  originalUrl: string
): Promise<ImportUrlResponse> {
  const targetUrl = `https://www.printables.com/model/${modelId}`;

  // Extract model slug from URL if present
  let derivedTitle = `Printables Model #${modelId}`;
  const match = originalUrl.match(/model\/\d+-([\w-]+)/i);
  if (match && match[1]) {
    derivedTitle = match[1]
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // Attempt fetch
  const fetchResult = await fetchWithBrowserHeaders(targetUrl);

  // If Cloudflare blocks automated request
  if (fetchResult.isBlockedByBotProtection || !fetchResult.ok) {
    return {
      success: false,
      blockedByProtection: true,
      metadata: {
        id: `pr-${modelId}`,
        title: derivedTitle,
        provider: 'printables',
        originalUrl: targetUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        author: 'Printables Community Designer',
        license: 'Creative Commons (CC-BY-NC)',
        isNonCommercial: true,
        licenseWarning: 'Prusa / Printables model flagged under Non-Commercial attribution.',
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

  // If successful HTML
  const meta = parseHtmlMetadata(fetchResult.html);
  const title = meta.title || derivedTitle;
  const isNonCommercial =
    fetchResult.html.includes('Non-Commercial') ||
    fetchResult.html.includes('CC-BY-NC') ||
    fetchResult.html.includes('nonCommercial');

  return {
    success: true,
    metadata: {
      id: `pr-${modelId}`,
      title,
      provider: 'printables',
      originalUrl: targetUrl,
      thumbnailUrl: meta.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      author: meta.author || 'Printables Designer',
      license: isNonCommercial ? 'CC-BY-NC (Non-Commercial)' : 'Creative Commons Permissive',
      isNonCommercial,
      licenseWarning: isNonCommercial
        ? 'Creator specified Non-Commercial licensing: for personal prototyping only.'
        : undefined,
      downloadBlocked: false,
    },
  };
}
