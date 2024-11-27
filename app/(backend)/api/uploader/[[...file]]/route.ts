import { NextRequest, NextResponse } from 'next/server';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import axios from 'axios';

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://asepharyana.cloud';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadToPomf2(buffer);

    if (!uploadResult) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const formattedUrl = `${PRODUCTION_URL}/api/uploader/${uploadResult.fileName}`;
    return NextResponse.json({ url: formattedUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
  }
}

type Pomf2Response = {
  success: boolean;
  error?: string;
  files: Array<{ url: string }>;
};

async function uploadToPomf2(buffer: Buffer): Promise<{ url: string; fileName: string }> {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || {
    ext: 'bin',
    mime: 'application/octet-stream'
  };

  const form = new FormData();
  const fileName = `upload_${Date.now()}.${ext}`;
  form.append('files[]', buffer, {
    filename: fileName,
    contentType: mime
  });

  const res = await axios.post('https://pomf2.lain.la/upload.php', form, {
    headers: form.getHeaders()
  });

  const json = res.data as Pomf2Response;
  if (!json.success) throw new Error(json.error || 'Upload failed');

  const uploadedFileName = json.files[0].url.split('/').pop() || fileName;
  return {
    url: json.files[0].url,
    fileName: uploadedFileName
  };
}

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.pathname.split('/').slice(-1)[0];

  if (!fileName) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const originalUrl = `https://pomf2.lain.la/f/${fileName}`;
  const response = await axios.get(originalUrl, { responseType: 'arraybuffer' });

  if (response.status !== 200) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status });
  }

  const contentType = response.headers['content-type'] || 'application/octet-stream';
  const buffer = Buffer.from(response.data);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${fileName}"`
    }
  });
}
