import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/GetData';
import { ANIMEAPI } from '@/lib/url';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || 'log horizon';
  let OngoingAnimeData: any;

  try {
    OngoingAnimeData = await getData(`${ANIMEAPI}/v1/search/${q}`);
    return NextResponse.json(OngoingAnimeData, { status: 200 });
  } catch (error: any) {
    logError(error);
    return NextResponse.json(
      {
        status: false,
        message: error.message
      },
      { status: 500 }
    );
  }
};
