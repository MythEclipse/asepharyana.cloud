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
          postId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: 'Already liked' }, { status: 409 });
    }

    // Create a new like
    const like = await prisma.likes.create({
      data: {
        postId,
        userId: session.user.id!,
      },
    });
    return NextResponse.json({ like }, { status: 201 });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json(
      { message: 'Failed to like post' },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = await req.json();

  try {
    // Check if the like exists and belongs to the user
    const existingLike = await prisma.likes.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id!,
          postId,
        },
      },
    });

    if (!existingLike) {
      return NextResponse.json(
        { message: 'Like not found or does not belong to the user' },
        { status: 404 }
      );
    }

    // Delete the like
    await prisma.likes.delete({
      where: {
        userId_postId: {
          userId: session.user.id!,
          postId,
        },
      },
    });

    return NextResponse.json(
      { message: 'Like removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing like:', error);
    return NextResponse.json(
      { message: 'Failed to remove like' },
      { status: 500 }
    );
  }
}
