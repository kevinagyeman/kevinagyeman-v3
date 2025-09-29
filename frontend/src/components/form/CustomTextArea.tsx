import React from 'react';
import { Textarea } from '../ui/textarea';

type CustomTextAreaProps = {
  labelText?: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
  cols?: number;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: string;
};

function CustomTextArea({
  labelText,
  placeholder,
  hint,
  rows = 3,
  cols,
  textAreaProps,
  error,
}: CustomTextAreaProps) {
  return (
    <div>
      {labelText && <label>{labelText}</label>}
      <Textarea
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        {...textAreaProps}
      />
      {hint && <small>{hint}</small>}
      {error && <small className='text-sm text-red'>{error}</small>}
    </div>
  );
}

export default CustomTextArea;
