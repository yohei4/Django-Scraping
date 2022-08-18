import * as React from 'react';
import Box from '@mui/material/Box';
import Email from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';

interface InputProps {
    id?: string;
    name?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

export default function EmailFiled(props: InputProps) {
    const [email, setEmail] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
            <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
                id={props.id ? props.id : 'email'}
                name={props.name ? props.name : 'email'}
                type={props.type ? props.type : 'email'}
                label={props.label}
                required={props.required}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={email}
                variant="standard"
            />
        </Box>
    );
}