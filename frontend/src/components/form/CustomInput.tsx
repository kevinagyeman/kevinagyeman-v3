import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type CustomInputProps = {
  labelText?: string;
  inputType?: string;
  placeholder?: string;
  hint?: string;
  pattern?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
};

function CustomInput({
  labelText,
  inputType = 'text',
  placeholder,
  hint,
  pattern,
  inputProps,
  error,
}: CustomInputProps) {
  return (
    <div>
      {labelText && <Label className='mb-2'>{labelText}</Label>}
      <Input
        type={inputType}
        placeholder={placeholder}
        pattern={pattern}
        {...inputProps}
      />
      {hint && <small>{hint}</small>}
      {error && <small className='text-sm text-red'>{error}</small>}
    </div>
  );
}

export default CustomInput;
