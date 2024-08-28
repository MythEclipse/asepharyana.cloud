import { NextResponse } from 'next/server';
import OpenApiJson from './OpenApiJson';

export async function GET(req: Request) {
  return NextResponse.json(OpenApiJson);
}
