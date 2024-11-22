import React, { ChangeEvent, forwardRef } from "react";
import { Control, Controller, ControllerProps, FieldValues, UseControllerProps, useFormContext, UseFormReturn } from "react-hook-form";
import { NumberFormatValues, NumericFormatProps, NumericFormat as RnfNumericFormat, SourceInfo } from 'react-number-format';
import { InputAdornment, TextField as MuiTextField, TextFieldProps } from "@mui/material";

type NumericFormatTextFieldProps = NumericFormatProps<any> & TextFieldProps;
const NumericFormat = forwardRef<any, NumericFormatTextFieldProps>((props, ref) => (
    <RnfNumericFormat {...props} getInputRef={ref} />
));

export type OutlinedNumberFieldProps = TextFieldProps & UseControllerProps & {
    readOnly?: boolean;
    startAdornmentInner?: React.ReactNode;
    endAdornmentInner?: React.ReactNode;
    max?: number;
    min?: number;
    maxLength?: number;
    minLength?: number;
    format?: string;
    mask?: string;
    thousandSeparator?: string | boolean;
    align?: "center" | "left" | "right" | undefined;
    onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>, methods?: UseFormReturn<FieldValues, any, undefined>) => void;
}

export const OutlinedNumberField = (props: OutlinedNumberFieldProps) => {
    const control = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (values: NumberFormatValues, sourceInfo: SourceInfo) => {
                    const event = {
                        target: {
                            name: field.name,
                            value: values.value,
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    field.onChange(event);
                    props.onChange?.(event);
                };

                return (
                    <NumericFormat 
                        customInput={MuiTextField}
                        {...field}
                        thousandSeparator={props.thousandSeparator}
                        id={props.id}
                        format={props.format}
                        mask={props.mask}
                        label={props.label}
                        fullWidth={props.fullWidth}
                        required={props.required}
                        onClick={props.onClick}
                        onChange={undefined}
                        onValueChange={handleChange}
                        margin={props.margin}
                        max={props.max}
                        min={props.min}
                        error={errors[props.name] ? true : props.error}
                        helperText={errors[props.name]?.message as string ?? props.helperText}
                        sx={{
                            ...props.sx,
                            '& .MuiInputBase-input': {
                                textAlign: props.align ?? 'right',
                            },
                        }}
                        variant="outlined"
                        slotProps={{
                            input: {
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
                            },
                            htmlInput: {
                                maxLength: props.maxLength,
                                minLength: props.minLength,
                                max: props.max,
                                min: props.min,
                                onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => props.onBlur?.(event, control as any),
                            }
                        }}
                    />
                );
            }}
        />
    );
};
