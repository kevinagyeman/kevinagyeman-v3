import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D-S52Jbh.mjs';
import 'kleur/colors';
import { $ as $$Main, B as Button } from '../chunks/main_DK1f-WSd.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Page not found" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-screen px-4" style="min-height: calc(100vh - 65px);"> <div class="w-full max-w-xs text-center space-y-4"> <h1 class="text-9xl">404</h1> <p class="text-muted-foreground">
Sorry, the page you are looking for does not exist or may have been
        removed.
</p> <div class="flex gap-3 justify-center"> ${renderComponent($$result2, "Button", Button, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/ui/button", "client:component-export": "Button" }, { "default": ($$result3) => renderTemplate`<a href="/">Homepage</a>` })} </div> </div> </div> ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/404.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
