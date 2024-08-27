import { NextResponse } from 'next/server';
import { OpenAPIV1 } from './openapi';

export async function GET(req: Request) {
  return NextResponse.json(OpenAPIV1);
}
