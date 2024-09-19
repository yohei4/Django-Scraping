import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { DynamicRangeFormControl } from "@components/organisms/DynamicRangeFormControl";
import { Box, Grid, GridProps, Typography } from "@mui/material";

export interface GridFormRowProps<T extends { [key: string]: any } | undefined = any> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    gridLabelProps?: GridProps;
    gridFormControlProps?: GridProps;
    formControls: DynamicFormControlProps<T>[];
}

export const GridFormRow = <T extends { [key: string]: any } | undefined = any>(props: GridFormRowProps<T>) => {
    const label = props.gridLabelProps;
    const formControl = props.gridFormControlProps;

    return (
        <Grid
            container
            item
            sx={((theme) => ({
                '&:not(:last-child)': {
                    marginBottom: theme.spacing(3),
                }
            }))}
        >
            <Grid item  xs={label?.xs ? label.xs : 12} md={label?.md ? label.md : 3} lg={label?.lg ? label.lg : 2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component='span' variant='gridFormLabel'>
                    {props.label}
                    {props.required ? <Box component='span'>*</Box> : null}
                </Typography>
            </Grid>
            <Grid item xs={formControl?.xs ? formControl.xs : 12} md={formControl?.md ? formControl.md : 5} lg={formControl?.lg ? formControl.lg : 4}>
                <DynamicRangeFormControl formControls={props.formControls} hideLabel />
            </Grid>
        </Grid>
    );
}
