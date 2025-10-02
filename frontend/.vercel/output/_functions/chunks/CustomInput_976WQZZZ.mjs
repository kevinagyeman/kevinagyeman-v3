import { M as MAX_FILE_SIZE } from './constants_BqVuYr7z.mjs';
import z from 'zod';
import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { c as cn } from './main_BQk79EPp.mjs';
import * as LabelPrimitive from '@radix-ui/react-label';

const textFormat = z.string().optional().nullable();
const imageFormat = z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: "File size must be less than 1MB"
});
const fileFormat = z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: "File size must be less than 1MB"
});
const dateFormat = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format");

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}

function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

function CustomInput({
  labelText,
  inputType = "text",
  placeholder,
  hint,
  pattern,
  inputProps,
  error
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    labelText && /* @__PURE__ */ jsx(Label, { className: "mb-2", children: labelText }),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: inputType,
        placeholder,
        pattern,
        ...inputProps
      }
    ),
    hint && /* @__PURE__ */ jsx("small", { className: "text-sm text-muted-foreground", children: hint }),
    error && /* @__PURE__ */ jsx("small", { className: "text-sm text-red", children: error })
  ] });
}

export { CustomInput as C, Input as I, Label as L, dateFormat as d, fileFormat as f, imageFormat as i, textFormat as t };
