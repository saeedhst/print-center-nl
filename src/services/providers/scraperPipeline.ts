import * as cheerio from 'cheerio';

const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

export interface FetchedHtmlResult {
  ok: boolean;
  status: number;
  html: string;
  isBlockedByBotProtection: boolean;
  blockedReason?: string;
}

export async function fetchWithBrowserHeaders(
  url: string,
  timeoutMs = 10000
): Promise<FetchedHtmlResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': BROWSER_USER_AGENT,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8',
        'Sec-Ch-Ua': '"Chromium";v="123", "Not:A-Brand";v="8"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      },
      signal: controller.signal,
      redirect: 'follow',
      cache: 'no-store',
    });

    const text = await res.text();
    const isChallenge =
      res.status === 403 ||
      res.status === 503 ||
      res.headers.get('cf-mitigated') === 'challenge' ||
      text.includes('Just a moment...') ||
      text.includes('__cf_chl_opt') ||
      text.includes('challenges.cloudflare.com');

    return {
      ok: res.ok && !isChallenge,
      status: res.status,
      html: text,
      isBlockedByBotProtection: isChallenge,
      blockedReason: isChallenge ? 'Host Cloudflare/Bot-protection triggered' : undefined,
    };
  } catch (error: unknown) {
    const isAbort = (error as { name?: string })?.name === 'AbortError';
    return {
      ok: false,
      status: isAbort ? 408 : 500,
      html: '',
      isBlockedByBotProtection: isAbort,
      blockedReason: isAbort ? 'Request timed out after 10s' : 'Network error connecting to host',
    };
  } finally {
    clearTimeout(timer);
  }
}

export interface ExtractedPageMeta {
  title?: string;
  description?: string;
  imageUrl?: string;
  author?: string;
  license?: string;
  ldJson?: Record<string, unknown>;
}

export function parseHtmlMetadata(html: string): ExtractedPageMeta {
  if (!html) return {};

  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text().replace(/\s*\|\s*(Thingiverse|Printables|MakerWorld).*/i, '').trim();

  const description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content');

  let imageUrl =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content');

  // Try to find author
  const author =
    $('meta[name="author"]').attr('content') ||
    $('[rel="author"]').text().trim() ||
    undefined;

  // Try to parse structured JSON-LD
  let ldJson: Record<string, unknown> | undefined;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html() || '{}');
      if (parsed['@type'] === 'Product' || parsed['@type'] === 'VisualArtwork' || parsed['name']) {
        ldJson = parsed;
      }
    } catch {
      // ignore
    }
  });

  return {
    title: title || undefined,
    description: description || undefined,
    imageUrl: imageUrl || undefined,
    author,
    ldJson,
  };
}
