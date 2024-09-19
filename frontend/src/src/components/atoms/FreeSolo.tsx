import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps, MenuItemProps, TextField, TextFieldProps, useFormControl } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ControllerProps, UseControllerProps } from "react-hook-form";

export type FreeSoloProps = TextFieldProps & UseControllerProps & {
    options: MenuItemProps[];
}

export const FreeSolo = (props: FreeSoloProps) => {
    const [value, setValue] = useState(props.defaultValue);

    useEffect(() => {
        setValue(props.defaultValue);
    }, [props.defaultValue]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: unknown, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<unknown> | undefined) => {
        setValue(value);
        const changeEvent = {
            target: {
                name: props.name,
                value: value,
            },
        } as unknown as ChangeEvent<HTMLInputElement>;
        if(props.onChange) props.onChange(changeEvent);
    };

    return (
        <Autocomplete
            freeSolo
            id={props.id}
            options={props.options.map((option) => option.children)}
            onChange={handleChange}
            disabled={props.disabled}
            renderInput={(params) =>
                <TextField
                    {...params}
                    name={props.name}
                    label={props.label}
                    inputProps={props.inputProps}
                    error={props.error}
                    helperText={props.helperText}
                />
            }
        />
    );
};