import React from "react";
import { Alert, AlertColor, AlertPropsColorOverrides, Box, Container, Typography } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';
import { SignUpForm, SignUpFormProps } from "@app/components/organisms";

export interface SignUpTemplateProps {
    severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    message?: React.ReactNode;
    registerFormProps?: SignUpFormProps;
};

export const SignUpTemplate = (props: SignUpTemplateProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" marginBottom={2}>ISSA</Typography>
                {
                    props.message ?
                    <Alert severity={props.severity} sx={{ width: '100%' }}>{props.message}</Alert> :
                    null
                }
                <SignUpForm {...props.registerFormProps} />
            </Box>
        </Container>
    );
};