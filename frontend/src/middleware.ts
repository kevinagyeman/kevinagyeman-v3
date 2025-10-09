import { defineMiddleware } from 'astro/middleware';
import { AUTH_API_BASE_URL, TOKEN_COOKIE_NAME } from './constants';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  if (path === '/login') return next();

  const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // Costruisco header Cookie da solo il token
  const cookieHeader = token ? `${TOKEN_COOKIE_NAME}=${token}` : '';

  try {
    const authResponse = await fetch(`${AUTH_API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      credentials: 'include',
    });

    if (authResponse.ok) {
      return next();
    }
  } catch (err) {
    console.error('Auth check failed', err);
  }

  if (path.startsWith('/api/')) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return Response.redirect(new URL('/login', context.url));
});
