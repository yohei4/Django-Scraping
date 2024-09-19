import { BaseTextFieldProps, FormControl, FormControlProps, FormHelperText, InputBaseProps, InputLabel, OutlinedInput, styled } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";

const StyledOutlinedInput = styled(OutlinedInput)(({ size }) => {
    return {
    };
});

export type TextAreaProps = BaseTextFieldProps & UseControllerProps & {
    label?: React.ReactNode;
    readOnly?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
    const control = useFormContext();
    const isMultiline = props.rows != null || props.minRows != null || props.maxRows != null;

    return(
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event);
                };

                return (
                    <FormControl
                        variant='outlined'
                        size={props.size}
                        fullWidth={props.fullWidth}
                        sx={props.sx}
                    >
                        {
                            props.label ?
                            <InputLabel error={errors[props.name] ? true : props.error} htmlFor={props.id} required={props.required}>{props.label}</InputLabel> :
                            null
                        }
                        <StyledOutlinedInput
                            {...field}
                            id={props.id}
                            multiline={isMultiline}
                            size={props.size}
                            rows={props.rows}
                            minRows={props.minRows}
                            maxRows={props.maxRows}
                            required={props.required}
                            onChange={handleChange}
                        />
                        <FormHelperText error={errors[props.name] ? true : props.error}>
                            {errors[props.name]?.message as string ?? props.helperText}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}