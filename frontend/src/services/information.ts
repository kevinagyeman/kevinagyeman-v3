import { INFORMATION_API_BASE_URL } from '@/constants';

export async function fetchInformation() {
  const response = await fetch(`${INFORMATION_API_BASE_URL}/`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch information');
  return response.json();
}

export async function updateInformation(data: any) {
  let fetchOptions: RequestInit;

  const hasFileImage = data.image instanceof File;
  const hasFileResume = data.resume instanceof File;

  if (hasFileImage || hasFileResume) {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        if (
          (key === 'image' && data[key] instanceof File) ||
          (key === 'resume' && data[key] instanceof File)
        ) {
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

  const response = await fetch(`${INFORMATION_API_BASE_URL}/`, fetchOptions);

  if (!response.ok) throw new Error('Failed to update information');
  return response.json();
}
