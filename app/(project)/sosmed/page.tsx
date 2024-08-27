'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Textarea, Card, Spinner } from 'flowbite-react';
import { HiHeart, HiChatAlt } from 'react-icons/hi';

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  userId: string;
  topicId: string | null;
  created_at: string;
  updated_at: string;
  user: User; // Adjusted from Users[] to User
  likes: Like[]; // Ensure this is always an array
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
}

export default function PostPage() {
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(
          response.data.posts.map((post: Post) => ({
            ...post,
            likes: post.likes || []
          }))
        );
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handlePost = async () => {
    if (!content) {
      setMessage('Content is required');
      return;
    }

    setPosting(true);

    const formData = new FormData();
    formData.append('file', file as Blob);

    try {
      const uploadResponse = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const fileName = uploadResponse.data.fileName;
      const imageUrl = `https://files.zey.moe/${fileName}`;

      const postData = {
        content,
        imageUrl
      };

      await axios.post('/api/posts', postData);

      const response = await axios.get('/api/posts');
      setPosts(
        response.data.posts.map((post: Post) => ({
          ...post,
          likes: post.likes || []
        }))
      );

      setMessage('Post created successfully!');
      setContent('');
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage('Post creation failed');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await axios.post('/api/likes', { postId });

      if (response.status === 409) {
        console.log('You have already liked this post');
        return;
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: [...post.likes, { userId: response.data.userId, postId }] } : post
        )
      );

      const updatedPosts = await axios.get('/api/posts');
      setPosts(
        updatedPosts.data.posts.map((post: Post) => ({
          ...post,
          likes: post.likes || []
        }))
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment) return;
    try {
      const commentData = {
        content: newComment,
        postId
      };
      await axios.post('/api/comments', commentData);
      const response = await axios.get('/api/posts');
      setPosts(
        response.data.posts.map((post: Post) => ({
          ...post,
          likes: post.likes || []
        }))
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <Textarea value={content} onChange={handleContentChange} placeholder="What's on your mind?" className="mb-4" />
      <input type="file" onChange={handleFileChange} accept="image/*" className="mb-4" />
      <Button onClick={handlePost} disabled={posting} className="bg-blue-500 text-white">
        {posting ? <Spinner /> : 'Post'}
      </Button>
      {message && (
        <div className="mt-4">
          <p>{message}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Posts</h2>
        <div>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="mb-4">
                <div className="flex items-center mb-4">
                  <img src={post.user.image} alt={post.user.name} className="w-10 h-10 rounded-full" />
                  <div className="ml-4">
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-sm text-gray-600">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                {post.image_url && <img src={post.image_url} alt="Post Image" className="mb-4 max-w-full h-auto" />}
                <div className="flex items-center mb-4">
                  <Button onClick={() => handleLike(post.id)} className="mr-2 flex items-center">
                    <HiHeart className="w-5 h-5 text-red-500 mr-1" />
                    {post.likes.length}
                  </Button>
                  <Button className="flex items-center">
                    <HiChatAlt className="w-5 h-5 text-blue-500 mr-1" />
                    {post.comments.length}
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Comments</h3>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="border-t mt-2 pt-2">
                      <p>{comment.content}</p>
                      <p className="text-xs text-gray-500">
                        Posted at: {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="mt-2 mb-2"
                  />
                  <Button onClick={() => handleAddComment(post.id)} className="bg-green-500 text-white">
                    Comment
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
