'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Card from '@/components/card/CardB';
import { HiHeart, HiChatAlt } from 'react-icons/hi';
import Image from 'next/image';
import { BaseUrl } from '@/lib/url';
import { useSession } from 'next-auth/react';

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  userId: string;
  created_at: string;
  user: User;
  likes: Like[];
  comments: Comment[];
}

interface User {
  id: string;
  image: string;
  name: string;
}

interface Like {
  userId: string;
  postId: string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  created_at: string;
  user: User;
}

export default function PostPage() {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/sosmed/posts`);
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null);

  const handlePost = async () => {
    if (!content.trim()) {
      setMessage('Content is required');
      return;
    }

    setPosting(true);
    try {
      let imageUrl = '';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const { data: uploadData } = await axios.post(`${BaseUrl}/api/uploader`, formData);
        imageUrl = uploadData.url;
      }

      const postData = { content, image_url: imageUrl || null };
      await axios.post(`${BaseUrl}/api/sosmed/posts`, postData);
      fetchPosts();
      setContent('');
      setFile(null);
      setMessage('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Post creation failed');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`${BaseUrl}/api/sosmed/likes`, { postId });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`${BaseUrl}/api/sosmed/comments`, { content: newComment, postId });
      fetchPosts();
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (postId: string) => setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

  if (process.env.NODE_ENV == "production" && !session?.user)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-800">Create a Post</h1>
        <p className="text-gray-600">You need to be logged in to create a post.</p>
      </div>
    );

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
          <input type="file" onChange={handleFileChange} className="mb-4 block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-gray-300 hover:file:bg-blue-100 dark:hover:file:bg-gray-600" />
          <Button onClick={handlePost} disabled={posting} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            {posting ? 'Posting...' : 'Post'}
          </Button>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
      </Card>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Card key={post.id}>
            <div className="p-6 shadow-xl rounded-lg bg-white dark:bg-black">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={post.user.image}
                  alt={post.user.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{post.user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt="Post"
                  width={600}
                  height={400}
                  className="rounded-lg mt-4"
                />
              )}
              <div className="flex items-center mt-6 space-x-4">
                <Button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-300">
                  <HiHeart /> {post.likes.length}
                </Button>
                <Button onClick={() => toggleComments(post.id)} className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition duration-300">
                  <HiChatAlt /> {post.comments.length}
                </Button>
              </div>
              {showComments[post.id] && (
                <div className="mt-4 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="text-gray-700 dark:text-gray-300">
                      <strong>{comment.user.name}:</strong> {comment.content}
                    </div>
                  ))}
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 shadow-lg"
                  />
                  <Button onClick={() => handleAddComment(post.id)} className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Comment
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
