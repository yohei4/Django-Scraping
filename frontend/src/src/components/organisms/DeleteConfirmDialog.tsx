import { ConfirmDangerDialog, ConfirmDangerDialogProps } from "@components/molecules/ConfirmDangerDialog";
import React from "react";

export interface DeleteConfirmDialogProps extends ConfirmDangerDialogProps {
}


export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = (props) => {
    return (
        <ConfirmDangerDialog
            {...props}
            dialogTitle='削除確認'
            fullWidth
        />
    );
}