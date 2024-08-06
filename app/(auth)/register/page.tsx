'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const { push } = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
    });
    if (res.status === 200) {
      e.target.reset();
      push('/login');
      setIsLoading(false);
    } else {
      setError('Email already exists');
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-dark">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a> */}
          {error !== '' && <div className="mb-3 font-bold text-red-600">{error}</div>}
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-darkb sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="namecompany"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    required={true}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:ring-3 size-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{' '}
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? 'loading.....' : 'sign up account'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
