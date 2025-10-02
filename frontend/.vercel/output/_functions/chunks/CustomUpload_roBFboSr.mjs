import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import 'react';
import { c as cn, B as Button } from './main_BQk79EPp.mjs';
import { L as Label, I as Input } from './CustomInput_976WQZZZ.mjs';
import { Controller } from 'react-hook-form';

function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}

function CustomTextArea({
  labelText,
  placeholder,
  hint,
  rows = 1,
  textAreaProps,
  error
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-2", children: labelText }),
    /* @__PURE__ */ jsx(Textarea, { placeholder, rows, ...textAreaProps }),
    hint && /* @__PURE__ */ jsx("small", { className: "text-xs text-muted-foreground", children: hint }),
    error && /* @__PURE__ */ jsx("small", { className: "text-xs text-red", children: error })
  ] });
}

function CustomUpload({
  preview,
  fieldName,
  formControl,
  error,
  labelText,
  typeOfFile,
  aspectRatio
}) {
  const accept = typeOfFile === "file" ? "application/pdf" : "image/*";
  const ratio = aspectRatio ? aspectRatio : "1/1";
  return /* @__PURE__ */ jsx(
    Controller,
    {
      name: fieldName,
      control: formControl,
      render: ({ field }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2", children: labelText }),
        typeOfFile === "file" ? /* @__PURE__ */ jsx(Fragment, { children: preview && !field.value && /* @__PURE__ */ jsx(Button, { className: "mb-2", variant: "outline", children: /* @__PURE__ */ jsx("a", { href: preview, target: "_blank", rel: "noopener noreferrer", children: "View current resume" }) }) }) : /* @__PURE__ */ jsx(Fragment, { children: preview && !field.value && /* @__PURE__ */ jsx(
          "img",
          {
            src: preview,
            alt: "Project Image Preview",
            className: "w-[200px] h-auto object-cover rounded-xl border",
            style: { aspectRatio: ratio }
          }
        ) }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "file",
            accept,
            onChange: (e) => field.onChange(e.target.files?.[0])
          }
        ),
        error && /* @__PURE__ */ jsx("small", { className: "text-sm text-red", children: error })
      ] })
    }
  );
}

export { CustomUpload as C, CustomTextArea as a };
