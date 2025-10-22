export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		year: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
}

export function filterData(data: any): any {
	return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
}

export function getFilePath(filePath: string) {
	return `${import.meta.env.PUBLIC_BACKEND_URL}${filePath}`;
}

export function getResourceUrl(path?: string): string {
	if (path?.startsWith('/media/')) {
		return import.meta.env.PUBLIC_BACKEND_URL + path;
	} else {
		return `${import.meta.env.PUBLIC_BACKEND_URL}/media/placeholder.png`;
	}
}
