import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/lib/url';
import { Posts, User, Likes, Comments } from '@prisma/client';

export const usePosts = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/sosmed/posts`);
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
