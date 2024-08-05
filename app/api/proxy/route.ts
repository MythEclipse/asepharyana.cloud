// app/api/proxy/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Hapus elemen iklan
    $('.box_item_ads_popup').remove();

    return new NextResponse($.html(), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}
