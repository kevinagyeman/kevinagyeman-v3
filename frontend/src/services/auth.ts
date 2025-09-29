const AUTH_BASE_URL = 'http://localhost:8000/api';

export async function login(username: string, password: string) {
  const response = await fetch(`${AUTH_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  return data;
}

export function logout() {
  return fetch(`${AUTH_BASE_URL}/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
