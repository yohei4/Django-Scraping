import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItemProps, Select as MuiSelect, SelectProps as MuiSelectProps, OutlinedInput, SelectChangeEvent, useTheme } from "@mui/material";
import { MenuItem } from "./MenuItem";
import React, { ChangeEvent } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";

export type MultipleSelectProps = MuiSelectProps & UseControllerProps & {
    variant?: 'standard' | 'outlined' | 'filled';
    options?: MenuItemProps[];
    helperText?: React.ReactNode;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

export const MultipleSelect = (props: MultipleSelectProps) => {
    const control = useFormContext();
    const selectProps = props as MuiSelectProps;

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue={[]}
            render={({ field, formState: { errors } }) => {
                const handleChange = (event: SelectChangeEvent<unknown>, children: React.ReactNode) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event, children);
                };
                
                // 　chipsの削除ボタン押下イベント
                const chipDelete = (event: ChangeEvent<{ value: unknown }>, name: string | undefined, deleteTargetValue: string | number) => {
                    const newValue = field.value ? (field.value as (string | number)[]).filter(x => x !== deleteTargetValue) : undefined;
                    const changeEvent = {
                        target: {
                            name: name,
                            value: newValue,
                        },
                    } as unknown as SelectChangeEvent<{ name: unknown, value: unknown }>;
                    handleChange(changeEvent, '');
                };

                return (
                    <FormControl variant={props.variant} fullWidth={props.fullWidth}>
                        <InputLabel id={props.labelId} error={props.error}>{props.label}</InputLabel>
                        <MuiSelect
                            {...selectProps}
                            {...field}
                            multiple
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            MenuProps={MenuProps}
                            readOnly={props.readOnly}
                            renderValue={(selected) => {
                                return (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {
                                        (selected as (string | number)[]).map((value, index) => (
                                            <Chip
                                                key={index}
                                                label={props.options?.find(x => x.value === value)?.children}
                                                onDelete={ (event) => chipDelete(event, props.name, value) }
                                                onMouseDown={ (event) => event.stopPropagation() }
                                            />
                                        ))
                                    }
                                </Box>)
                            }}
                        >
                            {
                                props.options ?
                                props.options.map((option, index) => {
                                    return <MenuItem key={index} {...option} />
                                }) :
                                null
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