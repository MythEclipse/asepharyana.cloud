import React, { FC } from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface Feedback {
  email: string;
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

async function fetchFeedbacks(): Promise<Feedback[]> {
  const res = await fetch('http://localhost:3090/api/feedback', {
    next: { revalidate: 5 } // Optional: revalidate every 5 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const FeedbackDisplay: FC<{ Feedbacks: Feedback[] }> = ({ Feedbacks }) => {
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-darka rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-darka dark:text-gray-100">Feedbacks</h2>
        <div className="space-y-4">
          {Feedbacks.length > 0 ? (
            Feedbacks.map((feedback) => (
              <div key={feedback.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{feedback.message}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">— {feedback.email}</span>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <span>Posted on {formatDate(feedback.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No Feedbacks available.</p>
          )}
        </div>
      </div>
      <Link href="/feedback/newfeedback">
        <Button>New Feedback</Button>
      </Link>
    </>
  );
};

const Page: FC = async () => {
  const Feedbacks = await fetchFeedbacks();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkb text-darkb dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Feedbacks</h1>
          <p className="text-gray-600 dark:text-gray-400">Share your thoughts and feedback below.</p>
        </header>
        <main>
          <FeedbackDisplay Feedbacks={Feedbacks} />
        </main>
      </div>
    </div>
  );
};

export default Page;
