import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton, styled } from "@mui/material";

export interface DangerDialogProps extends DialogProps {
    dialogTitle?: React.ReactNode;
    actions?: React.ReactElement[];
    disableCloseButton?: boolean;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    backgroundColor: theme.dialog.danger.header.backgroundColor,
    color: theme.dialog.danger.header.color,
    '& .DialogHeaderCloseButton-wrapper': {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiIconButton-root': {
            color: theme.dialog.danger.header.color,
            width: '100%',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
            },
        }
    },
}));

export const DangerDialog: React.FC<DangerDialogProps> = (props) => {
    const dialogProps = props as DialogProps;
    return (
        <BootstrapDialog
            open={props.open}
            onClose={props.onCloseButtonClick}
            aria-labelledby="bootstrap-danger-dialog-title"
            fullWidth={props.fullWidth}
            sx={props.sx}
        >
            <DialogHeader className="DialogHeader-root">
                <Box width={40} className="DialogHeader-spacer"></Box>
                <DialogTitle
                        sx={{
                            m: 0,
                            p: 0,
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {props.dialogTitle}
                </DialogTitle>
                <Box width={40} className="DialogHeader-spacer DialogHeaderCloseButton-wrapper">
                    {
                        props.disableCloseButton ? null :
                        <IconButton
                            aria-label="close"
                            onClick={props.onCloseButtonClick}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                </Box>
            </DialogHeader>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {
                    props.actions?.map((el, index) => (
                        <React.Fragment key={index}>{el}</React.Fragment>
                    ))
                }
            </DialogActions>
        </BootstrapDialog>
    );
};