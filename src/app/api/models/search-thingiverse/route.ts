import { NextRequest, NextResponse } from 'next/server';
import { searchThingiverse } from '@/services/providers/thingiverse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const sort = (searchParams.get('sort') as 'popular' | 'downloads' | 'likes') || 'popular';
    const commercialOnly = searchParams.get('commercialOnly') === 'true';

    const result = await searchThingiverse(query, category, sort, commercialOnly);
    return NextResponse.json({
      success: true,
      items: result.items,
      total: result.total,
    });
  } catch (error: any) {
    console.error('API /api/models/search-thingiverse error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to search Thingiverse.',
      },
      { status: 500 }
    );
  }
}
