'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Textarea, Card, Spinner } from 'flowbite-react';
import { HiHeart, HiChatAlt } from 'react-icons/hi';
import Image from 'next/image';

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
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get('/api/posts');
        const postsWithComments = postsResponse.data.posts;

        const commentsPromises = postsWithComments.map((post: Post) =>
          axios.get(`/api/comments?postId=${post.id}`).then((response) => ({
            ...post,
            comments: response.data.comments
          }))
        );

        const postsWithCommentsData = await Promise.all(commentsPromises);
        setPosts(
          postsWithCommentsData.map((post: Post) => ({
            ...post,
            likes: post.likes || []
          }))
        );
      } catch (error) {
        console.error('Error fetching posts and comments:', error);
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

    try {
      let imageUrl = '';

      if (file) {
        const formData = new FormData();
        formData.append('file', file as Blob);

        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const fileName = uploadResponse.data.fileName;
        imageUrl = `https://files.zey.moe/${fileName}`;
      }

      const postData = {
        content,
        imageUrl: imageUrl || null // Use null if no image
      };

      await axios.post('/api/posts', postData);

      window.location.reload();

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
    if (!newComment.trim()) {
      console.log('No comment content provided');
      return;
    }

    if (!postId) {
      console.error('Post ID is missing');
      return;
    }

    try {
      const commentData = {
        content: newComment,
        postId
      };

      await axios.post('/api/comments', commentData);

      const commentsResponse = await axios.get(`/api/comments?postId=${postId}`);
      const updatedPostsResponse = await axios.get('/api/posts');

      setPosts(
        updatedPostsResponse.data.posts.map((post: Post) => ({
          ...post,
          comments: commentsResponse.data.comments.filter((comment: Comment) => comment.postId === post.id),
          likes: post.likes || []
        }))
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
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
                  <Image src={post.user.image} alt={post.user.name}
                    width={40} height={
                      40
                    }
                    className="w-10 h-10 rounded-full" />
                  <div className="ml-4">
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-sm text-gray-600">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                {post.image_url && <Image src={post.image_url} alt="Post Image"
                  width={400} height={400}
                  className="mb-4 max-w-full h-auto" />}
                <div className="flex items-center mb-4">
                  <Button onClick={() => handleLike(post.id)} className="mr-2 flex items-center">
                    <HiHeart className="w-5 h-5 text-red-500 mr-1" />
                    {post.likes.length}
                  </Button>
                  <Button onClick={() => toggleComments(post.id)} className="flex items-center">
                    <HiChatAlt className="w-5 h-5 text-blue-500 mr-1" />
                    {post.comments.length} {showComments[post.id] ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {showComments[post.id] && (
                  <div>
                    <h3 className="font-semibold mb-2">Comments</h3>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="border-t mt-2 pt-2">
                        <div className="flex items-center mb-2">
                          <Image src={comment.user.image} alt={comment.user.name}
                            width={32} height={32} className="w-8 h-8 rounded-full" />
                          <div className="ml-2">
                            <p className="font-semibold">{comment.user.name}</p>
                            <p>{comment.content}</p>
                            <p className="text-xs text-gray-500">
                              Posted at: {new Date(comment.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
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
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
