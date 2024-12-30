import { NextRequest, NextResponse } from 'next/server';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';

const PRODUCTION_URL = 'https://asepharyana.cloud';
const MAX_RETRIES = 3;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await retryUpload(buffer, MAX_RETRIES);

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

interface Pomf2Response {
  success: boolean;
  error?: string;
  files?: { url: string; name: string }[];
}

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

  const res = await fetch('https://pomf2.lain.la/upload.php', {
    method: 'POST',
    body: form as unknown as BodyInit,
    headers: {
      ...form.getHeaders(),
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.8',
      priority: 'u=1, i',
      'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1'
    },
    referrerPolicy: 'no-referrer'
  });

  const json = (await res.json()) as Pomf2Response;
  if (!json.success) throw new Error(json.error || 'Upload failed');

  const uploadedFile = json.files?.[0];
  if (!uploadedFile) throw new Error('No file information returned from upload');

  return { url: uploadedFile.url, fileName: uploadedFile.name };
}

async function retryUpload(buffer: Buffer, retries: number): Promise<{ url: string; fileName: string } | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await uploadToPomf2(buffer);
    } catch (error) {
      console.error(`Upload attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        return null;
      }
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.pathname.split('/').slice(-1)[0];

  if (!fileName) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const originalUrl = `https://pomf2.lain.la/f/${fileName}`;
  const response = await fetch(originalUrl);

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status });
  }

  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  const buffer = Buffer.from(await response.arrayBuffer());

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${fileName}"`
    }
  });
}
