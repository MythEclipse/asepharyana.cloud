import { NextRequest, NextResponse } from 'next/server';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import axios from 'axios';

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://asepharyana.cloud';
const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024; // 1GB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 1GB' }, { status: 400 });
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

  try {
    const res = await axios.post('https://pomf2.lain.la/upload.php', form, {
      headers: {
        ...form.getHeaders(),
        Accept: '*/*',
        Origin: 'https://pomf2.lain.la',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      },
      maxContentLength: MAX_FILE_SIZE,
      maxBodyLength: MAX_FILE_SIZE,
      timeout: 600000 // 10 minutes
    });

    const json = res.data as Pomf2Response;
    if (!json.success) throw new Error(json.error || 'Upload failed');

    const uploadedFileName = json.files[0].url.split('/').pop() || fileName;
    return {
      url: json.files[0].url,
      fileName: uploadedFileName
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.pathname.split('/').slice(-1)[0];

  if (!fileName) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const originalUrl = `https://pomf2.lain.la/f/${fileName}`;
  try {
    const response = await axios.get(originalUrl, {
      responseType: 'arraybuffer',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.8',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        priority: 'u=0, i',
        'sec-ch-ua': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      }
    });

    if (response.status !== 200) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status });
    }

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const buffer = Buffer.from(response.data);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
