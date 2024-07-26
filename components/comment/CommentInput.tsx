'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CommentPage() {
  const { push } = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        content: e.target.content.value,
        email: session?.user?.email ?? 'Guest'
      })
    });

    if (res.status === 200) {
      e.target.reset();
      push('/comment'); // Redirect to a success page or another page of your choice
      setIsLoading(false);
    } else {
      setError('Failed to submit comment');
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          {error !== '' && <div className="mb-3 font-bold text-red-600">{error}</div>}
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Leave a Comment
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Comment
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows={4}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="Write your comment here..."
                    required={true}
                  />
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? 'Submitting.....' : 'Submit Comment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
