import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Grid2 as Grid } from "@mui/material";
import { GridFormRow, GridFormRowProps } from "./GridFormRow";
import { EditDataTable, EditDataTableColDef } from "@components/organisms/EditDataTable";

export interface DynamicFormProps<T extends { [key: string]: any } | undefined = any> {
    formId: string;
    gridFormRows: GridFormRowProps<T>[];
    columns?: readonly EditDataTableColDef[];
    onSubmit?: React.FormEventHandler<HTMLDivElement | HTMLFormElement>;
};

export const DynamicForm = <T extends { [key: string]: any } | undefined = any>(props: DynamicFormProps<T>) => {
    const control = useFormContext();
    const values = control.getValues();

    return (
        <Box id={props.formId} component='form' onSubmit={props.onSubmit}>
            <Grid container rowSpacing={2.5} columnSpacing={2}>
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
    );
};
