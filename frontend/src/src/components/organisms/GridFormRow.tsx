import { Box, Grid2 as Grid, GridBaseProps, Typography } from "@mui/material";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { DynamicRangeFormControl } from "@components/organisms/DynamicRangeFormControl";

export interface GridFormRowProps<T extends { [key: string]: any } | undefined = any> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    gridLabelProps?: GridBaseProps;
    gridFormControlProps?: GridBaseProps;
    formControls: DynamicFormControlProps<T>[];
}

export const GridFormRow = <T extends { [key: string]: any } | undefined = any>(props: GridFormRowProps<T>) => {
    const label = props.gridLabelProps;
    const formControl = props.gridFormControlProps;

    return (
        <Grid
            container
            sx={((theme) => ({
                '&:not(:last-child)': {
                    marginBottom: theme.spacing(3),
                }
            }))}
        >
            <Grid size={label?.size ?? { xs: 12, md: 3, lg: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component='span' variant='gridFormLabel'>
                    {props.label}
                    {props.required ? <Box component='span'>*</Box> : null}
                </Typography>
            </Grid>
            <Grid size={formControl?.size ?? { xs: 12, md: 5, lg: 4 }}>
                <DynamicRangeFormControl formControls={props.formControls} hideLabel />
            </Grid>
        </Grid>
    );
}
