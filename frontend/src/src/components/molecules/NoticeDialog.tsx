import React from "react";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DefaultDialog, DefaultDialogProps } from "@components/atoms/DefaultDialog";

export interface NoticeDialogProps extends DefaultDialogProps {
    message?: string;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NoticeDialog: React.FC<NoticeDialogProps> = (props: NoticeDialogProps) => {
    return (
        <DefaultDialog
            {...props}
            disableCloseButton
            children={
                <Box sx={((theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: theme.spacing(2),
                    wordBreak: 'break-all',
                }))}>
                    {
                        props.message ?
                        props.message?.split(/\r\n|\r|\n/).map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        )) :
                        null
                    }
                </Box>
            }
            actions={[
                <DefaultButton autoFocus variant="outlined" onClick={props.onCloseButtonClick}>閉じる</DefaultButton>,
            ]}
        />
    );
};
