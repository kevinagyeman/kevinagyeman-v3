export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function filterData(data: any) {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
}

export function handleFilePreview(
  data: any,
  setPreview: (url: string) => void,
  fieldName: string
) {
  if (data[fieldName]) {
    const fileUrl = data[fieldName].startsWith('http')
      ? data[fieldName]
      : `${import.meta.env.PUBLIC_BACKEND_URL}${data[fieldName]}`;
    setPreview(fileUrl);
  }

  if (typeof data[fieldName] === 'string') {
    delete data[fieldName];
  }
}

export function getResourceUrl(path?: string): string {
  if (path?.startsWith('/media/')) {
    return import.meta.env.PUBLIC_BACKEND_URL + path;
  } else {
    return 'https://placehold.co/600x400?text=Hello+World';
  }
}
