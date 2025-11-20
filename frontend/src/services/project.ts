import { PROJECT_API_BASE_URL } from "@/constants";
import type { ProjectSchema } from "@/schemas/project-schema";

async function getErrorMessage(
	response: Response,
	fallback: string,
): Promise<string> {
	try {
		const data = await response.json();
		if (data.detail) return data.detail;
		if (typeof data === "object") {
			const errors = Object.entries(data)
				.map(([field, messages]) => {
					if (Array.isArray(messages)) {
						return `${field}: ${messages.join(", ")}`;
					}
					return `${field}: ${messages}`;
				})
				.join("; ");
			if (errors) return errors;
		}
		return JSON.stringify(data);
	} catch {
		return fallback;
	}
}

export async function fetchProjects(): Promise<ProjectSchema[]> {
	const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
		credentials: "include",
	});
	if (!response.ok) {
		const message = await getErrorMessage(response, "Failed to fetch projects");
		throw new Error(message);
	}
	return response.json();
}

export async function fetchProject(id: number): Promise<ProjectSchema | null> {
	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
		credentials: "include",
	});
	if (response.status === 404) {
		return null;
	}
	if (!response.ok) {
		const message = await getErrorMessage(response, "Failed to fetch project");
		throw new Error(message);
	}
	return response.json();
}

export async function createProject(
	data: ProjectSchema,
): Promise<ProjectSchema> {
	const formData = new FormData();

	for (const key in data) {
		const typedKey = key as keyof ProjectSchema;
		const value = data[typedKey];
		if (value !== undefined && value !== null) {
			formData.append(key, value as string | Blob);
		}
	}

	const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
		method: "POST",
		body: formData,
		credentials: "include",
	});

	if (!response.ok) {
		const message = await getErrorMessage(response, "Failed to create project");
		throw new Error(message);
	}
	return response.json();
}
export async function updateProject(
	id: number,
	data: ProjectSchema,
): Promise<ProjectSchema> {
	let fetchOptions: RequestInit;

	const hasFile = data.image instanceof File;

	if (hasFile) {
		const formData = new FormData();

		for (const key in data) {
			const typedKey = key as keyof ProjectSchema;
			const value = data[typedKey];
			if (value !== undefined && value !== null) {
				formData.append(key, value as string | Blob);
			}
		}

		fetchOptions = {
			method: "PUT",
			body: formData,
			credentials: "include",
		};
	} else {
		fetchOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		};
	}

	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, fetchOptions);

	if (!response.ok) {
		const message = await getErrorMessage(response, "Failed to update project");
		throw new Error(message);
	}
	return response.json();
}

export async function deleteProject(id: number) {
	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
		method: "DELETE",
		credentials: "include",
	});
	if (!response.ok) {
		const message = await getErrorMessage(response, "Failed to delete project");
		throw new Error(message);
	}
	return;
}
