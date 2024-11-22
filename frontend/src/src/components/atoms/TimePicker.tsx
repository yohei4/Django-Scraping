import { TextFieldProps } from "@mui/material";
import { TimeView, LocalizationProvider, TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { ChangeEvent } from "react";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/ja';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export type TimePickerProps = TextFieldProps & UseControllerProps & {
    id?: string;
    type?: 'time';
    format?: string;
    views?: TimeView[];
    clearable?: boolean;
    readOnly?: boolean;
}

export const TimePicker = (props: TimePickerProps) => {
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
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ja' localeText={{ datePickerToolbarTitle: '時刻選択' }}>
                        <MuiTimePicker
                            {...field}
                            name={props.name}
                            label={props.label}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            onChange={handleChange}
                            timeSteps={{ minutes: 1 }}
                            value={field.value ? dayjs(field.value) : null}
                            format={props.format ?? 'HH:mm:ss'}
                            views={props.views ?? ['hours', 'minutes', 'seconds']}
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