import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get session data
    const session = await auth();
    const userId = session?.user?.id;

    // Parse the JSON request body
    const { content, imageUrl } = await request.json();

    // Validate request data
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ message: 'Content is required and must be a string' }, { status: 400 });
    }

    // Check if userId is available
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Create post in the database
    const newPost = await prisma.posts.create({
      data: {
        content,
        authorId: userId,
        image_url: imageUrl || '',
        userId
      }
    });

    return NextResponse.json({ message: 'Post created successfully!', post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Fetch all posts from the database
    const posts = await prisma.posts.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        comments: true,
        likes: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Sanitize the response
    const sanitizedPosts = await Promise.all(
      posts.map(async (post) => {
        const commentsWithUser = await Promise.all(
          post.comments.map(async (comment) => {
            const user = await prisma.user.findUnique({
              where: { id: comment.userId },
              select: { id: true, name: true, image: true }
            });
            return {
              ...comment,
              user
            };
          })
        );

        return {
          ...post,
          user: {
            id: post.user.id,
            name: post.user.name,
            image: post.user.image
          },
          comments: commentsWithUser,
          likes: post.likes.map((like) => ({
            userId: like.userId,
            postId: like.postId
          }))
        };
      })
    );

    return NextResponse.json({ posts: sanitizedPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // Get session data
    const session = await auth();
    const userId = session?.user?.id;

    // Parse the JSON request body
    const { id, content, imageUrl } = await request.json();

    // Validate request data
    if (!id || !content || typeof content !== 'string') {
      return NextResponse.json({ message: 'Post ID and content are required and must be valid' }, { status: 400 });
    }

    // Check if userId is available
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await prisma.posts.findUnique({ where: { id } });

    if (!post || post.userId !== userId) {
      return NextResponse.json({ message: 'User not authorized to edit this post' }, { status: 403 });
    }

    // Update post in the database
    const updatedPost = await prisma.posts.update({
      where: { id },
      data: {
        content,
        image_url: imageUrl || ''
      }
    });

    return NextResponse.json({ message: 'Post updated successfully!', post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    // Get session data
    const session = await auth();
    const userId = session?.user?.id;

    // Parse the JSON request body
    const { id } = await request.json();

    // Validate request data
    if (!id) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    // Check if userId is available
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await prisma.posts.findUnique({ where: { id } });

    if (!post || post.userId !== userId) {
      return NextResponse.json({ message: 'User not authorized to delete this post' }, { status: 403 });
    }

    // Delete post from the database
    await prisma.posts.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Post deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
