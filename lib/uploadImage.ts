import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileTypeFromBuffer } from 'file-type';
interface UploadResponse {
  data: string;
}

interface FileType {
  ext: string;
  mime: string;
}

interface Pomf2UploadResponse {
  success: boolean;
  error?: string;
  files: { url: string }[];
}

export default async function uploadToPomf2(content: Buffer): Promise<string | undefined> {
  console.log('Uploading to Pomf2...');

  try {
    const { ext, mime }: FileType = (await fileTypeFromBuffer(content)) || {
      ext: 'bin',
      mime: 'application/octet-stream'
    };

    const formData = new FormData();
    const fileName = `upload_${Date.now()}.${ext || 'bin'}`;

    formData.append('files[]', new Blob([content], { type: mime || 'application/octet-stream' }), fileName);

    const res = await fetch('https://pomf2.lain.la/upload.php', {
      method: 'POST',
      body: formData
    });

    const json: Pomf2UploadResponse = await res.json();

    if (!json.success) {
      throw new Error(`Upload failed: ${json.error || 'Unknown error'}`);
    }

    console.log('Uploaded to Pomf2 successfully!' + json.files[0]?.url);
    return json.files[0]?.url;
  } catch (error: any) {
    console.error('Upload to Pomf2 failed:', error.message || error);
  }
}
