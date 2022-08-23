import { InputProps } from "@mui/material";
import BaseTextField from "./BaseTextField";

export default function EmailFiled(props: InputProps) {
    return (
        <BaseTextField
            id="email"
            name="email"
            type="email"
            label="email"
            // required={true}
            placeholder="email"
            muiName="Email"
            sx={props.sx}
        />
    );
}