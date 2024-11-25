'use client';

import React, { use } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage(props: any) {
  const searchParams = use(props.searchParams);
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
        if (res.status === 401) {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-full bg-gray-50 dark:bg-dark">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {error && (
            <Alert variant="destructive" className="mb-4 w-full max-w-md">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>Please enter your details below to sign in.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
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
                    <Checkbox id="remember" className="h-5 w-5" />
                    <Label htmlFor="remember" className="ml-3 text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/" className="text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? 'Loading...' : 'Sign in'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="button"
                onClick={() => signIn('google', { callbackUrl, redirect: false })}
                className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <FaGoogle className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link href="/register" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
