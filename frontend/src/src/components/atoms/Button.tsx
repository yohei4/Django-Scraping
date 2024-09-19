import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { Icon } from "./Icon";
import { ReactNode } from "react";

export interface ButtonProps extends MuiButtonProps {
    startIconName?: keyof typeof Icons;
    endIconName?: keyof typeof Icons;
    children?: ReactNode;
}

export const Button : React.FC<ButtonProps> = (props) => {
    return (
        <MuiButton
            onClick={props.onClick}
            color={props.color}
            startIcon={props.startIconName ? <Icon name={props.startIconName} /> : null}
            endIcon={props.endIconName ? <Icon name={props.endIconName} /> : null}
            sx={props.sx}
            variant={props.variant}
            form={props.form}
            autoFocus={props.autoFocus}
            type={props.type}
            disabled={props.disabled}
            value={props.value}
            name={props.name}
        >
            {props.children}
        </MuiButton>
    );
}