import { NextRequest, NextResponse } from 'next/server';
import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import fetch from 'node-fetch';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const service = (formData.get('service') as string) || 'telegraph';
    const imgurClientId = formData.get('clientId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let uploadResult: { url: string; fileName: string } | string | undefined;

    switch (service) {
      case 'telegraph':
        uploadResult = await uploadToTelegraph(buffer);
        break;
      case 'pomf2':
        uploadResult = await uploadToPomf2(buffer);
        break;
      case 'imgur':
        if (!imgurClientId) {
          return NextResponse.json({ error: 'Imgur Client ID is required' }, { status: 400 });
        }
        uploadResult = await uploadToImgur(buffer, imgurClientId);
        break;
      case 'fileio':
        uploadResult = await uploadToFileIO(buffer);
        break;
      case 'nyxs':
        uploadResult = await uploadToNyxs(buffer);
        break;
      default:
        return NextResponse.json({ error: 'Invalid service specified' }, { status: 400 });
    }

    if (!uploadResult) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
  }
}

async function uploadToNyxs(buffer: Buffer): Promise<string> {
  const { ext } = (await fileTypeFromBuffer(buffer)) || { ext: 'bin' };
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);

  const response = await axios.post('https://uploader.nyxs.pw/upload', form, {
    headers: { ...form.getHeaders() }
  });

  const $ = cheerio.load(response.data);
  const url = $('a').attr('href');
  if (!url) throw new Error('URL not found in response');
  return url;
}

type Pomf2Response = {
  success: boolean;
  error?: string;
  files: Array<{ url: string }>;
};

type TelegraphResponse = Array<{ src: string }> & { error?: string };

type ImgurResponse = {
  success: boolean;
  data: {
    link: string;
    error?: string;
  };
};

type FileIOResponse = {
  success: boolean;
  link: string;
  message?: string;
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

  const res = await fetch('https://pomf2.lain.la/upload.php', {
    method: 'POST',
    body: form
  });

  const json = (await res.json()) as Pomf2Response;
  if (!json.success) throw new Error(json.error || 'Upload failed');

  const uploadedFileName = json.files[0].url.split('/').pop() || fileName;
  return {
    url: json.files[0].url,
    fileName: uploadedFileName
  };
}

async function uploadToTelegraph(buffer: Buffer): Promise<string> {
  const { ext } = (await fileTypeFromBuffer(buffer)) || { ext: 'bin' };
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);

  const res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  });

  const json = (await res.json()) as TelegraphResponse;
  if (json.error) throw new Error(json.error);
  return 'https://telegra.ph' + json[0].src;
}

async function uploadToImgur(buffer: Buffer, clientId: string): Promise<string> {
  const form = new FormData();
  form.append('image', buffer.toString('base64'));

  const res = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${clientId}`
    },
    body: form
  });

  const json = (await res.json()) as ImgurResponse;
  if (!json.success) throw new Error(json.data.error);
  return json.data.link;
}

async function uploadToFileIO(buffer: Buffer): Promise<string> {
  const form = new FormData();
  form.append('file', buffer);

  const res = await fetch('https://file.io', {
    method: 'POST',
    body: form
  });

  const json = (await res.json()) as FileIOResponse;
  if (!json.success) throw new Error(json.message);
  return json.link;
}
