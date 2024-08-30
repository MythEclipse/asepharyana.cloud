import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/GetData/GetData';
import { ANIMEAPI } from '@/lib/url';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || slug || '1';
  let OngoingAnimeData: any;

  try {
    OngoingAnimeData = await getData(`${ANIMEAPI}/v1/ongoing-anime/${page}`);
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
}
