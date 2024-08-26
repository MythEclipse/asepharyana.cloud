// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'Tidak ada file yang diUpload.' }, { status: 400 });
  }

  const form = new FormData();
  form.append('file', file);

  try {
    const response = await axios.post('https://roxy.zey.moe/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': 'visitor=true',
        'origin': 'https://roxy.zey.moe',
        'priority': 'u=1, i',
        'referer': 'https://roxy.zey.moe/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data file ke database.' }, { status: 500 });
  }
}
