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

export function handleFilePreview(
  data: Record<string, any>,
  setPreview: (url: string) => void,
  fieldName: string
) {
  const fieldValue = data[fieldName];

  if (typeof fieldValue === 'string' && fieldValue.length > 0) {
    // Se il valore inizia per http lo usi così, altrimenti concatena backend url
    const fileUrl = fieldValue.startsWith('http')
      ? fieldValue
      : `${import.meta.env.PUBLIC_BACKEND_URL}${fieldValue}`;
    setPreview(fileUrl);

    // Elimina il campo stringa per evitare errori in upload/form-data
    delete data[fieldName];
  }
}

export function getResourceUrl(path?: string): string {
  if (path?.startsWith('/media/')) {
    return import.meta.env.PUBLIC_BACKEND_URL + path;
  } else {
    return `${import.meta.env.PUBLIC_BACKEND_URL}/media/placeholder.png`;
  }
}
