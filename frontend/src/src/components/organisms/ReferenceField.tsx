import React from "react";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import { DynamicFormControlProps } from "./DynamicFormControl";

type FormatValueProps<T extends { [key: string]: any } | undefined = any> = DynamicFormControlProps<T> & {
    value?: any;
    thousandSeparator?: string | boolean;
}

const FormatValue: React.FC<FormatValueProps> = ({ type, value, format, options, thousandSeparator }) => {
    if (!value) return <>{value}</>;
    switch (type) {
        case 'number':
            return <NumericFormat displayType='text' value={value} thousandSeparator={thousandSeparator} />;
        case 'date':
            return <>{dayjs(value).format(format ?? 'YYYY/MM/DD')}</>;
        case 'time':
            return <>{dayjs(value).format(format ?? 'HH:mm:ss')}</>;
        case 'datetime-local':
            return <>{dayjs(value).format(format ?? 'YYYY/MM/DD HH:mm:ss')}</>;
        case 'select':
        case 'radio':
        case 'combo-box':
        case 'lazy-loaded-combo-box':
        case 'pre-loaded-combo-box':
        case 'async-select':
            return <>{options?.find(x => x.value == value)?.children}</>;
        case 'multiple-select':
        case 'checkbox':
            return <>{options?.filter(x => (value as any[]).includes(x.value)).map(x => x.children).join(',')}</>;
        default:
            return <>{value}</>;
    }
}

export type ReferenceFieldProps = UseControllerProps & FormatValueProps & {
    startAdornmentInner?: React.ReactNode;
    endAdornmentInner?: React.ReactNode;
    thousandSeparator?: string | boolean;
}

export const ReferenceField = (props: ReferenceFieldProps) => {
    const control = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field }) => {
                return (
                    <Typography
                        component="span"
                        sx={(theme) => ({
                            padding: theme.spacing(2),
                        })}
                    >
                        {props.startAdornmentInner ?? ''}
                        <FormatValue
                            type={props.type}
                            format={props.format}
                            options={props.options}
                            value={field.value}
                            thousandSeparator={props.thousandSeparator}
                        />
                        {props.endAdornmentInner ?? ''}
                    </Typography>
                );
            }}
        />
    );
};
