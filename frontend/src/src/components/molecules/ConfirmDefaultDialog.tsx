import React from "react";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DefaultDialog, DefaultDialogProps } from "@components/atoms/DefaultDialog";

export interface ConfirmDefaultDialogProps extends DefaultDialogProps {
    formId?: string;
    message?: React.ReactNode;
    onNoButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    onYesButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmDefaultDialog: React.FC<ConfirmDefaultDialogProps> = (props) => {
    return (
        <DefaultDialog
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
                <DefaultButton autoFocus variant="outlined" onClick={props.onNoButtonClick} sx={{minWidth: '6rem'}}>いいえ</DefaultButton>,
                <DefaultButton type='submit' onClick={props.onYesButtonClick} form={props.formId} sx={{minWidth: '6rem'}}>はい</DefaultButton>
            ]}
        />
    );
};