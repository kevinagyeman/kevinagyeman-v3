import { INFORMATION_API_BASE_URL } from "@/constants";
import type { InformationSchema } from "@/schemas/information-schema";

export async function fetchInformation(): Promise<InformationSchema> {
	const response = await fetch(`${INFORMATION_API_BASE_URL}/`, {
		credentials: "include",
	});
	if (!response.ok) throw new Error("Failed to fetch information");
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

	if (!response.ok) throw new Error("Failed to update information");
	return response.json();
}
