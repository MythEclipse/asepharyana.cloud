'use server';
import { signIn } from 'next-auth/react';

const server = async (callbackUrl: string) => {
  await signIn('google', { redirect: true, redirectTo: callbackUrl });
};

export default server;
