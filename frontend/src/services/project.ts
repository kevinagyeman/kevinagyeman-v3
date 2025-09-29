const API_BASE_URL = 'http://localhost:8000/api/projects';

export async function fetchProjects() {
  const response = await fetch(`${API_BASE_URL}/`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchProject(id: any) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    credentials: 'include',
  });
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

  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}
export async function updateProject(id: any, data: any) {
  // Se data contiene file (es. data.image è instanceof File), usa FormData, altrimenti JSON
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
    // Nessun file, normale JSON
    fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
  }

  const response = await fetch(`${API_BASE_URL}/${id}/`, fetchOptions);

  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(id: any) {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return;
}
