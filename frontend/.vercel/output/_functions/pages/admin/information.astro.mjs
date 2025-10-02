import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_ZlmUJ9I2.mjs';
import 'kleur/colors';
/* empty css                                    */
import { jsxs, jsx } from 'react/jsx-runtime';
import { D as DASHBOARD_URL } from '../../chunks/constants_BqVuYr7z.mjs';
import { z } from 'zod';
import { f as fileFormat, i as imageFormat, t as textFormat, C as CustomInput } from '../../chunks/CustomInput_976WQZZZ.mjs';
import { f as fetchInformation, h as handleFilePreview, B as Button, u as updateInformation, a as filterData, $ as $$Main } from '../../chunks/main_BQk79EPp.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { C as CustomUpload, a as CustomTextArea } from '../../chunks/CustomUpload_roBFboSr.mjs';
export { renderers } from '../../renderers.mjs';

const informationSchema = z.object({
  first_name: z.string().min(1),
  last_name: textFormat,
  role: textFormat,
  main_link: textFormat,
  email: textFormat,
  summary: textFormat,
  about: textFormat,
  skills: textFormat,
  links: textFormat,
  image: imageFormat.optional(),
  resume: fileFormat.optional()
});

function InformationForm() {
  const [imagePreview, setImagePreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");
  const form = useForm({
    resolver: zodResolver(informationSchema)
  });
  const errors = form.formState.errors;
  useEffect(() => {
    loadInformation();
  }, []);
  const loadInformation = async () => {
    const data = await fetchInformation();
    handleFilePreview(data, setImagePreview, "image");
    handleFilePreview(data, setResumePreview, "resume");
    form.reset(data);
  };
  const submitInformation = async (data) => {
    await updateInformation(filterData(data));
    window.location.href = DASHBOARD_URL;
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: form.handleSubmit(submitInformation),
      className: "space-y-6",
      encType: "multipart/form-data",
      children: [
        /* @__PURE__ */ jsx(
          CustomUpload,
          {
            preview: imagePreview,
            typeOfFile: "image",
            fieldName: "image",
            formControl: form.control,
            error: errors.image?.message,
            labelText: "Profile Image",
            aspectRatio: "1/1"
          }
        ),
        /* @__PURE__ */ jsx(
          CustomUpload,
          {
            preview: resumePreview,
            typeOfFile: "file",
            fieldName: "resume",
            formControl: form.control,
            error: errors.resume?.message,
            labelText: "Resume"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsx(
            CustomInput,
            {
              inputType: "text",
              placeholder: "First Name",
              labelText: "First Name",
              inputProps: form.register("first_name"),
              error: errors.first_name?.message
            }
          ),
          /* @__PURE__ */ jsx(
            CustomInput,
            {
              inputType: "text",
              placeholder: "Last Name",
              labelText: "Last Name",
              inputProps: form.register("last_name"),
              error: errors.last_name?.message
            }
          ),
          /* @__PURE__ */ jsx(
            CustomInput,
            {
              inputType: "email",
              placeholder: "Email",
              labelText: "Email",
              inputProps: form.register("email"),
              error: errors.email?.message
            }
          ),
          /* @__PURE__ */ jsx(
            CustomInput,
            {
              inputType: "text",
              placeholder: "Role",
              labelText: "Role",
              inputProps: form.register("role"),
              error: errors.role?.message
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          CustomInput,
          {
            inputType: "text",
            placeholder: "Main Link",
            labelText: "Main Link",
            inputProps: form.register("main_link"),
            error: errors.main_link?.message
          }
        ),
        /* @__PURE__ */ jsx(
          CustomTextArea,
          {
            labelText: "Summary",
            placeholder: "Summary",
            textAreaProps: form.register("summary"),
            error: errors.summary?.message
          }
        ),
        /* @__PURE__ */ jsx(
          CustomTextArea,
          {
            labelText: "About",
            placeholder: "About",
            textAreaProps: form.register("about"),
            error: errors.about?.message
          }
        ),
        /* @__PURE__ */ jsx(
          CustomTextArea,
          {
            labelText: "Skills",
            placeholder: "Skills",
            textAreaProps: form.register("skills"),
            error: errors.skills?.message,
            hint: "Separate with ; e.g, React;Python;Java"
          }
        ),
        /* @__PURE__ */ jsx(
          CustomTextArea,
          {
            labelText: "Links",
            placeholder: "Links",
            textAreaProps: form.register("links"),
            error: errors.links?.message,
            hint: "Separate with ; e.g, Example;https://ex.com;Google;https://gg.com"
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: form.formState.isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Confirm" })
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$Main, { "content": { title: "Information" } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "InformationForm", InformationForm, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/InformationForm", "client:component-export": "default" })} ` })}`;
}, "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/information/index.astro", void 0);

const $$file = "/Users/kevinagyeman/Documents/projects/kevinagyeman-v3/frontend/src/pages/admin/information/index.astro";
const $$url = "/admin/information";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
