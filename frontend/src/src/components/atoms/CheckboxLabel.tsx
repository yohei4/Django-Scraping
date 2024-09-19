import React from "react";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

export interface CheckboxLabelProps extends CheckboxProps {
    label?: React.ReactNode;
};

export const CheckboxLabel = (props: CheckboxLabelProps) => {
    return (
        <FormControlLabel
            control={<Checkbox {...props} />}
            label={props.label}
        />
    );
};
