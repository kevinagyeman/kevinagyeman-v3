import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D-S52Jbh.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { D as DASHBOARD_URL } from '../chunks/constants_BqVuYr7z.mjs';
import { B as Button, l as login, $ as $$Main } from '../chunks/main_DK1f-WSd.mjs';
import 'react';
import { C as CustomInput } from '../chunks/CustomInput_R2taXubc.mjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

function Auth() {
  const form = useForm({
    resolver: zodResolver(authSchema)
  });
  const errors = form.formState.errors;
  const submitAuth = async (data) => {
    await login(data.username, data.password);
    localStorage.setItem("isAuthenticated", "true");
    window.location.href = DASHBOARD_URL;
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(submitAuth), className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      CustomInput,
      {
        labelText: "Username",
        inputType: "text",
        placeholder: "Username",
        inputProps: form.register("username"),
        error: errors.username?.message
      }
    ),
    /* @__PURE__ */ jsx(
      CustomInput,
      {
        labelText: "Password",
        inputType: "password",
        placeholder: "Password",
        inputProps: form.register("password"),
        error: errors.password?.message
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: form.formState.isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Login" }),
    /* @__PURE__ */ jsx(Button, { type: "button", className: "w-full", variant: "ghost", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Homepage" }) })
  ] });
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Login" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-screen px-4" style="min-height: calc(100vh - 65px);"> <div class="w-full max-w-xs"> ${renderComponent($$result2, "Auth", Auth, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Auth", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/login.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
