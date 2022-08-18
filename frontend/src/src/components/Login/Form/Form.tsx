import * as React from 'react';
import Box from '@mui/material/Box';
import { EmailField, PasswordField } from './CustomFields';

export default function Form() {

    return (
        <Box id='login' component='form' action='post' sx={{display: 'flex', justifyContent: 'center'}}>
            <Box>
                <EmailField id='email' name='email' type='email' label='email' placeholder='email'/>
                <PasswordField id='password' name='password' type='password' label='password' placeholder='password'/>
                <div className="ac-login_button">
                    <button type="submit" form="login">
                        <span>ログインする</span>
                    </button>
                </div>
            </Box>
        </Box>
    );
}