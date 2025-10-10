import { errors, jwtVerify } from 'jose';
import { defineMiddleware } from 'astro/middleware';
import { TOKEN_COOKIE_NAME } from './constants';

const secret = new TextEncoder().encode(import.meta.env.SECRET_KEY);

const verifyAuth = async (token?: string) => {
  if (!token) {
    return {
      status: 'unauthorized',
      msg: 'Please pass a request token',
    } as const;
  }

  try {
    const jwtVerifyResult = await jwtVerify(token, secret);

    return {
      status: 'authorized',
      payload: jwtVerifyResult.payload,
      msg: 'successfully verified auth token',
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: 'error', msg: err.message } as const;
    }

    console.debug(err);
    return { status: 'error', msg: 'could not validate auth token' } as const;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;
  console.log('All cookies:', token);

  const validationResult = await verifyAuth(token);
  const path = context.url.pathname;

  if (path === '/login' && validationResult.status === 'authorized') {
    return Response.redirect(new URL('/', context.url));
  }

  if (path.startsWith('/admin')) {
    if (validationResult.status === 'authorized') {
      return next();
    } else {
      const url = new URL(context.url);
      if (!url.port) {
        url.port = '4321'; // Imposta la porta corretta
      }
      const loginUrl = new URL('/login', url);
      loginUrl.searchParams.set('next', path + context.url.search);

      if (path.startsWith('/api/')) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
        });
      }

      return Response.redirect(loginUrl);
    }
  }

  return next();
});
