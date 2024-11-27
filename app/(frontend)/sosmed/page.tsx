'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { HiHeart, HiChatAlt } from 'react-icons/hi';
import Image from 'next/image';
import { BaseUrl } from '@/lib/url';
import { auth } from '@/lib/auth'; // Make sure to import your auth function

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  userId: string;
  topicId: string | null;
  created_at: string;
  updated_at: string;
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
  postId: string;
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
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await auth();
      setSession(session);
    };

    fetchSession();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/sosmed/posts`);
      const postsWithComments = await Promise.all(
        data.posts.map(async (post: Post) => {
          const { data: commentsData } = await axios.get(`${BaseUrl}/api/sosmed/comments?postId=${post.id}`);
          return { ...post, comments: commentsData.comments, likes: post.likes || [] };
        })
      );
      setPosts(postsWithComments);
    } catch (error) {
      console.error('Error fetching posts and comments:', error);
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
        formData.append('service', 'pomf2');
        formData.append('clientId', 'string');

        const { data: uploadData } = await axios.post(`${BaseUrl}/api/uploader`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', accept: 'application/json' }
        });

        imageUrl = uploadData.url;
        if (!imageUrl) throw new Error('Image upload failed: No URL returned');
      }

      const postData = { content, image_url: imageUrl || null };
      await axios.post(`${BaseUrl}/api/sosmed/posts`, postData);
      await fetchPosts();

      setMessage('Post created successfully!');
      setContent('');
      setFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Post creation failed');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const { data, status } = await axios.post(`${BaseUrl}/api/sosmed/likes`, { postId });
      if (status === 409) {
        console.log('You have already liked this post');
        return;
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: [...post.likes, { userId: data.userId, postId }] } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) {
      console.log('No comment content provided');
      return;
    }

    try {
      const commentData = { content: newComment, postId };
      await axios.post(`${BaseUrl}/api/sosmed/comments`, commentData);

      const { data: updatedComments } = await axios.get(`${BaseUrl}/api/sosmed/comments?postId=${postId}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, comments: updatedComments.comments } : post))
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (postId: string) => setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

  if (!session || !session.user)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
        <p>You need to be logged in to create a post</p>
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <Card className="p-4 mb-4">
        <Textarea placeholder="What's on your mind?" value={content} onChange={handleContentChange} className="mb-4" />
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <Button onClick={handlePost} disabled={posting}>
          {posting ? 'Posting...' : 'Post'}
        </Button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="p-4 mb-4">
          <div className="flex items-center mb-2">
            <Image src={post.user.image} alt={post.user.name} width={40} height={40} className="rounded-full mr-2" />
            <span className="font-bold">{post.user.name}</span>
          </div>
          <p>{post.content}</p>
          {post.image_url && <Image src={post.image_url} alt="Post image" width={500} height={300} className="mt-2" />}
          <div className="flex items-center mt-4">
            <Button onClick={() => handleLike(post.id)} className="flex items-center mr-2">
              <HiHeart className="mr-1" /> {post.likes.length}
            </Button>
            <Button onClick={() => toggleComments(post.id)} className="flex items-center">
              <HiChatAlt className="mr-1" /> {post.comments.length}
            </Button>
          </div>
          {showComments[post.id] && (
            <div className="mt-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="mb-2">
                  <strong>{comment.user.name}:</strong> {comment.content}
                </div>
              ))}
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-2"
              />
              <Button onClick={() => handleAddComment(post.id)} className="mt-2">
                Comment
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
