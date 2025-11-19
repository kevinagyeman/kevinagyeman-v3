import {
	Controller,
	type Control,
	type FieldValues,
	type Path,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type CustomUploadProps<T extends FieldValues = FieldValues> = {
	preview: string;
	typeOfFile: 'image' | 'file';
	fieldName: Path<T>;
	formControl: Control<T>;
	labelText: string;
	aspectRatio?: string;
	error?: string;
};

function CustomUpload<T extends FieldValues = FieldValues>({
	preview,
	fieldName,
	formControl,
	error,
	labelText,
	typeOfFile,
	aspectRatio,
}: CustomUploadProps<T>) {
	const accept = typeOfFile === 'file' ? 'application/pdf' : 'image/*';
	const ratio = aspectRatio ? aspectRatio : '1/1';

	return (
		<Controller
			name={fieldName}
			control={formControl}
			render={({ field }) => (
				<>
					<Label className='mb-2'>{labelText}</Label>
					{typeOfFile === 'file'
						? preview && (
								<Button className='mb-2' variant={'outline'}>
									<a href={'/resume'} target='_blank' rel='noopener noreferrer'>
										View current resume
									</a>
								</Button>
							)
						: preview && (
								<img
									src={preview}
									alt='Project Preview'
									className='w-[200px] h-auto object-cover rounded-xl border'
									style={{ aspectRatio: ratio }}
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.onerror = null;
										target.src = '/cover.png';
									}}
								/>
							)}

					<Input
						type='file'
						accept={accept}
						onChange={(e) => field.onChange(e.target.files?.[0])}
					/>
					{error && <small className='text-xs text-orange-800'>{error}</small>}
				</>
			)}
		/>
	);
}

export default CustomUpload;
