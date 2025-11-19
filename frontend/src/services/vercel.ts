export async function triggerRedeploy() {
	const response = await fetch(
		`${import.meta.env.PUBLIC_BACKEND_URL}/api/redeploy/`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error(`Fetch failed with status ${response.status}`);
	}

	return { status: response.status };
}
