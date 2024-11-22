import { TextFieldProps } from "@mui/material";
import { DateOrTimeView, LocalizationProvider, DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers";
import { ChangeEvent } from "react";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/ja';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export type DateTimePickerProps = TextFieldProps & UseControllerProps & {
    id?: string;
    type?: 'datetime-local';
    readOnly?: boolean;
    format?: string;
    clearable?: boolean;
    views?: readonly DateOrTimeView[];
}

export const DateTimePicker = (props: DateTimePickerProps) => {
    const control = useFormContext();

    return(
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (value: Dayjs | null) => {
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
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ja' localeText={{ datePickerToolbarTitle: '日時選択' }}>
                        <MuiDateTimePicker
                            {...field}
                            name={props.name}
                            label={props.label}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            onChange={handleChange}
                            value={field.value ? dayjs(field.value) : null}
                            format={props.format ?? 'YYYY/MM/DD HH:mm:ss'}
                            views={props.views ?? ['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                            ampm={false}
                            sx={props.sx}
                            slotProps={{
                                textField: {
                                    id: props.id,
                                    required: props.required,
                                    helperText: errors[props.name]?.message as string ?? props.helperText,
                                    error: errors[props.name] ? true : props.error,
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