'use server';
import { signOut } from '@/lib/auth';
import React from 'react';
export default async function SignOutComponent() {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type='submit'>signOut with Google</button>
    </form>
  );
}
