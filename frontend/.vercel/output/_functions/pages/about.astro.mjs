import { e as createComponent, k as renderComponent, r as renderTemplate, l as Fragment, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { E as EditAsAdmin, S as Skills } from '../chunks/Skills_Cfd1DpBP.mjs';
import { L as Links } from '../chunks/Links_CPils8MG.mjs';
import { f as fetchInformation, $ as $$Main, g as getResourceUrl } from '../chunks/main_BQk79EPp.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const information = await fetchInformation();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "About" } }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="grid gap-6
          grid-cols-1
          md:grid-cols-4
          lg:grid-cols-6
          mt-6"> <div class="md:col-span-1 lg:col-span-2"> ${renderComponent($$result3, "EditAsAdmin", EditAsAdmin, { "href": "/admin/information" })} <img${addAttribute(getResourceUrl(information?.image), "src")} alt="profile image" class="w-full h-auto object-cover rounded-xl border"${addAttribute({ aspectRatio: "1/1" }, "style")}> <div class="hidden md:block lg:hidden mt-4"> ${information.skills && renderTemplate`${renderComponent($$result3, "Skills", Skills, { "skillsString": information.skills })}`} </div> </div> <div class="space-y-4 md:col-span-3 lg:col-span-3"> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold"> ${information.first_name} ${information.last_name} </h1> <p class="text-base sm:text-lg md:text-xl text-muted-foreground font-light"> ${information.summary} </p> <p class="text-base sm:text-lg md:text-xl font-light"> ${information.about} </p> <div class="md:hidden"> ${information.skills && renderTemplate`${renderComponent($$result3, "Skills", Skills, { "skillsString": information.skills })}`} </div> ${information.links && renderTemplate`${renderComponent($$result3, "Links", Links, { "linksString": information.links })}`} </div> <div class="hidden lg:block lg:col-span-1"> ${information.skills && renderTemplate`${renderComponent($$result3, "Skills", Skills, { "skillsString": information.skills, "variant": "secondary" })}`} </div> </div> ` })} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/about/index.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/about/index.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
