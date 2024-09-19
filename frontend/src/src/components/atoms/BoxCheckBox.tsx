import React from "react";
import { Checkbox, InputLabel } from "@mui/material";
import { lightBlue, grey } from '@mui/material/colors';

export interface BoxCheckBoxProps {
    name?: string;
    label?: React.ReactNode;
    value?: string | number;
    defaultValue?: string | number;
    required?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const BoxCheckBox: React.FC<BoxCheckBoxProps> = (props) => {
    return (
        <InputLabel
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(0, .5),
                position: 'relative',
                mb: theme.spacing(0.5),
                p: theme.spacing(0, 1.2),
                border: `1px solid ${grey[400]}`,
                borderRadius: '3px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                '&:has(:checked)': {
                    backgroundColor: lightBlue[700],
                    color: '#fff',
                },
            })}
        >
            <Checkbox
                className='box-checkbox'
                name={props.name}
                sx={{
                    p: 0,
                    color: lightBlue[700],
                    '&.Mui-checked': {
                      color: '#fff',
                    },
                }}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.label}
        </InputLabel>
    );
}