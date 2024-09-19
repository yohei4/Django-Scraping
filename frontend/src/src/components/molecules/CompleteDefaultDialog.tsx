import React from "react";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DefaultDialog, DefaultDialogProps } from "@components/atoms/DefaultDialog";

export interface CompleteDefaultDialogProps extends DefaultDialogProps {
    message?: React.ReactNode;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CompleteDefaultDialog: React.FC<CompleteDefaultDialogProps> = (props) => {
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
                <DefaultButton autoFocus variant="outlined" onClick={props.onCloseButtonClick}>閉じる</DefaultButton>,
            ]}
        />
    );
};