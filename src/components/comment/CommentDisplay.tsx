import React from 'react';
import { getDataNC } from '@/components/GetData/GetData';

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

export default async function ProductPage() {
  const comment: Comment[] = await getDataNC('http://localhost:9000/api/comment');

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Comments</h2>
      <div className='space-y-4'>
        {comment.length > 0 ? (
          comment.map((comment) => (
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
}
