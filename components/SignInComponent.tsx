'use server';
import { signIn } from '@/lib/auth';

export default async function SignIn() {
  return (
    <form
      action={async () => {
        await signIn('google');
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
