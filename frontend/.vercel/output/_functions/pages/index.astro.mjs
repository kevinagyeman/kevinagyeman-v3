import { e as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_D-S52Jbh.mjs';
import 'kleur/colors';
import { f as fetchInformation, g as getResourceUrl, B as Button, $ as $$Main } from '../chunks/main_DK1f-WSd.mjs';
import { S as Skills, E as EditAsAdmin } from '../chunks/Skills_CYnOUBwl.mjs';
import { LinkedinIcon, Github } from 'lucide-react';
import { f as fetchProjects } from '../chunks/project_CwyuZAJv.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const information = await fetchInformation();
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-0 sm:gap-12 py-12 md:py-24 lg:py-32 flex-col md:flex-row"> <div class="flex gap-4 items-center"> <img${addAttribute(getResourceUrl(information?.image), "src")} alt="profile image" class="rounded-lg object-cover aspect-square w-[80px] md:h-full md:w-full"> <div class="block sm:hidden"> <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"> ${information.role} </code> <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-2"> ${information.first_name} ${information.last_name} </h1> </div> </div> <div class="space-y-6 my-auto"> <div class="hidden sm:block"> <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"> ${information.role} </code> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6"> ${information.first_name} ${information.last_name} </h1> </div> <p class="text-base sm:text-lg md:text-xl text-muted-foreground font-light"> ${information.about} </p> ${information.skills && renderTemplate`${renderComponent($$result, "Skills", Skills, { "skillsString": information.skills, "limit": 4, "variant": "secondary" })}
          <div></div>`} <div class="flex gap-4 flex-wrap"> ${renderComponent($$result, "Button", Button, { "variant": "default" }, { "default": async ($$result2) => renderTemplate` <a${addAttribute(`/about`, "href")}> Read More </a> ` })} ${renderComponent($$result, "Button", Button, { "variant": "secondary" }, { "default": async ($$result2) => renderTemplate` <a${addAttribute(getResourceUrl(information.resume), "href")}> Read my CV </a> ` })} ${renderComponent($$result, "Button", Button, { "variant": "outline", "size": "icon", "className": "rounded-full" }, { "default": async ($$result2) => renderTemplate` <a${addAttribute("https://www.linkedin.com/in/kevinagyeman/", "href")} target="_blank"> ${renderComponent($$result2, "LinkedinIcon", LinkedinIcon, { "className": "w-4 h-4" })} </a> ` })} ${renderComponent($$result, "Button", Button, { "variant": "outline", "size": "icon", "className": "rounded-full" }, { "default": async ($$result2) => renderTemplate` <a${addAttribute("https://github.com/kevinagyeman", "href")} target="_blank"> ${renderComponent($$result2, "Github", Github, { "className": "w-4 h-4" })} </a> ` })} </div> </div> </div>`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/components/astro/Hero.astro", void 0);

const $$ProjectsList = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await fetchProjects();
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> ${projects.map((project, index) => renderTemplate`<div class="border rounded-lg"> <img${addAttribute(getResourceUrl(project?.image), "src")} alt="profile image" class="w-full h-auto object-cover rounded-tr-xl rounded-tl-xl border-b"${addAttribute({ aspectRatio: "16/9" }, "style")}> <div class="p-6"> <h3 class="line-clamp-1 font-bold mb-1 lg:text-2xl md:text-xl sm:text-lg"> ${project.title} </h3> <p class="line-clamp-2 text-muted-foreground mt-0 lg:text-base md:text-sm sm:text-sm"> ${project.short_description} </p> ${project.skills && renderTemplate`<div class="mt-4"> ${renderComponent($$result, "Skills", Skills, { "skillsString": project.skills, "limit": 4, "variant": "outline" })} </div>`} ${renderComponent($$result, "Button", Button, { "variant": "secondary", "size": "sm", "className": "mt-4" }, { "default": async ($$result2) => renderTemplate` <a${addAttribute(`/project/${project.id}`, "href")}>Read more</a> ` })} ${renderComponent($$result, "EditAsAdmin", EditAsAdmin, { "href": "/admin/project/" + project.id })} </div> </div>`)} </div>`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/components/astro/ProjectsList.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Kevin Agyeman" } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "ProjectsList", $$ProjectsList, {})} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/index.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
