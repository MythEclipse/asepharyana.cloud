import { signIn } from '@/lib/auth';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';
export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
      className="flex flex-col items-center justify-center h-screen  p-5 rounded-lg shadow-md"
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
