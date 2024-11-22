import React from "react";
import { Card, CardContent, CardHeader, SxProps, Theme } from "@mui/material";
import { DynamicForm, DynamicFormProps } from "./DynamicForm";

export interface FormCardProps<T extends { [key: string]: any } | undefined = any> extends DynamicFormProps<T> {
    headerActions?: React.ReactNode;
    sx?: SxProps<Theme>;
};

export const FormCard = <T extends { [key: string]: any } | undefined = any>(props: FormCardProps<T>) => {
    return (
        <Card sx={props.sx} >
            {
                props.headerActions ?
                <CardHeader action={props.headerActions} /> :
                null
            }
            <CardContent
                sx={((theme) => ({
                    padding: theme.spacing(4, 4),
                    '&:last-child': {
                        paddingBottom: theme.spacing(4),
                    },
                }))}
            >
                <DynamicForm
                    formId={props.formId}
                    gridFormRows={props.gridFormRows}
                    columns={props.columns}
                    onSubmit={props.onSubmit}
                />
            </CardContent>
        </Card>
    );
};
