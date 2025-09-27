import { authorizedFetch } from './auth';

const API_BASE_URL = 'http://localhost:8000/api/projects';

export async function fetchProjects() {
  const response = await authorizedFetch(`${API_BASE_URL}/`);
  return response.json();
}

export async function fetchProject(id: any) {
  const response = await authorizedFetch(`${API_BASE_URL}/${id}/`);
  return response.json();
}

export async function createProject(data: any) {
  const response = await authorizedFetch(`${API_BASE_URL}/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateProject(id: any, data: any) {
  const response = await authorizedFetch(`${API_BASE_URL}/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteProject(id: any) {
  const response = await authorizedFetch(`${API_BASE_URL}/${id}/`, {
    method: 'DELETE',
  });
  return;
}
