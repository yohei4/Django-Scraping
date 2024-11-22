import React from "react";
import { Grid2 as Grid, Grid2Props, Typography } from "@mui/material";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { DynamicRangeFormControl } from "@components/organisms/DynamicRangeFormControl";

export interface GridFormRowProps<T extends { [key: string]: any } | undefined = any> extends Grid2Props {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    caution?: React.ReactNode;
    formControls?: DynamicFormControlProps<T>[];
    gridLabelProps?: Grid2Props;
    gridFormControlProps?: Grid2Props;
}

export const GridFormRow: React.FC<GridFormRowProps> = <T extends { [key: string]: any } | undefined = any>(props: GridFormRowProps<T>) => {
    const {
        label,
        required,
        caution,
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
            <Grid size={gridLabelProps?.size ?? { xs: 12, md: 3, lg: 2 }} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography component='span' variant='gridFormLabel'>
                    {label}
                    {required ? <Typography component='span' color='error'>*</Typography> : null}
                </Typography>
                {caution}
            </Grid>
            <Grid size={gridFormControlProps?.size ?? { xs: 12, md: 5, lg: 4 }}>
                {
                    formControls && <DynamicRangeFormControl formControls={formControls} hideLabel />
                }
            </Grid>
        </Grid>
    );
}