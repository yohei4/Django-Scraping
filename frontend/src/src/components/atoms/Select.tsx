import React, { ReactNode } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";
import { MenuItem } from "./MenuItem";
import { FormControl, FormHelperText, InputLabel, MenuItemProps, Select as MuiSelect, SelectProps as MuiSelectProps, SelectChangeEvent } from "@mui/material";

export type SelectProps = MuiSelectProps & UseControllerProps & {
    variant?: 'standard' | 'outlined' | 'filled';
    options?: MenuItemProps[];
    helperText?: React.ReactNode;
}

export const Select = (props: SelectProps) => {
    const control = useFormContext();
    const selectProps = props as MuiSelectProps;

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {

                const handleChange = (event: SelectChangeEvent<unknown>, children: React.ReactNode) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event, children);
                };

                return (
                    <FormControl variant={props.variant} fullWidth={props.fullWidth}>
                        <InputLabel id={props.labelId} error={props.error}>{props.label}</InputLabel>
                        <MuiSelect
                            {...selectProps}
                            {...field}
                            onChange={handleChange}
                            readOnly={props.readOnly}
                        >
                            {
                                props.options ?
                                props.options.map((option, index) => {
                                    return <MenuItem key={index} {...option} />
                                }) :
                                null
                            }
                        </MuiSelect>
                        <FormHelperText error={errors[props.name] ? true : props.error}>
                            { errors[props.name]?.message as string ?? props.helperText }
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}