import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/GetData';
import { ANIMEAPI } from '@/lib/url';

const logError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Error:', error);
  }
};

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || slug || 'fantasy'; // Use slug if `q` is not provided
  let data: any;

  try {
    data = await getData(`${ANIMEAPI}/v1/genres/${q}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    logError(error);
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
