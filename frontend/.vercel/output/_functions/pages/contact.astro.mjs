import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { f as fetchInformation, $ as $$Main } from '../chunks/main_BQk79EPp.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const information = await fetchInformation();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Contact" } }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <pre>${JSON.stringify(information, null, 2)}</pre> </div> ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/contact/index.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/contact/index.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
