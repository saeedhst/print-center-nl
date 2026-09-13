import { NextRequest, NextResponse } from 'next/server';
import { parseModelUrl } from '@/services/providers/urlParser';
import { importMakerWorldModel } from '@/services/providers/makerworld';
import { importPrintablesModel } from '@/services/providers/printables';
import { importThingiverseModel } from '@/services/providers/thingiverse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid URL string is required.' },
        { status: 400 }
      );
    }

    const parsed = parseModelUrl(url);
    if (!parsed.isValid || !parsed.provider || !parsed.modelId) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error || 'Invalid or unsupported 3D model URL.',
        },
        { status: 400 }
      );
    }

    let result;
    switch (parsed.provider) {
      case 'makerworld':
        result = await importMakerWorldModel(parsed.modelId, parsed.cleanUrl);
        break;
      case 'printables':
        result = await importPrintablesModel(parsed.modelId, parsed.cleanUrl);
        break;
      case 'thingiverse':
        result = await importThingiverseModel(parsed.modelId, parsed.cleanUrl);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported provider.' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/models/import-url error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An internal error occurred while importing model.',
      },
      { status: 500 }
    );
  }
}
