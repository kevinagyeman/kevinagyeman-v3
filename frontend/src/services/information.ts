import { INFORMATION_API_BASE_URL } from "@/constants";
import type { InformationSchema } from "@/schemas/information-schema";

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

export async function fetchInformation(): Promise<InformationSchema> {
	const response = await fetch(`${INFORMATION_API_BASE_URL}/`, {
		credentials: "include",
	});
	if (!response.ok) {
		const message = await getErrorMessage(
			response,
			"Failed to fetch information",
		);
		throw new Error(message);
	}
	return response.json();
}

export async function updateInformation(
	data: InformationSchema,
): Promise<InformationSchema> {
	let fetchOptions: RequestInit;

	const hasFileImage = data.image instanceof File;
	const hasFileResume = data.resume instanceof File;

	if (hasFileImage || hasFileResume) {
		const formData = new FormData();

		for (const key in data) {
			const typedKey = key as keyof InformationSchema;
			const value = data[typedKey];
			if (value !== undefined && value !== null) {
				formData.append(key, value as string | Blob);
			}
		}

		fetchOptions = {
			method: "PUT",
			body: formData,
			credentials: "include",
		};
	} else {
		fetchOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			credentials: "include",
		};
	}

	const response = await fetch(`${INFORMATION_API_BASE_URL}/`, fetchOptions);

	if (!response.ok) {
		const message = await getErrorMessage(
			response,
			"Failed to update information",
		);
		throw new Error(message);
	}
	return response.json();
}
