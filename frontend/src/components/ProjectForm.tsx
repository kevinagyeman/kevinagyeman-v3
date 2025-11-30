import { DASHBOARD_URL } from "@/constants";
import { type ProjectSchema, projectSchema } from "@/schemas/project-schema";
import { createProject, fetchProject, updateProject } from "@/services/project";
import { filterProjectData } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import DeleteProject from "./DeleteProject";
import CustomCheckbox from "./form/CustomCheckbox";
import CustomDatePicker from "./form/CustomDatePicker";
import CustomInput from "./form/CustomInput";
import CustomTextArea from "./form/CustomTextArea";
import CustomUpload from "./form/CustomUpload";
import { Button } from "./ui/button";
import ErrorAlert from "./ui/ErrorAlert";

interface ProjectFormProps {
	projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
	const [imagePreview, setImagePreview] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

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

			if (data.start_date) {
				setStartDate(new Date(data.start_date));
			}
			if (data.end_date) {
				setEndDate(new Date(data.end_date));
			}

			form.reset(data);
		};

		loadProject();
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

	const handleStartDateChange = (dateString: string) => {
		setStartDate(new Date(dateString));
		form.setValue("start_date", dateString);
	};

	const handleEndDateChange = (dateString: string) => {
		setEndDate(new Date(dateString));
		form.setValue("end_date", dateString);
	};

	return (
		<>
			<div className="flex gap-2 mb-5 justify-between">
				<Button size={"sm"} variant={"outline"} asChild>
					<a href={DASHBOARD_URL}>Dashboard</a>
				</Button>
				{projectId && <DeleteProject projectId={Number(projectId)} />}
			</div>
			<form
				onSubmit={form.handleSubmit(submitProject)}
				className="space-y-6"
				encType="multipart/form-data"
			>
				<ErrorAlert error={error} />
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
						<CustomDatePicker
							labelText="Start Date"
							initialDate={startDate}
							onChange={handleStartDateChange}
							error={errors.start_date?.message}
						/>
					</div>
					<div className="w-full sm:w-auto">
						<CustomDatePicker
							labelText="End Date"
							initialDate={endDate}
							onChange={handleEndDateChange}
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
