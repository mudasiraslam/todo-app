import React, { FC } from 'react';
import { LabelProps } from '../../type/type.todo';
import { color } from '@/app/constants/color';


const Label: FC<LabelProps> = ({ htmlFor, text, className }) => {
    return (
        <label htmlFor={htmlFor} className={`block font-plex-mono font-medium  mb-1 ${color.lableText} ml-2`}>
            {text}
        </label>
    );
};

export default Label;
