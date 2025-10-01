import { PROJECT_API_BASE_URL } from '@/constants';
import type { Project } from '@/types/project-type';

export async function fetchProjects() {
  const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchProject(id: any): Promise<Project | null> {
  const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
    credentials: 'include',
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
}

export async function createProject(data: any) {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      if (key === 'image' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
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
export async function updateProject(id: string, data: any) {
  let fetchOptions: RequestInit;

  const hasFile = data.image instanceof File;

  if (hasFile) {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        if (key === 'image' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
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

export async function deleteProject(id: any) {
  const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return;
}
