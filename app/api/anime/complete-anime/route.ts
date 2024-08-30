import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/GetData/GetData';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app';
  let Data: any;

  try {
    Data = await getData(`${BASEURL}/v1/complete-anime/${page}`);
    return NextResponse.json(Data, { status: 200 });
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
