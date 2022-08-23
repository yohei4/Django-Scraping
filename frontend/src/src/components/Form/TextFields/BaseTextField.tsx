import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputProps } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface TextFieldProps extends InputProps {
    label?: string;
    muiName: keyof typeof Icons;
}

export default function BaseTextField(props: TextFieldProps) {
    const [value, setVaue] = React.useState('');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVaue(event.target.value);
    };

    // アイコンを動的に指定可能にする
    const Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string } = Icons[props.muiName];

    return (
        <Box sx={{...{ display: 'flex', alignItems: 'flex-end' }, ...props.sx}} >
            <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
                id={props.id}
                name={props.name}
                type={props.type}
                label={props.label}
                required={props.required}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={value}
                variant="standard"
            />
        </Box>
    );
}