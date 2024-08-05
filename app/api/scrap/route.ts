import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET() {
  try {
    // Mengambil konten halaman
    const { data: html } = await axios.get('https://desustream.me/desudesu3/index.php?id=Y3g3SnVkaStDekM5VlFwby9rVC8yNlRYTmNmRTFpTytaWjVjMXZaOElWUT0=');

    // Memparsing HTML dengan cheerio
    const $ = cheerio.load(html);

    // Ambil elemen yang diinginkan menggunakan selector CSS
    console.log

    return NextResponse.json('hi');

  } catch (error) {
    console.error('Error fetching Scrap:', error); // Menampilkan kesalahan di log server
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}
