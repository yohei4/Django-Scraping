import { Button } from "@components/atoms/Button";
import { DangerButton } from "@components/atoms/DangerButton";
import { DangerDialog, DangerDialogProps } from "@components/atoms/DangerDialog";
import { Box } from "@mui/material";
import React from "react";

export interface ConfirmDangerDialogProps extends DangerDialogProps {
    formId?: string;
    message?: React.ReactNode;
    onNoButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    onYesButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmDangerDialog: React.FC<ConfirmDangerDialogProps> = (props) => {
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
                <DangerButton autoFocus variant="outlined" onClick={props.onNoButtonClick} sx={{minWidth: '6rem'}}>いいえ</DangerButton>,
                <DangerButton type='submit' onClick={props.onYesButtonClick} form={props.formId} sx={{minWidth: '6rem'}}>はい</DangerButton>
            ]}
        />
    );
};