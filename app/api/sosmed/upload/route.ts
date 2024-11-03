// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import uploadImage from '@/lib/uploadImage';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'Tidak ada file yang diUpload.' }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const response = await uploadImage(buffer);
    if (typeof response !== 'string') {
      throw new Error('Invalid response format');
    }
    const jsonResponse = JSON.parse(response);

    return NextResponse.json(jsonResponse.data, { status: jsonResponse.status });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data file ke database.' }, { status: 500 });
  }
}
