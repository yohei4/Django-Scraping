import React, { ChangeEvent, useState } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import Calendar from '@mui/icons-material/Event';
import { DateView, LocalizationProvider, DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/ja';

export type DatePickerProps = TextFieldProps & UseControllerProps & {
    id?: string;
    type?: 'date';
    readOnly?: boolean;
    format?: string;
    clearable?: boolean;
    views?: readonly DateView[];
    startAdornmentInner?: React.ReactNode;
    endAdornmentInner?: React.ReactNode;
}

export const DatePicker = (props: DatePickerProps) => {
    const [open, setOpen] = useState(false);
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
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ja' localeText={{ datePickerToolbarTitle: '日付選択' }}>
                        <MuiDatePicker
                            {...field}
                            open={open}
                            name={props.name}
                            label={props.label}
                            disabled={props.disabled}
                            readOnly={props.readOnly}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            onChange={handleChange}
                            value={field.value ? dayjs(field.value) : null}
                            format={ props.format ?? 'YYYY/MM/DD' }
                            views={ props.views ?? ['year', 'month', 'day'] }
                            sx={props.sx}
                            slotProps={{
                                textField: {
                                    id: props.id,
                                    required: props.required,
                                    helperText: errors[props.name]?.message as string ?? props.helperText,
                                    error: errors[props.name] ? true : props.error,
                                    InputProps: {
                                        startAdornment: props.startAdornmentInner && <InputAdornment position="start">{props.startAdornmentInner}</InputAdornment>,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setOpen(true)} disabled={props.disabled} edge={props.endAdornmentInner ? undefined : 'end'} aria-label="Choose date" >
                                                    <Calendar />
                                                </IconButton>
                                                { props.endAdornmentInner }
                                            </InputAdornment>
                                        )
                                    }
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