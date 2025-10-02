import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_ZlmUJ9I2.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_DUOQgm0k.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_VBoE0hQR.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/","cacheDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/node_modules/.astro/","outDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/dist/","srcDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/","publicDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/public/","buildClientDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/dist/client/","buildServerDir":"file:///Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/admin/dashboard","isIndex":true,"type":"page","pattern":"^\\/admin\\/dashboard\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/dashboard/index.astro","pathname":"/admin/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/admin/information","isIndex":true,"type":"page","pattern":"^\\/admin\\/information\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"information","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/information/index.astro","pathname":"/admin/information","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/admin/project/new","isIndex":false,"type":"page","pattern":"^\\/admin\\/project\\/new\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/project/new.astro","pathname":"/admin/project/new","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/admin/project/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/project\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"project","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/project/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/contact","isIndex":true,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact/index.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/markdown-page","isIndex":false,"type":"page","pattern":"^\\/markdown-page\\/?$","segments":[[{"content":"markdown-page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/markdown-page.md","pathname":"/markdown-page","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/project/[id]","isIndex":false,"type":"page","pattern":"^\\/project\\/([^/]+?)\\/?$","segments":[[{"content":"project","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/project/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.ChiCVen4.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/about/index.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/dashboard/index.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/information/index.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/[id].astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/new.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/contact/index.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/markdown-page.md",{"propagation":"none","containsHead":true}],["/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/project/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about/index@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin/dashboard/index@_@astro":"pages/admin/dashboard.astro.mjs","\u0000@astro-page:src/pages/admin/information/index@_@astro":"pages/admin/information.astro.mjs","\u0000@astro-page:src/pages/admin/project/new@_@astro":"pages/admin/project/new.astro.mjs","\u0000@astro-page:src/pages/admin/project/[id]@_@astro":"pages/admin/project/_id_.astro.mjs","\u0000@astro-page:src/pages/contact/index@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/markdown-page@_@md":"pages/markdown-page.astro.mjs","\u0000@astro-page:src/pages/project/[id]@_@astro":"pages/project/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CGQoxjJV.mjs","/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DG2oqBp2.mjs","@/components/DashboardActions":"_astro/DashboardActions.COkQ3L_5.js","@/components/DashboardProjectsList":"_astro/DashboardProjectsList.CtfCu6uU.js","@/components/InformationForm":"_astro/InformationForm.Dkjfmw--.js","@/components/Auth":"_astro/Auth.AFoTZE4k.js","@astrojs/react/client.js":"_astro/client.qBy5DPBm.js","@/components/Navbar":"_astro/Navbar.CUWc73gl.js","@/components/ProjectForm":"_astro/ProjectForm.C2zc1F_u.js","@/components/ui/button":"_astro/button.CG43V61V.js","/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/components/ProjectForm.tsx":"_astro/ProjectForm.Ra7ZM0RA.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.ChiCVen4.css","/favicon.svg","/_astro/Auth.AFoTZE4k.js","/_astro/CustomInput.BFqZDFQS.js","/_astro/CustomUpload.DaG0gBeC.js","/_astro/DashboardActions.COkQ3L_5.js","/_astro/DashboardProjectsList.CtfCu6uU.js","/_astro/InformationForm.Dkjfmw--.js","/_astro/Navbar.CUWc73gl.js","/_astro/ProjectForm.C2zc1F_u.js","/_astro/ProjectForm.Ra7ZM0RA.js","/_astro/auth.C7eAfmFv.js","/_astro/button.CG43V61V.js","/_astro/button.Ddx2-vE6.js","/_astro/client.qBy5DPBm.js","/_astro/createLucideIcon.Bt26vucB.js","/_astro/index.BmnMO-Wv.js","/_astro/index.DQ-kWmSG.js","/_astro/information.CMJ6NylM.js","/_astro/trash.DEvtjFe8.js","/_astro/utils.BUWuKY61.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"9i5Rgb7bw+qYvWvumLp37hPfaQm9p+d5rh5val+yhig="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
