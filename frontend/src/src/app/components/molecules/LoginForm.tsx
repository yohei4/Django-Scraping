import { OutlinedTextField } from "@components/atoms/OutlineTextField";
import { PasswordTextField } from "@components/atoms/PasswordTextField";
import { Box, Button } from "@mui/material";

export interface LoginFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

export const LoginForm = (props: LoginFormProps) => {    
    return (
        <Box component="form" onSubmit={props.onSubmit} sx={{ mt: 1 }}>
            <OutlinedTextField
                id="UserCd"
                name="UserCd"
                label="担当者コード"
                margin="normal"
                required
                fullWidth
            />
            <PasswordTextField
                id="Password"
                type="password"
                name="Password"
                margin="normal"
                label="パスワード"
                required
                fullWidth
                />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>ログイン</Button>
        </Box>
    );
};