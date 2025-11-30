import EasyPicker from "@kevinagyeman/easy-picker";
import "@kevinagyeman/easy-picker/style.css";
import { useEffect, useRef } from "react";

interface CustomDatePickerProps {
	initialDate?: Date;
	onChange?: (dateString: string) => void;
	labelText?: string;
	error?: string;
}

export default function CustomDatePicker({
	initialDate,
	onChange,
	labelText,
	error,
}: CustomDatePickerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const pickerRef = useRef<EasyPicker | null>(null);

	useEffect(() => {
		if (containerRef.current && !pickerRef.current) {
			pickerRef.current = new EasyPicker({
				container: containerRef.current,
				format: "date",

				initialDate: initialDate || new Date(),
				returnFormat: "date-string",
				onChange: (dateString) => {
					if (onChange && typeof dateString === "string") {
						onChange(dateString);
					}
				},
			});
		}

		return () => {
			pickerRef.current?.destroy();
			pickerRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (pickerRef.current && initialDate) {
			pickerRef.current.update(initialDate);
		}
	}, [initialDate]);

	return (
		<div className="w-full">
			{labelText && (
				<label className="block text-sm font-medium mb-2">{labelText}</label>
			)}
			<div ref={containerRef}></div>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
