import { InputProps } from "@mui/material";
import BaseTextField from "./BaseTextField";

export default function NameFiled(props: InputProps) {
    return (
        <BaseTextField
            id="name"
            name="name"
            type="text"
            placeholder="name"
            label="name"
            // required={true}
            muiName="AccountCircle"
            sx={props.sx}
        />
    );
}