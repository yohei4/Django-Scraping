import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs() {
    return (
        <React.StrictMode>
            <Input placeholder="メールアドレス" inputProps={ariaLabel} />
        </React.StrictMode>
    );
}