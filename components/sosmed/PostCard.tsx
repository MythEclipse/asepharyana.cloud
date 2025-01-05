'use client';
import React, { useState } from 'react';
import { HiHeart, HiChatAlt, HiPencil, HiTrash } from 'react-icons/hi';
import Image from 'next/image';
import { Textarea } from '@/components/text/textarea';
import ButtonA from '@/components/button/NormalButton';
import { Posts, User, Likes, Comments } from '@prisma/client';

interface PostCardProps {
  post: Posts & {
    user: User;
    likes: Likes[];
    comments: (Comments & { user: User })[];
  };
  currentUserId: string;
  handleLike: (postId: string) => void;
  handleAddComment: (postId: string, comment: string) => void;
  handleEditPost: (postId: string, content: string) => void;
  handleDeletePost: (postId: string) => void;
  handleEditComment: (commentId: string, content: string) => void;
  handleDeleteComment: (commentId: string) => void;
  toggleComments: (postId: string) => void;
  showComments: boolean;
  newComment: string;
  setNewComment: (comment: string) => void;
}

export default function PostCard({
  post,
  currentUserId,
  handleLike,
  handleAddComment,
  handleEditPost,
  handleDeletePost,
  handleEditComment,
  handleDeleteComment,
  toggleComments,
  showComments,
  newComment,
  setNewComment,
}: PostCardProps) {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const handleEditPostSubmit = () => {
    handleEditPost(post.id, editedPostContent);
    setIsEditingPost(false);
  };

  const handleEditCommentSubmit = (commentId: string) => {
    handleEditComment(commentId, editedCommentContent);
    setEditingCommentId(null);
  };

  return (
    <div className='p-6 shadow-xl bg-white dark:bg-black border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500'>
      <div className='flex items-center gap-4 mb-4'>
        <Image
          src={post.user.image || '/default-profile.png'}
          alt={post.user.name || 'User'}
          width={50}
          height={50}
          className='rounded-full border-2 border-blue-500'
        />
        <div>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
            {post.user.name}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        {currentUserId === post.user.id && (
          <div className='ml-auto flex space-x-2'>
            <button
              onClick={() => setIsEditingPost(true)}
              className='text-blue-500 hover:text-blue-600'
            >
              <HiPencil className='w-5 h-5' />
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
              className='text-red-500 hover:text-red-600'
            >
              <HiTrash className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {isEditingPost ? (
        <div>
          <Textarea
            value={editedPostContent}
            onChange={(e) => setEditedPostContent(e.target.value)}
            className='mb-4 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100'
          />
          <ButtonA
            onClick={handleEditPostSubmit}
            className='mb-4 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300'
          >
            Save Changes
          </ButtonA>
        </div>
      ) : (
        <p className='text-gray-700 dark:text-gray-300 mb-4'>{post.content}</p>
      )}

      {post.image_url && (
        <Image
          src={post.image_url}
          alt='Post image'
          width={600}
          height={400}
          className='rounded-lg mt-4 shadow-lg'
        />
      )}

      <div className='flex items-center mt-6 space-x-6'>
        <button
          onClick={() => handleLike(post.id)}
          className={`flex items-center gap-2 ${post.likes.some((like) => like.userId === currentUserId) ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition duration-300 px-6 py-2 border border-blue-500 dark:border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500`}
        >
          <HiHeart className='w-5 h-5' /> {post.likes.length}
        </button>

        <button
          onClick={() => toggleComments(post.id)}
          className='flex items-center gap-2 text-blue-500 hover:text-blue-600 transition duration-300 px-6 py-2 border border-blue-500 dark:border-blue-500 rounded-full focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500'
        >
          <HiChatAlt className='w-5 h-5' /> {post.comments.length}
        </button>
      </div>

      {showComments && (
        <div className='mt-6 space-y-4'>
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className='p-3 bg-white dark:bg-black rounded-lg text-gray-800 dark:text-gray-300 border-2 border-blue-500'
            >
              <div className='flex items-center gap-2 mb-2'>
                <Image
                  src={comment.user.image || '/profile-circle-svgrepo-com.svg'}
                  alt={comment.user.name || 'User'}
                  width={30}
                  height={30}
                  className='rounded-full border-2 border-blue-500'
                />
                <strong>{comment.user.name}</strong>
                {currentUserId === comment.user.id && (
                  <div className='ml-auto flex space-x-2'>
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedCommentContent(comment.content);
                      }}
                      className='text-blue-500 hover:text-blue-600'
                    >
                      <HiPencil className='w-4 h-4' />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className='text-red-500 hover:text-red-600'
                    >
                      <HiTrash className='w-4 h-4' />
                    </button>
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div>
                  <Textarea
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    className='mb-2 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100'
                  />
                  <ButtonA
                    onClick={() => handleEditCommentSubmit(comment.id)}
                    className='py-1 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300'
                  >
                    Save Changes
                  </ButtonA>
                </div>
              ) : (
                <p>{comment.content}</p>
              )}
            </div>
          ))}

          <Textarea
            placeholder='Add a comment...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='mt-2 border border-blue-500 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100'
          />

          <ButtonA
            onClick={() => handleAddComment(post.id, newComment)}
            className='mt-2 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300'
          >
            Add Comment
          </ButtonA>
        </div>
      )}
    </div>
  );
}
