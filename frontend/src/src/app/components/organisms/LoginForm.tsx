import { Box, Button } from "@mui/material";
import { OutlinedTextField } from "@components/atoms/OutlineTextField";
import { PasswordTextField } from "@components/atoms/PasswordTextField";

export interface LoginFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

export const LoginForm = (props: LoginFormProps) => {    
    return (
        <Box component="form" onSubmit={props.onSubmit} sx={{ mt: 1 }}>
            <OutlinedTextField
                id="email"
                name="email"
                label="メールアドレス"
                margin="normal"
                required
                fullWidth
            />
            <PasswordTextField
                id="password"
                type="password"
                name="password"
                margin="normal"
                label="パスワード"
                required
                fullWidth
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>ログイン</Button>
        </Box>
    );
};