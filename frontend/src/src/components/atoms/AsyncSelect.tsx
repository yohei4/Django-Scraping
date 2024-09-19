import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MenuItem } from "./MenuItem";
import { FormControl, FormHelperText, InputLabel, SelectProps as MuiSelectProps, Select as MuiSelect, SelectChangeEvent, MenuItemProps } from "@mui/material";
import { SelectProps } from "./Select";
import { useClient } from "@hooks/useClient";

export type AsyncSelectProps = SelectProps & {
    url?: string;
}

export const AsyncSelect = (props: AsyncSelectProps) => {
    const selectProps = props as MuiSelectProps;
    const control = useFormContext();
    const { get } = useClient();
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<readonly MenuItemProps[]>([{ children: <>&#8195;</>, value: '' }]);

    useEffect(() => {
        if (loading) {
            if (props.url) {
                get(props.url).then(({ data }) => {
                    setOptions([...options, ...data]);
                });
            }
            setLoading(false);
        }
    }, [loading]);

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {

                const handleChange = (event: SelectChangeEvent<unknown>, children: React.ReactNode) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event, children);
                };

                return (
                    <FormControl variant={props.variant} fullWidth={props.fullWidth}>
                        <InputLabel id={props.labelId} error={props.error}>{props.label}</InputLabel>
                        <MuiSelect
                            {...selectProps}
                            {...field}
                            onChange={handleChange}
                            readOnly={props.readOnly}
                            value={1 < options.length ? field.value : ''}
                        >
                            {
                                options.map((option, index) => {
                                    return <MenuItem key={index} {...option} />
                                })
                            }
                        </MuiSelect>
                        <FormHelperText error={errors[props.name] ? true : props.error}>
                            { errors[props.name]?.message as string ?? props.helperText }
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}