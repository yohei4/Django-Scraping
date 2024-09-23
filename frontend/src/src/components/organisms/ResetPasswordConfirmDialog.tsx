import React from "react";
import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";

export interface ResetPasswordConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const ResetPasswordConfirmDialog: React.FC<ResetPasswordConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='パスワード変更確認'
            message='パスワードの変更をしますか？'
            fullWidth
        />
    );
}