'use client';

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/sosmed/PostCard';
import Card from '@/components/card/CardB';
import ButtonA from '@/components/ButtonA';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { BaseUrl } from '@/lib/url';
import { Posts, User, Likes, Comments } from '@prisma/client';
export default function PostPage() {
  const { posts, fetchPosts } = usePosts();
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null);

  const toggleComments = (postId: string) => setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`${BaseUrl}/api/sosmed/likes`, { postId });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComments[postId]?.trim()) return;

    try {
      await axios.post(`${BaseUrl}/api/sosmed/comments`, {
        content: newComments[postId],
        postId
      });
      fetchPosts();
      setNewComments((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center">Social Feed</h1>
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
            onClick={() => {}}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Post
          </ButtonA>
        </div>
      </Card>

      <div className="grid gap-8">
        {posts.map((post: Posts & { user?: User; likes?: Likes[]; comments?: (Comments & { user?: User })[] }) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              user: post.user || { name: null, id: '', email: null, emailVerified: null, role: '', image: null }, // Ensure user property exists
              likes: post.likes || [], // Ensure likes property exists
              comments:
                post.comments?.map((comment) => ({
                  ...comment,
                  user: comment.user || { name: null, id: '', email: null, emailVerified: null, role: '', image: null }
                })) || [] // Ensure comments property exists
            }}
            handleLike={handleLike}
            handleAddComment={handleAddComment}
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
