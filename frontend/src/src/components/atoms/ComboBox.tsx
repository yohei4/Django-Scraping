import { ChangeEvent, useState } from "react";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, MenuItemProps, TextField, TextFieldProps } from "@mui/material";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";

export type ComboBoxProps = TextFieldProps & UseControllerProps & {
    readOnly?: boolean;
    options: MenuItemProps[];
}

export const ComboBox = (props: ComboBoxProps) => {
    const control = useFormContext();
    const [value, setValue] = useState<MenuItemProps | undefined | null>(null);

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue={1}
            render={({ field, formState: { errors } }) => {

                const handleChange = (
                    event: React.SyntheticEvent<Element, Event>,
                    value: MenuItemProps | null,
                    reason: AutocompleteChangeReason,
                    details?: AutocompleteChangeDetails<unknown> | undefined
                ) => {
                    setValue(value);
                    const changeEvent = {
                        target: {
                            name: props.name,
                            value: value?.value,
                        },
                    } as unknown as ChangeEvent<HTMLInputElement>;
                    field.onChange(changeEvent);
                    if(props.onChange) props.onChange(changeEvent);
                };

                return (
                    <Autocomplete
                        {...field}
                        id={props.id}
                        options={props.options}
                        getOptionLabel={(option: any) => option.children as string || ''}
                        onChange={handleChange}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        value={value}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                name={props.name}
                                label={props.label}
                                required={props.required}
                                margin={props.margin}
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