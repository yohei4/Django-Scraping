import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";
import React from "react";

export interface UpdateConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const UpdateConfirmDialog: React.FC<UpdateConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='更新確認'
            fullWidth
        />
    );
}