import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { NameField, EmailField, PasswordField } from './TextFields';
import { SubmitButton } from './Button';

const FormBox = styled(Box<"form">)({
    marginTop: '20px',
});

export default function LoginForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <FormBox id='login' component='form' action='post' sx={{display: 'flex', justifyContent: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <Box>
                <NameField sx={{justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}}}/>
                <EmailField sx={{justifyContent: 'center', marginBottom: '15px', '& input': {width: '242px'}}}/>
                <PasswordField id='password' name="password" sx={{justifyContent: 'center', marginBottom: '15px'}} />
                <PasswordField id='confirmation_password' name='confirmation_password' label='Confirmation Password' sx={{justifyContent: 'center'}} />
                <SubmitButton text="アカウント作成" />
            </Box>
        </FormBox>
    );
}