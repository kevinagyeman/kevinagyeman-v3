import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { D as DateDisplay } from '../../chunks/DateDisplay_Bgl3UKLK.mjs';
import { E as EditAsAdmin, S as Skills } from '../../chunks/Skills_Cfd1DpBP.mjs';
import { L as Links } from '../../chunks/Links_CPils8MG.mjs';
import { $ as $$Main, g as getResourceUrl } from '../../chunks/main_BQk79EPp.mjs';
import { a as fetchProject } from '../../chunks/project_CwyuZAJv.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const project = await fetchProject(id);
  if (!project) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Project Info" } }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid gap-6
          grid-cols-1
          md:grid-cols-4
          lg:grid-cols-6
          mt-6"> <div class="md:col-span-1 lg:col-span-2"> ${renderComponent($$result2, "EditAsAdmin", EditAsAdmin, { "href": `/admin/project/${project.id}` })} <img${addAttribute(getResourceUrl(project?.image), "src")} alt="project image" class="w-full h-auto object-cover rounded-xl border"${addAttribute({ aspectRatio: "16/9" }, "style")}> <div class="hidden md:block lg:hidden mt-4"> ${project.skills && renderTemplate`${renderComponent($$result2, "Skills", Skills, { "skillsString": project.skills })}`} </div> </div> <div class="space-y-4 md:col-span-3 lg:col-span-3"> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold"> ${project.title} </h1> ${renderComponent($$result2, "DateDisplay", DateDisplay, { "period": project })} <p class="text-base sm:text-lg md:text-xl text-muted-foreground font-light"> ${project.short_description} </p> <p class="text-base sm:text-lg md:text-xl font-light"> ${project.description} </p> <div class="md:hidden"> ${project.skills && renderTemplate`${renderComponent($$result2, "Skills", Skills, { "skillsString": project.skills })}`} </div> ${project.links && renderTemplate`${renderComponent($$result2, "Links", Links, { "linksString": project.links })}`} </div> <div class="hidden lg:block lg:col-span-1"> ${project.skills && renderTemplate`${renderComponent($$result2, "Skills", Skills, { "skillsString": project.skills, "variant": "secondary" })}`} </div> </div> ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/project/[id].astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/project/[id].astro";
const $$url = "/project/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
