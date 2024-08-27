import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId, content } = await req.json();

  if (!content) {
    return NextResponse.json({ message: 'Content is required' }, { status: 400 });
  }

  try {
    const comment = await prisma.comments.create({
      data: {
        postId,
        content,
        userId: session.user.id,
        authorId: session.user.id
      }
    });
    return NextResponse.json(
      { comment: { id: comment.id, postId: comment.postId, content: comment.content, created_at: comment.created_at } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ message: 'Failed to add comment' }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comments.findMany({
      where: { postId: postId as string },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
            // Exclude sensitive information
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: 'Failed to fetch comments' }, { status: 500 });
  }
}
