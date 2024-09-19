import React from "react";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { GridFormRow, GridFormRowProps } from "../molecules/GridFormRow";
import { useFormContext } from "react-hook-form";
import { EditDataTable, EditDataTableColDef } from "@components/organisms/EditDataTable";

export interface FormCardProps<T extends { [key: string]: any } | undefined = any> {
    formId: string;
    gridFormRows: GridFormRowProps<T>[];
    columns?: readonly EditDataTableColDef[];
    headerActions?: React.ReactNode;
    onSubmit?: React.FormEventHandler<HTMLDivElement | HTMLFormElement>;
};

export const FormCard = <T extends { [key: string]: any } | undefined = any>(props: FormCardProps<T>) => {
    const control = useFormContext();
    const values = control.getValues();

    return (
        <Card>
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
                <Box id={props.formId} component='form' onSubmit={props.onSubmit}>
                    <Grid container>
                        {
                            props.gridFormRows.map((rowProps, index) => (
                                <GridFormRow key={index} {...rowProps} />
                            ))
                        }
                    </Grid>
                    {
                        Object.entries(values).map(([key, value], index) => {
                            if (Array.isArray(value) && props.columns) {
                                return(
                                    <EditDataTable
                                        key={index}
                                        name={key}
                                        columns={props.columns}
                                        sx={{marginTop: '24px'}}
                                    />
                                );
                            }
                        })
                    }
                    
                </Box>
            </CardContent>
        </Card>
    );
};
