import React from "react";
import { Box } from "@mui/material";
import { DynamicFormControl, DynamicFormControlProps } from "./DynamicFormControl";

export interface DynamicRangeFormControlProps<T extends { [key: string]: any } | undefined = any> {
    formControls: DynamicFormControlProps<T>[];
    hideLabel?: boolean;
}

function insertBetweenElements(array: React.ReactNode[], value: React.ReactNode) {
    return array.flatMap((item, index) => index < array.length - 1 ? [item, value] : [item]);
}

export const DynamicRangeFormControl = <T extends { [key: string]: any } | undefined = any>(props: DynamicRangeFormControlProps<T>) => {
    const type = props.formControls[0].type;
    const FormControls = () => {
        switch(type) {
            case 'number':
            case 'date':
            case 'time':
            case 'datetime-local':
                return (
                    1 < props.formControls.length ?
                    insertBetweenElements(props.formControls
                        .map((prop, index) => <DynamicFormControl key={index} {...prop} label={props.hideLabel ? undefined : prop.label} />), <Box component='span' key="separator">～</Box>) :
                    props.formControls
                        .map((prop, index) => <DynamicFormControl key={index} {...prop} label={props.hideLabel ? undefined : prop.label} />)
                );
            default:
                return (props.formControls.map((prop, index) => <DynamicFormControl key={index} {...prop} label={props.hideLabel ? undefined : prop.label} />));
        }
    };

    return (
        <Box
            sx={
                ((theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(1),
                    width: '100%'
                })
            )}
        >
            {FormControls()}
        </Box>
    );
};
