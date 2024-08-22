import React, { FC } from 'react';
import { LabelProps } from '../../type/type.todo';


const Label: FC<LabelProps> = ({ htmlFor, text, className }) => {
    return (
        <label htmlFor={htmlFor} className="block font-plex-mono font-medium  mb-1 text-[#F4F4F4] ml-2">
            {text}
        </label>
    );
};

export default Label;
