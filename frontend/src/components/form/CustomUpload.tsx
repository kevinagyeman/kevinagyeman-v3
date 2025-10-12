import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type CustomUploadProps = {
	preview: string;
	typeOfFile: "image" | "file";
	fieldName: string;
	formControl: any;
	labelText: string;
	aspectRatio?: string;
	error?: string;
};

function CustomUpload({
	preview,
	fieldName,
	formControl,
	error,
	labelText,
	typeOfFile,
	aspectRatio,
}: CustomUploadProps) {
	const accept = typeOfFile === "file" ? "application/pdf" : "image/*";
	const ratio = aspectRatio ? aspectRatio : "1/1";

	return (
		<Controller
			name={fieldName}
			control={formControl}
			render={({ field }) => (
				<>
					<Label className="mb-2">{labelText}</Label>
					{typeOfFile === "file" ? (
						<>
							{preview && !field.value && (
								<Button className="mb-2" variant={"outline"}>
									<a href={preview} target="_blank" rel="noopener noreferrer">
										View current resume
									</a>
								</Button>
							)}
						</>
					) : (
						<>
							{preview && !field.value && (
								<img
									src={preview}
									alt="Project Image Preview"
									className="w-[200px] h-auto object-cover rounded-xl border"
									style={{ aspectRatio: ratio }}
								/>
							)}
						</>
					)}

					<Input
						type="file"
						accept={accept}
						onChange={(e) => field.onChange(e.target.files?.[0])}
					/>
					{error && <small className="text-sm text-red">{error}</small>}
				</>
			)}
		/>
	);
}

export default CustomUpload;
