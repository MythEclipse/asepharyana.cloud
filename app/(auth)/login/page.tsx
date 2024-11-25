'use client';

import React from 'react';
import { signIn } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import SignInComponent from '@/components/SignInComponent';

export default function SignIn() {
  return (
    <section className="flex items-center justify-center h-full bg-gray-50 dark:bg-dark">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>Please enter your details below to sign in.</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInComponent></SignInComponent>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
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
