'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, TextInput, Label, Checkbox, Alert } from 'flowbite-react';

export default function LoginPage({ searchParams }: any) {
  const { push } = useRouter();
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const callbackUrl = searchParams.callbackUrl || '/';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
        callbackUrl
      });
      if (!res?.error) {
        (e.target as HTMLFormElement).reset();
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        console.log(res.error);
        if (res.status === 401) {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pt-35 mx-auto h-full max-h-full max-w-full bg-gray-50 dark:bg-dark">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-2">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
              {error !== '' && (
                <Alert color="failure" className="mb-3">
                  {error}
                </Alert>
              )}
              <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-darkb sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <div className="mb-[10px]">
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </Label>
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                        className="mt-1 block w-full"
                      />
                    </div>
                    <div className="mb-[10px]">
                      <Label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </Label>
                      <TextInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="mt-1 block w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <Checkbox id="remember" aria-describedby="remember" className="h-5 w-5" />
                        <Label htmlFor="remember" className="ml-3 text-sm">
                          Remember me
                        </Label>
                      </div>
                      <a
                        href="/"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {isLoading ? 'Loading...' : 'Sign in'}
                    </Button>
                    <hr />
                    <Button
                      type="button"
                      onClick={() => signIn('google', { callbackUrl, redirect: false })}
                      className="w-full bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Login with Google
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{' '}
                      <a
                        href="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
