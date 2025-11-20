interface ErrorAlertProps {
	error: string;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
	if (!error) return null;

	return (
		<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
			{error}
		</div>
	);
}
