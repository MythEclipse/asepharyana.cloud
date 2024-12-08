import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const filePath = path.join(process.cwd(), 'public', 'OpenApi.yaml');
const OpenApiYaml = fs.readFileSync(filePath, 'utf8');
const OpenApiJson = yaml.load(OpenApiYaml);

export async function GET() {
  return NextResponse.json(OpenApiJson);
}
