import React, { FC } from 'react';
import { InputFieldProps } from '../../../type/type';
const InputField: FC<InputFieldProps> = ({ id, type, placeholder, className, value, onChange, disabled = false, loading = false }) => {
    return (
        <input
            className={className}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled || loading}
            required

        />
    );
};

export default InputField;
