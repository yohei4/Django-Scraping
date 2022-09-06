import axios from 'axios';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { EmailField, PasswordField } from './TextFields';
import { SubmitButton } from './Button';
import { fetchToken } from '@/util/api';

const FormBox = styled(Box<"form">)({
    marginTop: '20px',
});

export default function LoginForm() {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // instance form data.
        const data = new FormData();

        // apppend email & password.
        data.append('email', email);
        data.append('password', password);

        const client = fetchToken(data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <FormBox id='login' component='form' action='post' sx={{display: 'flex', justifyContent: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <Box>
                <EmailField value={email} onChange={(e) => handleEmailChange(e)} sx={{justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}}}/>
                <PasswordField value={password} onChange={(e) => handlePasswordChange(e)} sx={{justifyContent: 'center'}} />
                <SubmitButton text="ログインする" />
            </Box>
        </FormBox>
    );
}