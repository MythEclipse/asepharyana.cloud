'use client';
import { FcGoogle } from 'react-icons/fc';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import login from './login';

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await login(callbackUrl);
      }}
      className="flex flex-col items-center justify-center h-screen p-5 rounded-lg shadow-md"
    >
      <button
        type="submit"
        className="px-5 py-2 flex justify-between text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        <FcGoogle /> Sign in with Google
      </button>
    </form>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
