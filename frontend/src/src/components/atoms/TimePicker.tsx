import { TextFieldProps } from "@mui/material";
import { TimeView, LocalizationProvider, TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { ChangeEvent } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/ja';

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
                        <MuiTimePicker
                            {...field}
                            name={props.name}
                            label={props.label}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            onChange={handleChange}
                            timeSteps={{ minutes: 1 }}
                            value={field.value ? moment(field.value) : null}
                            format={props.format}
                            views={props.views}
                            ampm={false}
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