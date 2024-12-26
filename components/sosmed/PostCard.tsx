'use client';
import React from 'react';
import { HiHeart, HiChatAlt } from 'react-icons/hi';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import ButtonA from '@/components/ButtonA';
import { Posts, User, Likes, Comments } from '@prisma/client';

interface PostCardProps {
  post: Posts & {
    user: User;
    likes: Likes[];
    comments: Comments[];
  };
  handleLike: (postId: string) => void;
  handleAddComment: (postId: string, comment: string) => void;
  toggleComments: (postId: string) => void;
  showComments: boolean;
  newComment: string;
  setNewComment: (comment: string) => void;
}

export default function PostCard({
  post,
  handleLike,
  handleAddComment,
  toggleComments,
  showComments,
  newComment,
  setNewComment
}: PostCardProps) {
  return (
    <div className="p-6 shadow-xl bg-white dark:bg-black  border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={post.user.image || '/default-profile.png'}
          alt={post.user.name || 'User'}
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
        <Image src={post.image_url} alt="Post image" width={600} height={400} className="rounded-lg mt-4 shadow-lg" />
      )}

      <div className="flex items-center mt-6 space-x-6">
        <button
          onClick={() => handleLike(post.id)}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-300 px-6 py-2 border border-blue-500 dark:border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
        >
          <HiHeart className="w-5 h-5" /> {post.likes.length}
        </button>

        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition duration-300 px-6 py-2 border border-blue-500 dark:border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
        >
          <HiChatAlt className="w-5 h-5" /> {post.comments.length}
        </button>
      </div>

      {showComments && (
        <div className="mt-6 space-y-4">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 bg-white dark:bg-black rounded-lg text-gray-800 dark:text-gray-300 border-2 border-blue-500"
            >
              <strong>{comment.userId}:</strong> {comment.content}
            </div>
          ))}

          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-2 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />

          <ButtonA
            onClick={() => handleAddComment(post.id, newComment)}
            className="mt-2 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Add Comment
          </ButtonA>
        </div>
      )}
    </div>
  );
}
