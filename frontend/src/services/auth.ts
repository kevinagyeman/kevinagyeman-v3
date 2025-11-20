import { AUTH_API_BASE_URL } from "@/constants";

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

export async function login(username: string, password: string) {
	const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
		credentials: "include",
	});
	if (!response.ok) {
		const message = await getErrorMessage(response, "Login failed");
		throw new Error(message);
	}
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
		const message = await getErrorMessage(
			response,
			"Failed to fetch user info",
		);
		throw new Error(message);
	}

	const data = await response.json();
	return data;
}
