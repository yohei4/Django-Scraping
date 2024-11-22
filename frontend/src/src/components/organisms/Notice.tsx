import React, { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { Alert } from "@components/atoms/Alert";
import { NoticeDialog } from "@components/molecules/NoticeDialog";

export interface NoticeProps {
    message?: string;
    sx?: SxProps<Theme>;
}

export const Notice: React.FC<NoticeProps> = (props: NoticeProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box component='div' className='Notice-wrapper' sx={props.sx} >
            <Alert
                className='Notice-alert'
                onClick={handleOpen}
                message={props.message} />
            <NoticeDialog
                open={open}
                dialogTitle='お知らせ'
                className='Notice-dialog'
                onCloseButtonClick={handleClose}
                message={props.message}
                fullWidth />
        </Box>
    );
};
