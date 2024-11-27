import { signOut } from '@/lib/auth';

export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: '/' });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
