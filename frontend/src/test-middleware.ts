import { defineMiddleware } from 'astro/middleware';
import { errors, jwtVerify } from 'jose';
import { TOKEN_COOKIE_NAME } from './constants';

const secret = new TextEncoder().encode('xxx');

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
	console.log('context.cookies', context.cookies);
	const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;
	console.log('Token cookie:', token);
	const validationResult = await verifyAuth(token);
	console.log('Validation result:', validationResult);
	const path = context.url.pathname;

	if (path === '/login' && validationResult.status === 'authorized') {
		return Response.redirect(new URL('/', context.url));
	}
	if (path.startsWith('/admin')) {
		if (validationResult.status === 'authorized') {
			return next();
		} else {
			const loginUrl = new URL('/login', context.url);
			loginUrl.searchParams.set('next', path + context.url.search); // conserva query params originali
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
