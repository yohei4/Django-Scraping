import React from "react";
import { Alert, Box, Container, CssBaseline, Typography } from "@mui/material";
import { LoginForm, LoginFormProps } from "@app/admin/components/molecules/LoginForm";

export interface LoginTemplateProps {
    message?: React.ReactNode,
    LoginFormProps?: LoginFormProps,
};

export const LoginTemplate = (props: LoginTemplateProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" marginBottom={2}>荷役時間管理</Typography>
                {
                    props.message ?
                    <Alert severity="error" sx={{ width: '100%' }}>{props.message}</Alert> :
                    null
                }
                <LoginForm {...props.LoginFormProps} />
            </Box>
        </Container>
    );
};