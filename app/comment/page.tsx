import CommentDisplay from '../../components/comment/CommentDisplay';
import CommentInput from '../../components/comment/CommentInput';
import React from 'react';

const CommentPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-gray-600 dark:text-gray-400">Share your thoughts and feedback below.</p>
        </header>
        <main className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <CommentDisplay />
        </main>
        <aside className="mt-6">
          <CommentInput />
        </aside>
      </div>
    </div>
  );
};

export default CommentPage;
