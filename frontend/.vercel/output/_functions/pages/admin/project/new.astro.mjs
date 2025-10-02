import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_D-S52Jbh.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../../../chunks/main_DK1f-WSd.mjs';
import { P as ProjectForm } from '../../../chunks/ProjectForm_CIvFntfB.mjs';
export { renderers } from '../../../renderers.mjs';

const $$New = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "New Project" } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProjectForm", ProjectForm, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/components/ProjectForm.tsx", "client:component-export": "default" })} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/new.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/project/new.astro";
const $$url = "/admin/project/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
