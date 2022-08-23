import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { EmailField, PasswordField } from './TextFields';
import { SubmitButton } from './Button';

const FormBox = styled(Box<"form">)({
    marginTop: '20px',
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

export default function LoginForm() {
    return (
        <FormBox id='login' component='form' action='post' sx={{display: 'flex', justifyContent: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <Box>
                <EmailField sx={{justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}}}/>
                <PasswordField sx={{justifyContent: 'center'}} />
                <SubmitButton text="ログインする" />
            </Box>
        </FormBox>
    );
}