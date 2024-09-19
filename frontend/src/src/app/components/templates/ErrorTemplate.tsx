import React from "react";
import { Link } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { Typography } from "@mui/material";
import { ErrorLayout } from "@layout/ErrorLayout";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { HttpStatusCodeMessages } from "@utils/HttpStatusMessages";

export interface ErrorTemplateProps {
    status: HttpStatusCode;
}

export const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ status }) => {

    return (
        <ErrorLayout>
            <Typography variant='h6' align='center' marginBottom={2} sx={(theme) => ({ color: theme.palette.error.main })}>{status}</Typography>
            <Typography variant='body1' align='center' marginBottom={2}>{HttpStatusCodeMessages[status]}</Typography>
            <Link to={
                status === HttpStatusCode.Unauthorized ?
                '/login' :
                '/'
            }>
                <DefaultButton>
                    {
                        status === HttpStatusCode.Unauthorized ?
                        'ログイン画面に戻る' :
                        'ホームに戻る'
                    }
                </DefaultButton>
            </Link>
        </ErrorLayout>
    );
};
