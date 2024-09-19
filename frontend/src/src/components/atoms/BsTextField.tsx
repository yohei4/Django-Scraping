import React from "react";

export interface BsTextFieldProps {
    id?: string;
    className: string;
    maxLength: number;
    max?: number;
    min?: number;
    type?: string;
    required?: boolean;
    hidden?: boolean;
    autoCompolete?: boolean;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const BsTextField = (props: BsTextFieldProps) => {
    const className = [props.className, 'form-control'].join(' ');
    return (
        <input {...props} className={className} />
    );
};
