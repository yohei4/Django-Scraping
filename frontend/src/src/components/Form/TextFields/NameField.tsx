import { BaseTextFieldProps } from '@mui/material/TextField';
import { BaseTextField } from "./";

interface NameFiledProps extends BaseTextFieldProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const NameFiled = (props: NameFiledProps) => {
    return (
        <BaseTextField
            id="name"
            name="name"
            type="text"
            placeholder="name"
            label="name"
            required={props.required}
            value={props.value}
            onChange={props.onChange}
            muiName="AccountCircle"
            sx={props.sx}
            inputRef={props.inputRef}
            error={props.error}
            inputProps={props.inputProps}
            helperText={props.helperText}
        />
    );
}