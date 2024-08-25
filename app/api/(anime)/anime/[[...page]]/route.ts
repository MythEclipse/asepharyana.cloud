import { useFetch } from '../../../../../lib/useFetch';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

export async function GET(req: NextRequest, { params }: { params: { page: string } }) {
  const { page } = params;

  // Validasi parameter page
  // const pageNumber = parseInt(page, 10);
  // if (isNaN(pageNumber) || pageNumber <= 0) {
  //   return NextResponse.json({ msg: 'Invalid page number' }, { status: 400 });
  // }

  try {
    const { data, status } = await useFetch(`https://otakudesu.cloud/ongoing-anime/page/${page}`);

    if (status !== 200) throw new Error(`Error ${status}`);

    const $ = cheerio.load(data);
    const $parentElement = $('#venkonten > div > div.venser > div.venutama > div.rseries > div > div.venz > ul > li');

    const list = $parentElement
      .map((i, el) => {
        const title = $(el).find('div > div.thumb > a > div > h2').text();
        const thumbnail = $(el).find('div > div.thumb > a > div > img').attr('src');
        const episode = $(el).find('div > div.epz').text();
        const temp = $(el).find('div > div.thumb > a').attr('href')?.split('/');

        return {
          id: temp?.[temp.length - 2],
          title,
          thumbnail,
          episode
        };
      })
      .get();

    return NextResponse.json({ status: 200, success: true, data: list }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
