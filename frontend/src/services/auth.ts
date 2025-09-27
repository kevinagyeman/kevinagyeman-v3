const AUTH_BASE_URL = 'http://localhost:8000/api';

export async function login(username: string, password: string) {
  const response = await fetch(`${AUTH_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // importante per accettare cookie HttpOnly
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json(); // aspetta solo messaggio, token è in cookie
  return data;
}

export function logout() {
  // Chiama logout backend per cancellare cookie
  return fetch(`${AUTH_BASE_URL}/auth/logout/`, {
    method: 'POST',
    credentials: 'include',
  });
}

async function refreshTokens() {
  const response = await fetch(
    'http://localhost:8000/api/auth/token/refresh/',
    {
      method: 'POST',
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Refresh failed');
}

async function authorizedFetch(url: string, options: RequestInit = {}) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    },
    credentials: 'include', // invia cookie HttpOnly
  });

  if (response.status === 401) {
    // Token scaduto o mancante, prova a fare refresh token
    try {
      await refreshTokens();
      // Dopo refresh, riprova la chiamata
      response = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      // Refresh token fallito, utente non autenticato
      throw new Error('Not authenticated, please login again');
    }
  }

  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status);
  }

  return response;
}

export { authorizedFetch };
