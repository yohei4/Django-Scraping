import React from "react";
import { Box } from "@mui/material";
import { DangerButton } from "@components/atoms/DangerButton";
import { DangerDialog, DangerDialogProps } from "@components/atoms/DangerDialog";

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