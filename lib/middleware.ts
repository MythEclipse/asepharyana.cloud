export { auth as middleware } from './auth';

// Specify the routes that should trigger this middleware
export const config = {
  matcher: ['/profile', '/settings', '/sosmed', '/login', '/register']
};
