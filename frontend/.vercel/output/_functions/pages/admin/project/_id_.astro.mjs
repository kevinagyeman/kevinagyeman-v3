import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { P as ProjectForm } from '../../../chunks/ProjectForm_yp84D9mI.mjs';
import { $ as $$Main } from '../../../chunks/main_BQk79EPp.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Edit Project" } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProjectForm", ProjectForm, { "projectId": id, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/ProjectForm", "client:component-export": "default" })} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/[id].astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/[id].astro";
const $$url = "/admin/project/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
