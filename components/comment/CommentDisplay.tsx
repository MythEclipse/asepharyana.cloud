import { FC } from 'react';
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

async function fetchComments(): Promise<Comment[]> {
  const res = await fetch('http://localhost:3090/api/comment', {
    next: { revalidate: 5 } // Optional: revalidate every 5 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const formatDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString();
};

const CommentDisplay: FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Comments</h2>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">— {comment.email}</span>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                <span>Posted on {formatDate(comment.createdAt.seconds)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No comments available.</p>
        )}
      </div>
    </div>
  );
};

const Page: FC = async () => {
  const comments = await fetchComments();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-gray-600 dark:text-gray-400">Share your thoughts and feedback below.</p>
        </header>
        <main>
          <CommentDisplay comments={comments} />
        </main>
      </div>
    </div>
  );
};

export default Page;
