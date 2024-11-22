import React from "react";
import { Grid2 as Grid, Grid2Props, Typography } from "@mui/material";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { DynamicRangeReference } from "./DynamicRangeReference";

export interface GridReferenceRowProps<T extends { [key: string]: any } | undefined = any> extends Grid2Props {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    gridLabelProps?: Grid2Props;
    gridFormControlProps?: Grid2Props;
    formControls?: DynamicFormControlProps<T>[];
}

export const GridReferenceRow = <T extends { [key: string]: any } | undefined = any>(props: GridReferenceRowProps<T>) => {
    const {
        label,
        formControls,
        gridLabelProps,
        gridFormControlProps,
        size,
        sx,
    } = props;

    return (
        <Grid
            container
            size={size ?? { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={sx}
        >
            <Grid {...gridLabelProps} size={gridLabelProps?.size ?? { xs: 12, md: 3, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography component='span' variant='gridFormLabel'>
                    {label}
                </Typography>
            </Grid>
            <Grid {...gridFormControlProps} size={gridFormControlProps?.size ?? { xs: 12, md: 5, lg: 4 }}>
                {
                    formControls && <DynamicRangeReference formControls={formControls} hideLabel />
                }
            </Grid>
        </Grid>
    );
}