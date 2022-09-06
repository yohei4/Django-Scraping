import { InputProps } from "@mui/material";
import BaseTextField from "./BaseTextField";

interface EmailFiledProps extends InputProps {
    value?: string;
}

export default function EmailFiled(props: EmailFiledProps) {
    return (
        <BaseTextField
            id="email"
            name="email"
            type="email"
            label="email"
            // required={true}
            placeholder="email"
            muiName="Email"
            value={props.value}
            onChange={props.onChange}
            sx={props.sx}
        />
    );
}