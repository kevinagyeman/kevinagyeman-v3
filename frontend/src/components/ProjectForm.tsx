import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { DASHBOARD_URL } from "@/constants";
import { type ProjectSchema, projectSchema } from "@/schemas/project-schema";
import { createProject, fetchProject, updateProject } from "@/services/project";
import { filterProjectData } from "@/utils/utils";
import DeleteProject from "./DeleteProject";
import CustomCheckbox from "./form/CustomCheckbox";
import CustomInput from "./form/CustomInput";
import CustomTextArea from "./form/CustomTextArea";
import CustomUpload from "./form/CustomUpload";
import { Button } from "./ui/button";

interface ProjectFormProps {
	projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
	const [imagePreview, setImagePreview] = useState<string>("");
	const [error, setError] = useState<string>("");

	const form = useForm<ProjectSchema>({
		resolver: zodResolver(projectSchema),
	});

	const errors = form.formState.errors;

	useEffect(() => {
		if (!projectId || projectId === "new") return;

		const loadProject = async () => {
			const data = await fetchProject(Number(projectId));
			if (!data) return;
			setImagePreview(`${data.image}`);
			form.reset(data);
		};

		loadProject();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);

	const submitProject: SubmitHandler<ProjectSchema> = async (data) => {
		try {
			setError("");
			if (projectId) {
				await updateProject(Number(projectId), filterProjectData(data));
			} else {
				await createProject(filterProjectData(data));
			}
			window.location.href = DASHBOARD_URL;
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to save project. Please try again.",
			);
		}
	};

	return (
		<>
			<div className="flex gap-2 mb-5 justify-between">
				<Button size={"sm"} variant={"outline"}>
					<a href={DASHBOARD_URL}>Dashboard</a>
				</Button>
				{projectId && <DeleteProject projectId={Number(projectId)} />}
			</div>
			<form
				onSubmit={form.handleSubmit(submitProject)}
				className="space-y-6"
				encType="multipart/form-data"
			>
				{error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
						{error}
					</div>
				)}
				<CustomCheckbox
					inputProps={form.register("is_published")}
					label="Published"
				/>
				<CustomUpload
					preview={imagePreview}
					typeOfFile={"image"}
					fieldName="image"
					formControl={form.control}
					error={errors.image?.message}
					labelText="Project Image"
					aspectRatio="16/9"
				/>
				<div className="flex flex-wrap gap-4 items-end">
					<div className="flex-1 min-w-full sm:min-w-0">
						<CustomInput
							inputType="text"
							placeholder="Title"
							labelText="Title"
							inputProps={form.register("title")}
							error={errors.title?.message}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<CustomInput
							inputType="date"
							labelText="Start Date"
							placeholder="Start Date"
							inputProps={form.register("start_date")}
							error={errors.start_date?.message}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<CustomInput
							inputType="date"
							labelText="End Date"
							placeholder="End Date"
							inputProps={form.register("end_date")}
							error={errors.end_date?.message}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<CustomCheckbox
							inputProps={form.register("is_present_date")}
							label="Present"
						/>
					</div>
				</div>

				<CustomTextArea
					labelText="Short Description"
					placeholder="Short Description"
					textAreaProps={form.register("short_description")}
					error={errors.short_description?.message}
				/>
				<CustomTextArea
					labelText="Description"
					placeholder="Description"
					textAreaProps={form.register("description")}
					error={errors.description?.message}
				/>
				<CustomTextArea
					labelText="Skills"
					placeholder="Skills"
					textAreaProps={form.register("skills")}
					error={errors.skills?.message}
					hint="Separate with ; e.g, React;Python;Java"
				/>
				<CustomTextArea
					labelText="Links"
					placeholder="Links"
					textAreaProps={form.register("links")}
					error={errors.links?.message}
					hint="Separate with ; e.g, Example;https://ex.com;Google;https://gg.com"
				/>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full"
				>
					{form.formState.isSubmitting ? (
						<Loader2 className="animate-spin" />
					) : (
						"Confirm"
					)}
				</Button>
			</form>
		</>
	);
}
