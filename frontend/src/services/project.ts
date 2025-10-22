import { PROJECT_API_BASE_URL } from '@/constants';
import type { Project } from '@/types/project-type';

export async function fetchProjects(): Promise<Project[]> {
	const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
		credentials: 'include',
	});
	if (!response.ok) throw new Error('Failed to fetch projects');
	return response.json();
}

export async function fetchProject(id: number): Promise<Project | null> {
	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
		credentials: 'include',
	});
	if (response.status === 404) {
		return null;
	}
	if (!response.ok) throw new Error('Failed to fetch project');
	return response.json();
}

export async function createProject(data: Project): Promise<Project> {
	const formData = new FormData();

	for (const key in data) {
		const typedKey = key as keyof Project;
		const value = data[typedKey];
		if (value !== undefined && value !== null) {
			formData.append(key, value as string | Blob);
		}
	}

	const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
		method: 'POST',
		body: formData,
		credentials: 'include',
	});

	if (!response.ok) throw new Error('Failed to create project');
	return response.json();
}
export async function updateProject(id: number, data: any): Promise<Project> {
	let fetchOptions: RequestInit;

	const hasFile = data.image instanceof File;

	if (hasFile) {
		const formData = new FormData();

		for (const key in data) {
			const typedKey = key as keyof Project;
			const value = data[typedKey];
			if (value !== undefined && value !== null) {
				formData.append(key, value as string | Blob);
			}
		}

		fetchOptions = {
			method: 'PUT',
			body: formData,
			credentials: 'include',
		};
	} else {
		fetchOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'include',
		};
	}

	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, fetchOptions);

	if (!response.ok) throw new Error('Failed to update project');
	return response.json();
}

export async function deleteProject(id: number) {
	const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (!response.ok) throw new Error('Failed to delete project');
	return;
}
