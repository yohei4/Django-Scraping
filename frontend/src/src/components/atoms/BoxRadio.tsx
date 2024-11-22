import React, { ChangeEvent, useEffect, useState } from "react";
import { BaseTextFieldProps, Box, BoxProps, FormControl, FormHelperText, Input, InputLabel, InputLabelProps, MenuItemProps, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";

export type BoxRadioProps = UseControllerProps & BaseTextFieldProps & {
    type?: 'radio';
    label?: React.ReactNode;
    value?: string | number;
    defaultValue?: string | number;
    required?: boolean;
    readOnly?: boolean;
    options?: MenuItemProps[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const BoxRadio: React.FC<BoxRadioProps> = (props) => {
    const control = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            render={({ field, formState: { errors } }) => {

                const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
                    if (value !== null) {
                        const changeEvent = {
                            target: {
                                name: props.name,
                                value: value,
                            },
                        } as unknown as ChangeEvent<HTMLInputElement>;
                        field.onChange(changeEvent);
                        props.onChange?.(changeEvent);
                    }
                };

                return (
                    <FormControl variant="outlined" fullWidth >
                        <ToggleButtonGroup
                            fullWidth
                            exclusive
                            color="default"
                            orientation="horizontal"
                            onChange={handleChange}
                            value={field.value}
                            disabled={field.disabled}
                        >
                            {
                                props.options?.map((option, index) => {
                                    return (
                                        <ToggleButton key={index} value={option.value ?? ''} aria-label={`${props.name} ${option.value}`} sx={{ width: '100%', maxWidth: '12rem', minWidth: 'auto' }} disabled={option.disabled}>
                                            {option.children}
                                        </ToggleButton>
                                    );
                                })
                            }
                        </ToggleButtonGroup>
                        <FormHelperText error={errors[props.name] ? true : props.error}>
                            {errors[props.name]?.message as string ?? props.helperText}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
};