import { ChangeEvent, useEffect, useState } from "react";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, CircularProgress, InputAdornment, MenuItemProps, TextField, TextFieldProps } from "@mui/material";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { useClient } from "@hooks/useClient";

export type PreLoadedComboBoxProps = TextFieldProps & UseControllerProps & {
    url?: string;
    readOnly?: boolean;
}

export const PreLoadedComboBox = (props: PreLoadedComboBoxProps) => {
    const control = useFormContext();
    const { get } = useClient();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState<MenuItemProps | undefined | null>(null);
    const [options, setOptions] = useState<readonly MenuItemProps[]>([]);

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

    useEffect(() => {
        setValue(options.find(x => x.value == control.getValues()[props.name]) ?? null);
    }, [options]);

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
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
                        autoSelect
                        id={props.id}
                        isOptionEqualToValue={(option, value) => option.children === value.children}
                        options={options}
                        getOptionLabel={(option: any) => option.children as string || ''}
                        onChange={handleChange}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        value={value}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        fullWidth={props.fullWidth}
                        loading={loading}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                name={props.name}
                                label={props.label}
                                required={props.required}
                                margin={props.margin}
                                InputProps={{
                                    ...params.InputProps,
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