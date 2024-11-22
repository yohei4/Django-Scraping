import React from "react";
import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";

export interface ConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='確認'
            fullWidth
        />
    );
}