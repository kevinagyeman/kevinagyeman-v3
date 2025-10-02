import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Bw_lOt0j.mjs';
import { manifest } from './manifest_DpHBEl5t.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin/dashboard.astro.mjs');
const _page4 = () => import('./pages/admin/information.astro.mjs');
const _page5 = () => import('./pages/admin/project/new.astro.mjs');
const _page6 = () => import('./pages/admin/project/_id_.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/login.astro.mjs');
const _page9 = () => import('./pages/markdown-page.astro.mjs');
const _page10 = () => import('./pages/project/_id_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about/index.astro", _page2],
    ["src/pages/admin/dashboard/index.astro", _page3],
    ["src/pages/admin/information/index.astro", _page4],
    ["src/pages/admin/project/new.astro", _page5],
    ["src/pages/admin/project/[id].astro", _page6],
    ["src/pages/contact/index.astro", _page7],
    ["src/pages/login.astro", _page8],
    ["src/pages/markdown-page.md", _page9],
    ["src/pages/project/[id].astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "f189ae74-d02a-4d4e-87fc-6199ed59c92f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
