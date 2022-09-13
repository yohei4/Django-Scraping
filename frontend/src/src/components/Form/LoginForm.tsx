import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { EmailField, PasswordField } from './TextFields';
import { SubmitButton } from './Button';
import { fetchToken } from '@/util/api';
import { InputErrorParams } from '@/util/interface';
import { FormBox } from '@/components/Pages/Account';

export const LoginForm = () => {
    
    // Setting email filed
    const EmailRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [emailError, setEmailError] = React.useState<InputErrorParams>({result: false, message: ''});
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (EmailRef.current) {
            if (!EmailRef.current.validity.valid) {
                setEmailError({result: true, message: EmailRef?.current?.validationMessage});
            } else {
                setEmailError({result: false, message: ''});
            }
        }
    };

    // Setting password filed
    const PasswordRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [passwordError, setPasswordError] = React.useState<InputErrorParams>({result: false, message: ''});
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (PasswordRef.current) {
            if (!PasswordRef.current.validity.valid) {
                setPasswordError({result: true, message: PasswordRef?.current?.validationMessage});
            } else {
                setPasswordError({result: false, message: ''});
            }
        }
    };

    // Submit method
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // instance form data.
        const data = new FormData();

        // constant definition.
        const email = EmailRef.current;
        const password = PasswordRef.current;

        // apppend email & password.
        if (email) {
            data.append('email', email.value);
        }
        if (password) {
            data.append('password', password.value);
        }

        // action api (url: /api/token/).
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
                <EmailField
                    onChange={(e) => handleEmailChange(e)}
                    sx={{ justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}, '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'}}}
                    inputRef={EmailRef}
                    inputProps={{ maxLength: 255 }}
                    error={emailError.result}
                    helperText={emailError.message}
                    defaultValue=''
                    required={true}
                />
                <PasswordField
                    onChange={(e) => handlePasswordChange(e)}
                    sx={{ justifyContent: 'center', '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'} }}
                    inputRef={PasswordRef}
                    inputProps={{ minLength: 8 }}
                    error={passwordError.result}
                    helperText={passwordError.message}
                    defaultValue=''
                    required={true}
                />
                <SubmitButton text="ログインする" />
            </Box>
        </FormBox>
    );
}