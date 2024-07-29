'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';

export default function NewFeedback() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          message: message,
          email: session?.user?.email ?? 'Guest'
        })
      });

      if (res.ok) {
        router.push('/feedback'); // Redirect to a success page or another page of your choice
      } else {
        setError('Failed to submit feedback');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-darkb">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        {error && <div className="mb-3 font-bold text-red-600">{error}</div>}
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-darkb sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-darkb dark:text-white md:text-2xl">
              Leave Your Feedback
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-darkb dark:text-white">
                  Name
                </label>
                <TextField.Root id="name" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-darkb dark:text-white">
                  Message
                </label>
                <TextArea
                  id="message"
                  placeholder="Pesan"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
