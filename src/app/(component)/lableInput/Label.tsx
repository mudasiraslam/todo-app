import React, { FC } from 'react';
import { LabelProps } from '../../../type/type';
import { color } from '@/constants/color';


const Label: FC<LabelProps> = ({ htmlFor, text }) => {
    return (
        <label htmlFor={htmlFor} className={`block font-plex-mono font-medium  mb-1 ${color.lableText} ml-2`}>
            {text}
        </label>
    );
};

export default Label;
