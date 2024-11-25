import { auth } from './auth';

export async function status() {
    const session = await auth()
  return session ? 'Authenticated' : 'Not Authenticated';
}
