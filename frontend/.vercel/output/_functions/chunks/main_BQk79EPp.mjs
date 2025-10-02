import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, k as renderComponent, n as renderSlot, o as renderHead } from './astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
import { clsx } from 'clsx';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { A as AUTH_API_BASE_URL, I as INFORMATION_API_BASE_URL, D as DASHBOARD_URL } from './constants_BqVuYr7z.mjs';
import { Sun, Moon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Disclosure } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
/* empty css                         */

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="container mx-auto h-16 flex justify-between items-center text-muted-foreground text-sm"> <p>Kevin Agyeman</p> <p>© ${year} All rights</p> </footer>`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/components/astro/Footer.astro", void 0);

async function login(username, password) {
  const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data;
}
function logout() {
  return fetch(`${AUTH_API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
}

function ModeToggle() {
  const [theme, setThemeState] = React.useState("theme-light");
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);
  React.useEffect(() => {
    const isDark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);
  const changeTheme = () => {
    setThemeState((current) => current === "dark" ? "theme-light" : "dark");
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "link",
      size: "icon",
      "aria-label": "Theme changer",
      onClick: changeTheme,
      children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
      ]
    }
  ) });
}

function Logo() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      id: "kevin_agyeman_logo",
      className: "h-8 w-auto fill-black dark:fill-white",
      "data-name": "Kevin Agyeman",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1080 1080",
      children: [
        /* @__PURE__ */ jsx("title", { children: "kevin_agyeman_logo" }),
        /* @__PURE__ */ jsx("path", { d: "M1044.35,1079.5H781.48a35.12,35.12,0,0,1-24.86-10.3L540,852.58,323.38,1069.2a35.12,35.12,0,0,1-24.86,10.3H35.65a35.15,35.15,0,0,1-24.85-60L959.48,70.8H793.75L298.93,565.63a35.15,35.15,0,0,1-60-24.86V35.65A35.15,35.15,0,0,1,274.07.5H466.64a35.15,35.15,0,0,1,35.15,35.15V263.34L754.1,11A35.81,35.81,0,0,1,779.19.5h265.16a35.15,35.15,0,0,1,24.85,60L120.52,1009.2H284L645.5,647.66a35.14,35.14,0,0,1,49.35-.35l76.74,74.57.36.35,297.25,297.26a35.15,35.15,0,0,1-24.85,60ZM796,1009.2H959.48L722.41,772.12l-51.7-50.25-81,81ZM309.22,70.8V455.91L431.49,333.64V70.8Z" }),
        /* @__PURE__ */ jsx("path", { d: "M1043.9,781.93a35.58,35.58,0,0,1-25.19-10.43L812.39,565.18a35.61,35.61,0,0,1,0-50.35L834,493.23h0L1018.71,308.5a35.61,35.61,0,0,1,60.79,25.18V746.32a35.6,35.6,0,0,1-35.6,35.61ZM887.93,540l120.35,120.36V419.64Z" })
      ]
    }
  );
}

async function fetchInformation() {
  const response = await fetch(`${INFORMATION_API_BASE_URL}/`, {
    credentials: "include"
  });
  if (!response.ok) throw new Error("Failed to fetch information");
  return response.json();
}
async function updateInformation(data) {
  let fetchOptions;
  const hasFileImage = data.image instanceof File;
  const hasFileResume = data.resume instanceof File;
  if (hasFileImage || hasFileResume) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== void 0 && data[key] !== null) {
        if (key === "image" && data[key] instanceof File || key === "resume" && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    fetchOptions = {
      method: "PUT",
      body: formData,
      credentials: "include"
    };
  } else {
    fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    };
  }
  const response = await fetch(`${INFORMATION_API_BASE_URL}/`, fetchOptions);
  if (!response.ok) throw new Error("Failed to update information");
  return response.json();
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    month: "short",
    year: "numeric"
  };
  return date.toLocaleDateString("en-US", options);
}
function filterData(data) {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ""));
}
function handleFilePreview(data, setPreview, fieldName) {
  if (data[fieldName]) {
    const fileUrl = data[fieldName].startsWith("http") ? data[fieldName] : `${"https://kevinagyeman-v3.onrender.com"}${data[fieldName]}`;
    setPreview(fileUrl);
  }
  if (typeof data[fieldName] === "string") {
    delete data[fieldName];
  }
}
function getResourceUrl(path) {
  if (path?.startsWith("/media/")) {
    return "https://kevinagyeman-v3.onrender.com" + path;
  } else {
    return "https://placehold.co/600x400?text=Hello+World";
  }
}

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [information, setInformation] = useState();
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedAuth === "true");
    loadInformation();
  }, []);
  const handleLogout = async () => {
    await logout();
    localStorage.setItem("isAuthenticated", "false");
    window.location.href = "/";
  };
  const loadInformation = async () => {
    const data = await fetchInformation();
    setInformation(data);
  };
  const resumeUrl = getResourceUrl(information?.resume);
  const imageUrl = getResourceUrl(information?.image);
  const navigation = [
    { name: `Home`, href: "/" },
    { name: `About`, href: "/about" },
    { name: `Contact`, href: "/contact" },
    { name: `Resume`, href: resumeUrl },
    ...isAuthenticated ? [
      { name: `Dashboard`, href: "/admin/dashboard" },
      { name: `New Project`, href: "/admin/project/new" },
      {
        name: `Edit Profile`,
        href: "/admin/information"
      }
    ] : []
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Disclosure,
    {
      as: "nav",
      className: "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm",
      children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto container px-4 sm:px-0", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-16 items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden", children: [
            /* @__PURE__ */ jsxs(Disclosure.Button, { className: "relative inline-flex items-center justify-center rounded-md pr-2 text-black hover:text-black   dark:text-white  dark:hover:text-white ", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
              open ? /* @__PURE__ */ jsx(XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsx(ModeToggle, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-shrink-0 items-center", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx(Logo, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "hidden sm:ml-6 sm:block w-full", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-4 flex-wrap", children: navigation.map((item) => /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsx("a", { href: item.href, children: item.name }) }, item.name)) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0", children: [
            /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx(ModeToggle, {}) }),
            isAuthenticated ? /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleLogout,
                variant: "outline",
                size: "sm",
                children: "Logout"
              }
            ) : /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: "profile",
                className: "w-[30px] h-auto object-cover rounded-full border cursor-pointer",
                style: { aspectRatio: "1/1" },
                onClick: () => window.location.href = DASHBOARD_URL
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Disclosure.Panel, { className: "sm:hidden", children: /* @__PURE__ */ jsx("div", { className: "space-y-1 pb-2 container", children: navigation.map((item, index) => /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "text-light hover:text-light block rounded-md py-2 text-base font-medium",
            children: /* @__PURE__ */ jsx(Disclosure.Button, { children: item.name })
          },
          index
        )) }) })
      ] })
    }
  ) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Main;
  const { content } = Astro2.props;
  return renderTemplate(_a || (_a = __template([`<script>
  const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (typeof localStorage !== 'undefined') {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
<\/script> <html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>`, "</title>", '</head> <body> <div class="flex min-h-screen flex-col"> ', ' <div class="flex-grow container mx-auto px-4 sm:px-0"> ', " </div> ", " </div> </body></html>"])), content.title, renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/Navbar", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/layouts/main.astro", void 0);

export { $$Main as $, Button as B, filterData as a, formatDate as b, cn as c, fetchInformation as f, getResourceUrl as g, handleFilePreview as h, login as l, updateInformation as u };
