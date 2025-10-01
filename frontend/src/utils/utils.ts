export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
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
