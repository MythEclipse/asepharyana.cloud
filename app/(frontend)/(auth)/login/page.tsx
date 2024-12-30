'use client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import React, { Suspense } from 'react';

function LoginButton() {
  return (
    <button
      onClick={() => signIn('google', { redirectTo: '/' })}
      className="px-5 py-2 flex justify-between text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      <FcGoogle /> Sign in with Google
    </button>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginButton />
    </Suspense>
  );
}
