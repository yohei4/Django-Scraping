import { InputProps } from "@mui/material";
import BaseTextField from "./BaseTextField";

interface NameFiledProps extends InputProps {
    value?: string;
}

export default function NameFiled(props: NameFiledProps) {
    return (
        <BaseTextField
            id="name"
            name="name"
            type="text"
            placeholder="name"
            label="name"
            // required={true}
            value={props.value}
            onChange={props.onChange}
            muiName="AccountCircle"
            sx={props.sx}
        />
    );
}