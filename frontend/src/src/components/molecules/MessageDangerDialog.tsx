import { Button } from "@components/atoms/Button";
import { DangerButton } from "@components/atoms/DangerButton";
import { DangerDialog, DangerDialogProps } from "@components/atoms/DangerDialog";
import { Box } from "@mui/material";
import React from "react";

export interface MessageDangerDialogProps extends DangerDialogProps {
    message?: React.ReactNode;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MessageDangerDialog: React.FC<MessageDangerDialogProps> = (props) => {
    return (
        <DangerDialog
            {...props}
            disableCloseButton
            children={
                <Box sx={((theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing(6, 3),
                }))}>
                    {props.message}
                </Box>
            }
            actions={[
                <DangerButton autoFocus variant="outlined" onClick={props.onCloseButtonClick}>閉じる</DangerButton>
            ]}
        />
    );
};