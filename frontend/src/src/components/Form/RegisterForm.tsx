import React from 'react';
import Box from '@mui/material/Box';
import { register } from '@/util/api';
import { NameField, EmailField, PasswordField } from './TextFields';
import { SubmitButton } from './Button';
import { InputErrorParams } from '@/util/interface';
import { FormBox } from '@/components/Pages/Account';
import { is_equal } from '@/util/functions';

export const RegisterForm = () => {
    // Setting username filed
    const UserNameRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [userNameError, setUserNameError] = React.useState<InputErrorParams>({result: false, message: ''});
    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (UserNameRef.current) {
            if (!UserNameRef.current.validity.valid) {
                setUserNameError({result: true, message: UserNameRef?.current?.validationMessage});
            } else {
                setUserNameError({result: false, message: ''});
            }
        }
    };

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

    // Setting password filed
    const PasswordConfirmationRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [passwordConfirmationError, setPasswordConfirmationError] = React.useState<InputErrorParams>({result: false, message: ''});
    const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (PasswordConfirmationRef.current) {
            if (!PasswordConfirmationRef.current.validity.valid) {
                setPasswordConfirmationError({result: true, message: PasswordConfirmationRef?.current?.validationMessage});
            } else {
                setPasswordConfirmationError({result: false, message: ''});
            }
        }
    };
    
    // Submit method
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // instance form data.
        const data = new FormData();
        
        // constant definition
        const username = UserNameRef.current;
        const email = EmailRef.current;
        const password = PasswordRef.current;
        const passwordconfilmation = PasswordConfirmationRef.current;

        // apppend username & email & password & passwordconfilmation.
        if (username && email && password && passwordconfilmation) {
            if(is_equal(password.value, passwordconfilmation.value)) {
                data.append('username', username.value);
                data.append('email', email.value);
                data.append('password', password.value);
                data.append('password_confirmation', passwordconfilmation.value);
            } else {
                setPasswordConfirmationError({result: true, message: 'パスワードが一致していません。'});
                return false;
            }
        } else {
            return false;
        }

        // action api (url: /api/register/)
        const client = register(data)
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
                <NameField
                    onChange={(e) => handleUserNameChange(e)}
                    sx={{ justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}, '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'} }}
                    inputRef={UserNameRef}
                    inputProps={{ maxLength: 150 }}
                    error={userNameError.result}
                    helperText={userNameError.message}
                    defaultValue=''
                    required={true}
                />
                <EmailField
                    onChange={(e) => handleEmailChange(e)}
                    sx={{ justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}, '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'} }}
                    inputRef={EmailRef}
                    inputProps={{ maxLength: 255 }}
                    error={emailError.result}
                    helperText={emailError.message}
                    defaultValue=''
                    required={true}
                />
                <PasswordField
                    id='password'
                    name="password" 
                    onChange={(e) => handlePasswordChange(e)}
                    sx={{ justifyContent: 'center', marginBottom: '15px' , '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'} }}
                    inputRef={PasswordRef}
                    inputProps={{ minLength: 8 }}
                    error={passwordError.result}
                    helperText={passwordError.message}
                    defaultValue=''
                    required={true}
                />
                <PasswordField
                    id='password_confirmation'
                    name='password_confirmation'
                    label='Confirmation Password'
                    onChange={(e) => handlePasswordConfirmationChange(e)}
                    sx={{ justifyContent: 'center', '& p[id$="helper-text"]': {width: '242px', userSelect: 'none'} }}
                    inputRef={PasswordConfirmationRef}
                    inputProps={{ minLength: 8 }}
                    error={passwordConfirmationError.result}
                    helperText={passwordConfirmationError.message}
                    defaultValue=''
                    required={true}
                />
                <SubmitButton text="アカウント作成" />
            </Box>
        </FormBox>
    );
}