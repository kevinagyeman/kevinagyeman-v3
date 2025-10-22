import type React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type CustomTextAreaProps = {
	labelText: string;
	placeholder: string;
	hint?: string;
	rows?: number;
	textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
	error?: string;
};

function CustomTextArea({
	labelText,
	placeholder,
	hint,
	rows = 1,
	textAreaProps,
	error,
}: CustomTextAreaProps) {
	return (
		<div>
			<Label className='mb-2'>{labelText}</Label>
			<Textarea placeholder={placeholder} rows={rows} {...textAreaProps} />
			{hint && <small className='text-xs text-muted-foreground'>{hint}</small>}
			{error && <small className='text-xs text-orange-800'>{error}</small>}
		</div>
	);
}

export default CustomTextArea;
