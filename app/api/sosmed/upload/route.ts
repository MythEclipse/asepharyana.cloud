// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import axios from 'axios';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'Tidak ada file yang diUpload.' }, { status: 400 });
  }

  const content = Buffer.from(await file.arrayBuffer());

  try {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {
      ext: 'bin',
      mime: 'application/octet-stream'
    };

    const uploadForm = new FormData();
    const fileName = `upload_${Date.now()}.${ext}`;

    uploadForm.append('files[]', content, {
      filename: fileName,
      contentType: mime
    });

    const response = await axios.post('https://pomf2.lain.la/upload.php', uploadForm);

    const json = response.data;

    if (!json.success) {
      throw new Error(`Upload failed: ${json.error || 'Unknown error'}`);
    }

    return NextResponse.json(json.files[0], { status: response.status });
  } catch (error) {
    console.error('Upload to Pomf2 failed:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data file ke database.' }, { status: 500 });
  }
}
