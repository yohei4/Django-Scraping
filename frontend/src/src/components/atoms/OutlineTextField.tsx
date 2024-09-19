import { Control, Controller, ControllerProps, FieldValues, UseControllerProps, useFormContext } from "react-hook-form";
import { InputAdornment, TextField as MuiTextField, TextFieldProps, useFormControl } from "@mui/material";
import React, { ChangeEvent } from "react";

export type OutlinedTextFieldProps = TextFieldProps & UseControllerProps & {
    readOnly?: boolean;
    startAdornmentInner?: React.ReactNode;
    endAdornmentInner?: React.ReactNode;
    max?: number;
    min?: number;
    maxLength?: number;
}

export const OutlinedTextField = (props: OutlinedTextFieldProps) => {
    const control = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event);
                };

                return (
                    <MuiTextField
                        {...field}
                        id={props.id}
                        type={props.type}
                        label={props.label}
                        fullWidth={props.fullWidth}
                        required={props.required}
                        onClick={props.onClick}
                        onChange={handleChange}
                        margin={props.margin}
                        error={errors[props.name] ? true : props.error}
                        helperText={errors[props.name]?.message as string ?? props.helperText}
                        sx={{
                            ...props.sx,
                            '& .MuiInputBase-input': {
                                textAlign: (props.type === 'number' ? 'right' : 'left'),
                            }
                        }}
                        variant="outlined"
                        InputProps={{
                            readOnly: props.readOnly,
                            startAdornment: (
                                props.startAdornmentInner ?
                                <InputAdornment position="start">{props.startAdornmentInner}</InputAdornment> :
                                undefined
                            ),
                            endAdornment: (
                                props.endAdornmentInner ?
                                <InputAdornment position="end">{props.endAdornmentInner}</InputAdornment> :
                                undefined
                            ),
                        }}
                        inputProps={{
                            maxLength: props.maxLength,
                            max: props.max,
                            min: props.min,
                        }}
                    />
                );
            }}
        />
    );
};
