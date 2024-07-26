'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Form from '@radix-ui/react-form';

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
              {error !== '' && <div className="mb-3 font-bold text-red-600">{error}</div>}
              <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-darkb sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Sign in to your account
                  </h1>
                  <Form.Root className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <Form.Field className="grid mb-[10px]" name="email">
                      <div className="flex items-baseline justify-between">
                        <Form.Label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Your email
                        </Form.Label>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                          Please enter your email
                        </Form.Message>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
                          Please provide a valid email
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          type="email"
                          name="email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                          placeholder="name@company.com"
                          required
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="password">
                      <div className="flex items-baseline justify-between">
                        <Form.Label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                          Password
                        </Form.Label>
                        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
                          Please enter your password
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      </Form.Control>
                    </Form.Field>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="size-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="/"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Form.Submit asChild>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        {isLoading ? 'Loading...' : 'Sign in'}
                      </button>
                    </Form.Submit>
                    <hr />
                    <button
                      type="button"
                      onClick={() => signIn('google', { callbackUrl, redirect: false })}
                      className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      login with google
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{' '}
                      <a
                        href="/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </Form.Root>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
