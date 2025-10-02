import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button, $ as $$Main } from '../../chunks/main_BQk79EPp.mjs';
import { f as fetchProjects, d as deleteProject } from '../../chunks/project_CwyuZAJv.mjs';
import { TrashIcon } from 'lucide-react';
import { D as DateDisplay } from '../../chunks/DateDisplay_Bgl3UKLK.mjs';
export { renderers } from '../../renderers.mjs';

function DashboardActions() {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-5", children: [
    /* @__PURE__ */ jsx(Button, { variant: "secondary", children: /* @__PURE__ */ jsx("a", { href: "/admin/project/new", children: "New Project" }) }),
    /* @__PURE__ */ jsx(Button, { variant: "secondary", children: /* @__PURE__ */ jsx("a", { href: "/admin/information", children: "Edit Profile" }) })
  ] });
}

function DashboardProjectsList() {
  const [projects, setProjects] = useState();
  useEffect(() => {
    loadProjects();
  }, []);
  const handleDelete = async (id) => {
    await deleteProject(id);
    window.location.reload();
  };
  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-5", children: "Projects List" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 mt-2", children: projects?.map((project, number) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex justify-between p-2 border rounded-xl items-center bg-card",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `w-[10px] h-[10px] flex-shrink-0 rounded-full ${project.is_published ? "bg-green-500" : "bg-yellow-500"}`
              }
            ),
            /* @__PURE__ */ jsx(DateDisplay, { period: project }),
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold line-clamp-1", children: project.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsx("a", { href: `/admin/project/${project.id}`, children: "Edit" }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => handleDelete(project.id),
                size: "sm",
                variant: "destructive",
                children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
              }
            )
          ] })
        ]
      },
      number
    )) })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Dashboard" } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardActions", DashboardActions, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/DashboardActions", "client:component-export": "default" })} ${renderComponent($$result2, "DashboardProjectsList", DashboardProjectsList, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/DashboardProjectsList", "client:component-export": "default" })} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/dashboard/index.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/dashboard/index.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
