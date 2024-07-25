import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/prisma';

const createFeedbackSchema = z.object({
  name: z.string().min(1).max(255),
  message: z.string().min(1)
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createFeedbackSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newFeedback = await prisma.feedback.create({
    data: { name: body.name, message: body.message }
  });
  return NextResponse.json(newFeedback, { status: 201 });
}
