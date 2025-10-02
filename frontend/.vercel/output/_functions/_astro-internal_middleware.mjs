import { jwtVerify, errors } from 'jose';
import { d as defineMiddleware, s as sequence } from './chunks/index_CV3lj89-.mjs';
import { T as TOKEN_COOKIE_NAME } from './chunks/constants_BqVuYr7z.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DUOQgm0k.mjs';
import 'kleur/colors';
import './chunks/astro/server_ZlmUJ9I2.mjs';
import 'clsx';
import 'cookie';

const secret = new TextEncoder().encode("50o4e(#)2i_y1n(@!yfdq)py#a(^f8_&b7&om_mb&pa&1j_y7f");
const verifyAuth = async (token) => {
  if (!token) {
    return {
      status: "unauthorized",
      msg: "Please pass a request token"
    };
  }
  try {
    const jwtVerifyResult = await jwtVerify(token, secret);
    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "successfully verified auth token"
    };
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message };
    }
    console.debug(err);
    return { status: "error", msg: "could not validate auth token" };
  }
};
const onRequest$1 = defineMiddleware(async (context, next) => {
  const token = context.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const validationResult = await verifyAuth(token);
  const path = context.url.pathname;
  if (path === "/login" && validationResult.status === "authorized") {
    return Response.redirect(new URL("/", context.url));
  }
  if (path.startsWith("/admin")) {
    if (validationResult.status === "authorized") {
      return next();
    } else {
      const loginUrl = new URL("/login", context.url);
      loginUrl.searchParams.set("next", path + context.url.search);
      if (path.startsWith("/api/")) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401
        });
      }
      return Response.redirect(loginUrl);
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
