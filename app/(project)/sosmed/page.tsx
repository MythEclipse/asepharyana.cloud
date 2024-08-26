'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  userId: string;
  topicId: string | null;
  created_at: string;
  updated_at: string;
}

export default function PostPage() {
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data.posts);
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
    formData.append('file', file as Blob); // Ensuring file is not null

    try {
      // Upload the image first
      const uploadResponse = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileName = uploadResponse.data.fileName;
      const imageUrl = `https://files.zey.moe/${fileName}`;
      console.log('Uploaded image URL:', imageUrl);
      

      // Now create the post
      const postData = {
        content,
        imageUrl,
        userId: 'your-user-id', // Replace with actual user ID from your authentication system
        topicId: '', // Replace with actual topic ID if applicable
      };

      await axios.post('/api/posts', postData);

      // Fetch updated posts list
      const response = await axios.get('/api/posts');
      setPosts(response.data.posts);

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="What's on your mind?"
        className="w-full h-32 mb-4 p-2 border rounded"
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mb-4"
      />
      <button
        onClick={handlePost}
        disabled={posting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {posting ? 'Posting...' : 'Post'}
      </button>
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
              <div key={post.id} className="border p-4 mb-4 rounded">
                <p>{post.content}</p>
                {post.image_url && <img src={post.image_url} alt="Post Image" className="mt-2 max-w-full h-auto" />}
                <p className="text-sm text-gray-600">Created at: {new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
