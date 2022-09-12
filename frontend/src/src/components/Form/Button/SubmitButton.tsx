import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FormButton } from '@/components/Pages/Account/style';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    text: string;
}

export const SubmitButton = (props: ButtonProps) => {
    return (
        <FormButtonton type="submit">{props.text}</FormButton>
    );
}