import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
	return (
		<div className="input-wrap">
			<TextField required id="outlined-search" label="Search field" type="text" />
		</div>
	);
}