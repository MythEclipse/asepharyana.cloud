import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { postId, content } = await req.json();

  if (!content) {
    return NextResponse.json(
      { message: 'Content is required' },
      { status: 400 }
    );
  }

  try {
    const comment = await prisma.comments.create({
      data: {
        postId,
        content,
        userId: session.user.id,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(
      {
        comment: {
          id: comment.id,
          postId: comment.postId,
          content: comment.content,
          created_at: comment.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { message: 'Failed to add comment' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json(
      { message: 'Post ID is required' },
      { status: 400 }
    );
  }

  try {
    const comments = await prisma.comments.findMany({
      where: { postId: postId as string },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id, content } = await req.json();

  if (!id || !content) {
    return NextResponse.json(
      { message: 'Comment ID and content are required' },
      { status: 400 }
    );
  }

  try {
    const comment = await prisma.comments.findUnique({ where: { id } });

    if (!comment || comment.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'User not authorized to edit this comment' },
        { status: 403 }
      );
    }

    const updatedComment = await prisma.comments.update({
      where: { id },
      data: {
        content: `${content} -edited`,
      },
    });

    return NextResponse.json(
      { message: 'Comment updated successfully!', comment: updatedComment },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { message: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: 'Comment ID is required' },
      { status: 400 }
    );
  }

  try {
    const comment = await prisma.comments.findUnique({ where: { id } });

    if (!comment || comment.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'User not authorized to delete this comment' },
        { status: 403 }
      );
    }

    await prisma.comments.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Comment deleted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { message: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
