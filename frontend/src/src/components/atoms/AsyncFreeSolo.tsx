import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, CircularProgress, InputAdornment, MenuItemProps, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useClient } from "@hooks/useClient";
import { FreeSoloProps } from "./FreeSolo";
import { Controller, useFormContext } from "react-hook-form";

export type AsyncFreeSoloProps = FreeSoloProps & {
    type?: 'async-free-solo';
    url?: string;
    readOnly?: boolean;
}

export const AsyncFreeSolo = (props: AsyncFreeSoloProps) => {
    const control = useFormContext();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly string[]>([]);
    const loading = open && options.length === 0;
    const { get } = useClient();

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        if (props.url) {
            get(props.url, true).then(({ data }) => {
                setOptions((data as MenuItemProps[]).map((option) => option.children as string));
            });
        }
    
        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {

                const handleChange = (
                    event: React.SyntheticEvent<Element, Event>,
                    value: string,
                    reason: AutocompleteChangeReason,
                    details?: AutocompleteChangeDetails<unknown> | undefined) => {
                    const changeEvent = {
                        target: {
                            name: props.name,
                            value: value,
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    field.onChange(changeEvent);
                    if(props.onChange) props.onChange(changeEvent);
                };

                const handleInput = (event: any) => {
                    field.onChange(event);
                    const changeEvent = {
                        target: {
                            name: props.name,
                            value: event.target.value,
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    if(props.onChange) props.onChange(changeEvent);
                };

                return(
                    <Autocomplete
                        {...field}
                        freeSolo
                        autoSelect
                        id={props.id}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        onChange={handleChange}
                        onInput={handleInput}
                        options={options}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') return option;
                            else return '';
                        }}
                        loading={loading}
                        fullWidth={props.fullWidth}
                        readOnly={props.readOnly}
                        disableClearable
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                name={props.name}
                                label={props.label}
                                margin={props.margin}
                                required={props.required}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                          {params.InputProps.endAdornment}
                                        </InputAdornment>
                                    ),
                                }}
                                error={errors[props.name] ? true : props.error}
                                helperText={errors[props.name]?.message as string ?? props.helperText}
                            />
                        }
                    />
                );
            }}
        />
    );
};