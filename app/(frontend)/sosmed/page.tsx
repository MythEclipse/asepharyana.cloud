'use client';

import React, { useEffect, useState } from 'react';
import PostCard from '@/components/sosmed/PostCard';
import Card from '@/components/card/CardC';
import ButtonA from '@/components/button/ButtonA';
import { Textarea } from '@/components/text/textarea';
import { BaseUrl } from '@/lib/url';
import { Posts, User, Likes, Comments } from '@prisma/client';
import { useSession } from 'next-auth/react';

const usePosts = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/sosmed/posts`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, fetchPosts };
};

export default function PostPage() {
  const { data: session } = useSession();
  const { posts, fetchPosts } = usePosts();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handlePostSubmit = async () => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, imageUrl })
      });
      setContent('');
      setImageUrl('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`${BaseUrl}/api/uploader`, {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
          setImageUrl(data.url); // Assuming the response contains the URL in `data.url`
        })
        .catch((err) => console.error('Error uploading file:', err));
    }
  };

  const toggleComments = (postId: string) => setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

  const handleLike = async (postId: string) => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId })
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComments[postId]?.trim()) return;

    try {
      await fetch(`${BaseUrl}/api/sosmed/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComments[postId], postId })
      });
      fetchPosts();
      setNewComments((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditPost = async (postId: string, content: string) => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: postId, content })
      });
      fetchPosts();
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/posts`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: postId })
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: commentId, content })
      });
      fetchPosts();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await fetch(`${BaseUrl}/api/sosmed/comments`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: commentId })
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center">Social Feed</h1>
      {session ? (
        <Card>
          <div className="p-6 mb-8 shadow-xl rounded-lg bg-white dark:bg-black">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={handleContentChange}
              className="mb-4 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 shadow-lg"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-gray-300 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
            />
            <ButtonA
              onClick={handlePostSubmit}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Post
            </ButtonA>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-6 mb-8 shadow-xl rounded-lg bg-white dark:bg-black text-center">
            <p className="text-gray-800 dark:text-gray-100">You must be logged in to create a post.</p>
          </div>
        </Card>
      )}

      <div className="grid gap-8">
        {posts.map((post: Posts & { user?: User; likes?: Likes[]; comments?: (Comments & { user?: User })[] }) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              user: post.user || { name: null, id: '', email: null, emailVerified: null, role: '', image: null }, // Ensure user property exists
              likes: post.likes || [],
              comments:
                post.comments?.map((comment) => ({
                  ...comment,
                  user: comment.user || { name: null, id: '', email: null, emailVerified: null, role: '', image: null }
                })) || []
            }}
            currentUser={
              session?.user
                ? {
                    name: session.user?.name || null,
                    id: session.user?.id || '',
                    email: session.user?.email || null,
                    emailVerified: null,
                    role: '',
                    image: session.user?.image || null
                  }
                : { name: null, id: '', email: null, emailVerified: null, role: '', image: null }
            } // Replace with actual current user data
            handleLike={handleLike}
            handleAddComment={handleAddComment}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
            toggleComments={toggleComments}
            showComments={!!showComments[post.id]}
            newComment={newComments[post.id] || ''}
            setNewComment={(value) => setNewComments((prev) => ({ ...prev, [post.id]: value }))}
          />
        ))}
      </div>
    </div>
  );
}
