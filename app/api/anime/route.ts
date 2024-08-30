import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/GetData/GetData';
import { ANIMEAPI } from '@/lib/url';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

export const GET = async (req: NextRequest) => {
  let OngoingAnimeData: any;

  try {
    OngoingAnimeData = await getData(`${ANIMEAPI}/v1/home/`);
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
