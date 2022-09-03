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
import { InputProps } from "@mui/material";

interface PasswordFiledProps extends InputProps {
    value?: string;
}

export default function PasswordFiled(props: PasswordFiledProps) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box sx={{...{ display: 'flex', alignItems: 'flex-end' }, ...props.sx}}>
            <Key sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <FormControl variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={props.value}
                    required={props.required}
                    onChange={props.onChange}
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
            </FormControl>
        </Box>
    );
}