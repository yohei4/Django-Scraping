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
                <PasswordField sx={{justifyContent: 'center'}} />
                {/* <PasswordField sx={{justifyContent: 'center'}} /> */}
                <SubmitButton text="アカウント作成" />
            </Box>
        </FormBox>
    );
}