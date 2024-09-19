import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, BoxProps, Input, InputLabel, InputLabelProps, MenuItemProps, styled } from "@mui/material";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";

export interface BoxRadioProps extends UseControllerProps {
    type?: 'radio';
    label?: React.ReactNode;
    value?: string | number;
    defaultValue?: string | number;
    required?: boolean;
    readOnly?: boolean;
    options?: MenuItemProps[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const BoxRadioLabel = styled(InputLabel)<InputLabelProps>
    (({ theme }) => ({
        position: 'static',
        width: '100%',
        maxWidth: '12rem',
        minWidth: 'auto',
        margin: 0,
        padding: theme.spacing(2, 1.75),
        color: theme.palette.default.main,
        border: `1px solid ${theme.palette.default.main}`,
        boxShadow: 'inset 0 0 0 transparent',
        textAlign: 'center',
        borderRight: 'none',
        cursor: 'pointer',
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '&:first-of-type': {
            borderTopLeftRadius: '.3rem',
            borderBottomLeftRadius: '.3rem',
        },
        '&:last-of-type': {
            borderTopRightRadius: '.3rem',
            borderBottomRightRadius: '.3rem',
            borderRight: `1px solid ${theme.palette.default.main}`,
        },
    }));

const BoxRadioWrapper = styled(Box)<BoxProps>
    (({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& input[type="radio"]:checked + .MuiInputLabel-root': {
            backgroundColor: theme.palette.default.main,
            color: theme.palette.default.contrastText,
        },
        '& input[type="radio"]:focus + .MuiInputLabel-root, & input[type="radio"]:focus-visible + .MuiInputLabel-root': {
            borderColor: theme.palette.default.main,
            boxShadow: 'inset 0 0 0 transparent',
            outline: 0,
        },
        '& input[type="radio"]': {
            width: 0,
        },
    }));

export const BoxRadio: React.FC<BoxRadioProps> = (props) => {
    const control = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            render={({ field, formState: { errors } }) => {

                const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    if(props.onChange) props.onChange(event);
                };

                return (
                    <BoxRadioWrapper>
                        {
                            props.options?.map((option, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <input required={props.required} type={props.type} value={option.value} name={props.name} id={`${props.name}_${option.value}`} checked={field.value == option.value} onChange={handleChange} />
                                        <BoxRadioLabel htmlFor={`${props.name}_${option.value}`}>{option.children}</BoxRadioLabel>
                                    </React.Fragment>
                                );
                            })
                        }
                    </BoxRadioWrapper>
                );
            }}
        />
    );
};