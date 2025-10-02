import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { D as DASHBOARD_URL } from './constants_BqVuYr7z.mjs';
import { z } from 'zod';
import { i as imageFormat, t as textFormat, d as dateFormat, L as Label, C as CustomInput } from './CustomInput_976WQZZZ.mjs';
import { a as fetchProject, u as updateProject, c as createProject, d as deleteProject } from './project_CwyuZAJv.mjs';
import { h as handleFilePreview, B as Button, a as filterData } from './main_BQk79EPp.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { C as CustomUpload, a as CustomTextArea } from './CustomUpload_roBFboSr.mjs';

const projectSchema = z.object({
  id: z.number().optional(),
  is_present_date: z.boolean(),
  is_published: z.boolean(),
  start_date: dateFormat,
  end_date: textFormat,
  title: z.string().min(1),
  description: textFormat,
  short_description: textFormat,
  skills: textFormat,
  links: textFormat,
  image: imageFormat.optional()
});

function CustomCheckbox({ inputProps, label }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", ...inputProps }),
    /* @__PURE__ */ jsx(Label, { children: label })
  ] }) });
}

function ProjectForm({ projectId }) {
  const [imagePreview, setImagePreview] = useState("");
  const form = useForm({
    resolver: zodResolver(projectSchema)
  });
  const errors = form.formState.errors;
  useEffect(() => {
    if (!projectId) return;
    if (projectId === "new") return;
    loadProject(projectId);
  }, [projectId]);
  const loadProject = async (id) => {
    const data = await fetchProject(id);
    handleFilePreview(data, setImagePreview, "image");
    form.reset(data);
  };
  const submitProject = async (data) => {
    if (projectId) {
      await updateProject(projectId, filterData(data));
    } else {
      await createProject(filterData(data));
    }
    window.location.href = DASHBOARD_URL;
  };
  const handleDelete = async (id) => {
    await deleteProject(id);
    window.location.href = DASHBOARD_URL;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 my-5 justify-between", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsx("a", { href: DASHBOARD_URL, children: "Dashboard" }) }),
      projectId && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => handleDelete(projectId),
          size: "sm",
          variant: "destructive",
          children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: form.handleSubmit(submitProject),
        className: "space-y-6",
        encType: "multipart/form-data",
        children: [
          /* @__PURE__ */ jsx(
            CustomCheckbox,
            {
              inputProps: form.register("is_published"),
              label: "Published"
            }
          ),
          /* @__PURE__ */ jsx(
            CustomUpload,
            {
              preview: imagePreview,
              typeOfFile: "image",
              fieldName: "image",
              formControl: form.control,
              error: errors.image?.message,
              labelText: "Project Image",
              aspectRatio: "16/9"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-full sm:min-w-0", children: /* @__PURE__ */ jsx(
              CustomInput,
              {
                inputType: "text",
                placeholder: "Title",
                labelText: "Title",
                inputProps: form.register("title"),
                error: errors.title?.message
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(
              CustomInput,
              {
                inputType: "date",
                labelText: "Start Date",
                placeholder: "Start Date",
                inputProps: form.register("start_date"),
                error: errors.start_date?.message
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(
              CustomInput,
              {
                inputType: "date",
                labelText: "End Date",
                placeholder: "End Date",
                inputProps: form.register("end_date"),
                error: errors.end_date?.message
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(
              CustomCheckbox,
              {
                inputProps: form.register("is_present_date"),
                label: "Present"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            CustomTextArea,
            {
              labelText: "Short Description",
              placeholder: "Short Description",
              textAreaProps: form.register("short_description"),
              error: errors.short_description?.message
            }
          ),
          /* @__PURE__ */ jsx(
            CustomTextArea,
            {
              labelText: "Description",
              placeholder: "Description",
              textAreaProps: form.register("description"),
              error: errors.description?.message
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
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              disabled: form.formState.isSubmitting,
              className: "w-full",
              children: form.formState.isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Confirm"
            }
          )
        ]
      }
    )
  ] });
}

export { ProjectForm as P };
