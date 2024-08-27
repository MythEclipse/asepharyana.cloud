import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next'; // Adjust this import based on your NextAuth setup
import { authOptions } from '@/lib/authOptions';
// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get session data
    const session = await getServerSession(authOptions); // Ensure to adjust `authOptions` path as needed
    const userId = session?.user?.id; // Extract user ID from session

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
        authorId: userId, // Use user ID from the session
        image_url: imageUrl || '', // Use the image URL returned from the upload API or default to empty string
        userId: session.user.id,
        created_at: new Date(), // Set the created_at field to the current date
        updated_at: new Date() // Set the updated_at field to the current date
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
        user: true, // Include user data if needed
        comments: true, // Include comments if needed
        likes: true // Include likes if needed
      },
      orderBy: {
        created_at: 'desc' // Order by most recent first
      }
    });

    // Remove sensitive information from the response
    const sanitizedPosts = posts.map((post) => ({
      ...post,
      user: {
        id: post.user.id,
        name: post.user.name,
        image: post.user.image // Preserve image URL if needed
        // Avoid sending sensitive info like email, password, etc.
      },
      comments: post.comments.map((comment) => ({
        ...comment
        // You can also sanitize comment data if needed
      })),
      likes: post.likes.map((like) => ({
        userId: like.userId, // Keep only non-sensitive info
        postId: like.postId
      }))
    }));

    return NextResponse.json({ posts: sanitizedPosts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
