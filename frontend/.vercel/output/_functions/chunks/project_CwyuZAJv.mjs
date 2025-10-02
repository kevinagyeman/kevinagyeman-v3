import { P as PROJECT_API_BASE_URL } from './constants_BqVuYr7z.mjs';

async function fetchProjects() {
  const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
    credentials: "include"
  });
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}
async function fetchProject(id) {
  const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
    credentials: "include"
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) throw new Error("Failed to fetch project");
  return response.json();
}
async function createProject(data) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== void 0 && data[key] !== null) {
      if (key === "image" && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  const response = await fetch(`${PROJECT_API_BASE_URL}/`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });
  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
}
async function updateProject(id, data) {
  let fetchOptions;
  const hasFile = data.image instanceof File;
  if (hasFile) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== void 0 && data[key] !== null) {
        if (key === "image" && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    fetchOptions = {
      method: "PUT",
      body: formData,
      credentials: "include"
    };
  } else {
    fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    };
  }
  const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, fetchOptions);
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
}
async function deleteProject(id) {
  const response = await fetch(`${PROJECT_API_BASE_URL}/${id}/`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return;
}

export { fetchProject as a, createProject as c, deleteProject as d, fetchProjects as f, updateProject as u };
