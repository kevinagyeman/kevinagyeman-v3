import { AUTH_API_BASE_URL } from "@/constants";

export async function login(username: string, password: string) {
	const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
		credentials: "include",
	});
	if (!response.ok) throw new Error("Login failed");
	const data = await response.json();
	return data;
}

export function logout() {
	return fetch(`${AUTH_API_BASE_URL}/logout`, {
		method: "POST",
		credentials: "include",
	});
}

export async function getUserInfo() {
	const response = await fetch(`${AUTH_API_BASE_URL}/user/`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	if (response.status === 401) {
		throw new Error("Unauthorized");
	}

	if (!response.ok) {
		throw new Error("Fetch failed with status " + response.status);
	}

	const data = await response.json();
	return data;
}
