import * as React from 'react';
import Box from '@mui/material/Box';
import Key from '@mui/icons-material/Key';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import { BaseTextFieldProps, FormHelperText, FormLabel, FormLabelClasses } from "@mui/material";


interface PasswordFiledProps extends BaseTextFieldProps {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const PasswordFiled = (props: PasswordFiledProps) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box sx={{...{ display: 'flex', alignItems: 'flex-start' }, ...props.sx}}>
            <Key sx={{ color: 'action.active', mr: 1, mb: 0.5, mt: 2.5 }} />
            <FormControl variant="standard">
                <InputLabel htmlFor="password" required={props.required} error={props.error}>
                    {props.label ? props.label : 'Password'}
                </InputLabel>
                <Input
                    id={props.id ? props.id : 'password'}
                    name={props.name ? props.name : 'password'}
                    type={showPassword ? 'text' : 'password'}
                    required={props.required}
                    onChange={props.onChange}
                    error={props.error}
                    inputProps={props.inputProps}
                    inputRef={props.inputRef}
                    defaultValue={props.defaultValue}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                { props.helperText ?
                    <FormHelperText id={props.name ? props.name + '-helper-text' : 'password-helper-text'} error={props.error} filled={true}>{props.helperText}</FormHelperText> :
                    ''
                }
            </FormControl>
        </Box>
    );
}