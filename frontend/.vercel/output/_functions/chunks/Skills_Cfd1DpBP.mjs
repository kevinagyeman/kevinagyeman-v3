import { jsx, Fragment } from 'react/jsx-runtime';
import { B as Button, c as cn } from './main_BQk79EPp.mjs';
import 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

function EditAsAdmin({ href }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "my-4", variant: "outline", children: /* @__PURE__ */ jsx("a", { href, className: "text-cyan-500", children: "Edit as admin" }) })  });
}

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

function Skills({
  skillsString,
  limit = Number.MAX_VALUE,
  variant
}) {
  const skills = skillsString.split(";").map((skill) => skill.trim()).filter((skill) => skill);
  const displayedSkills = skills.slice(0, limit);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: displayedSkills.map((skill, index) => /* @__PURE__ */ jsx(Badge, { variant, children: skill }, index)) });
}

export { EditAsAdmin as E, Skills as S };
