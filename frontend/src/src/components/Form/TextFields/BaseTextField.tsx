import * as React from 'react';
import Box from '@mui/material/Box';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import { InputProps } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface TextFieldProps extends BaseTextFieldProps {
    muiName: keyof typeof Icons;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const BaseTextField = (props: TextFieldProps) => {
    // アイコンを動的に指定可能にする
    const Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string } = Icons[props.muiName];

    return (
        <Box sx={{...{ display: 'flex', alignItems: 'flex-start' }, ...props.sx}} >
            <Icon sx={{ color: 'action.active', mr: 1, mb: 0.5, mt: 2.5 }} />
            <TextField
                id={props.id}
                name={props.name}
                type={props.type}
                label={props.label}
                required={props.required}
                placeholder={props.placeholder}
                onChange={props.onChange}
                variant="standard"
                error={props.error}
                inputProps={props.inputProps}
                helperText={props.helperText}
                inputRef={props.inputRef}
                defaultValue={props.defaultValue}
            />
        </Box>
    );
}