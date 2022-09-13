import { BaseTextField } from "./";
import { BaseTextFieldProps } from '@mui/material/TextField';

interface EmailFiledProps extends BaseTextFieldProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const EmailFiled = (props: EmailFiledProps) => {
    return (
        <BaseTextField
            id="email"
            name="email"
            type="email"
            label="email"
            required={props.required}
            placeholder="email"
            muiName="Email"
            onChange={props.onChange}
            sx={props.sx}
            inputRef={props.inputRef}
            error={props.error}
            inputProps={props.inputProps}
            helperText={props.helperText}
            defaultValue={props.defaultValue}
        />
    );
}