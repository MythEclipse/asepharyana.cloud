// pages/product.tsx
import React from 'react';

interface Comment {
  id: string;
  email: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  content: string;
}

const formatDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString();
};

export async function getServerSideProps() {
  const res = await fetch('/api/comment'); // Adjust the URL if needed
  const data: Comment[] = await res.json();

  return {
    props: {
      comments: data,
    },
  };
}

interface CommentDisplayProps {
  comments: Comment[];
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comments }) => {
  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Comments</h2>
      <div className='space-y-4'>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <div key={comment.id} className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
              <p className='text-lg text-gray-700 mb-2'>{comment.content}</p>
              <span className='text-sm text-gray-500'>— {comment.email}</span>
              <div className='text-xs text-gray-400 mt-1'>
                <span>Posted on {formatDate(comment.createdAt.seconds)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default CommentDisplay;
