import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    text: string;
}

const FormButton = styled(Button)({
    cursor: 'pointer',
    border: 'none',
    width: '300px',
    padding: '10px 15px',
    margin: '35px auto 40px',
    color: '#FFFFFF',
    backgroundColor: '#57BAD1',
    fontSize: '18px',
    transition: 'all .3s',
    '&:hover': {
        backgroundColor: '#3fa2b8',
        transition: 'all .3s',
    }
});

export default function SubmitButton(props: ButtonProps) {
    return (
        <FormButton type="submit">{props.text}</FormButton>
    );
}