import type { InformationSchema } from '@/schemas/information-schema';
import type { ProjectSchema } from '@/schemas/project-schema';

export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		year: 'numeric',
	};
	return date.toLocaleDateString('en-US', options);
}

export function filterProjectData(data: ProjectSchema): ProjectSchema {
	const newData = { ...data };

	if (typeof newData.image === 'string') {
		delete newData.image;
	}

	return newData;
}

export function filterInformationtData(data: InformationSchema) {
	const newData = { ...data };

	if (typeof newData.image === 'string') {
		delete newData.image;
	}

	if (typeof newData.resume === 'string') {
		delete newData.resume;
	}

	return newData;
}

export function getFilePath(filePath: string | File | null | undefined) {
	return `${filePath}`;
}

export function getResourceUrl(
	filePath: string | File | null | undefined,
): string {
	if (!filePath) {
		return '';
	}
	return `${import.meta.env.PUBLIC_MEDIA_URL}${filePath}`;
}
