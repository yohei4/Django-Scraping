import React from "react";
import { Box, Card, CardContent, CardHeader, Grid2 as Grid, SxProps, Theme } from "@mui/material";
import { GridFormRow, GridFormRowProps } from "./GridFormRow";
import { useFormContext } from "react-hook-form";
import { EditDataTable, EditDataTableColDef } from "@components/organisms/EditDataTable";
import { SwitchForm, SwitchFormProps } from "./SwitchForm";

export interface SwitchFormCardProps<T extends { [key: string]: any } | undefined = any> extends SwitchFormProps<T> {
    headerActions?: React.ReactNode;
    sx?: SxProps<Theme>;
};

export const SwitchFormCard = <T extends { [key: string]: any } | undefined = any>(props: SwitchFormCardProps<T>) => {
    return (
        <Card sx={props.sx}>
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
                <SwitchForm {...props} />
            </CardContent>
        </Card>
    );
};
