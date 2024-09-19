import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";
import React from "react";

export interface InsertConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const InsertConfirmDialog: React.FC<InsertConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='登録確認'
            fullWidth
        />
    );
}