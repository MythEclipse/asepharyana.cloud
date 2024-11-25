import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { auth } from '@/lib/auth';


export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = await req.json();

  try {
    // Check if the user has already liked the post
    const existingLike = await prisma.likes.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id!,
          postId
        }
      }
    });

    if (existingLike) {
      return NextResponse.json({ message: 'Already liked' }, { status: 409 });
    }

    // Create a new like
    const like = await prisma.likes.create({
      data: {
        postId,
        userId: session.user.id as string
      }
    });
    return NextResponse.json({ like }, { status: 201 });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ message: 'Failed to like post' }, { status: 500 });
  }
}
