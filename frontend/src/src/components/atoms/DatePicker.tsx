import { TextFieldProps } from "@mui/material";
import { DateView, LocalizationProvider, DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { ChangeEvent } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/ja';

export type DatePickerProps = TextFieldProps & UseControllerProps & {
    id?: string;
    type?: 'date';
    readOnly?: boolean;
    format?: string;
    clearable?: boolean;
    views?: readonly DateView[];
}

export const DatePicker = (props: DatePickerProps) => {
    const control = useFormContext();

    return(
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (value: Moment | null) => {
                    const event = {
                        target: {
                            name: field.name,
                            value: value ? value.format() : '',
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    field.onChange(event);
                    if(props.onChange) props.onChange(event);
                };

                return (
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ja'>
                        <MuiDatePicker
                            {...field}
                            name={props.name}
                            label={props.label}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            onChange={handleChange}
                            value={field.value ? moment(field.value) : null}
                            format={ props.format ?? 'YYYY/MM/DD' }
                            views={ props.views ?? ['year', 'month', 'day'] }
                            slotProps={{
                                textField: {
                                    id: props.id,
                                    helperText: props.helperText,
                                    error: props.error,
                                },
                                field: {
                                    clearable: props.clearable,
                                }
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
}