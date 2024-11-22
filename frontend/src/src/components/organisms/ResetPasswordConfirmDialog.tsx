import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";
import React from "react";

export interface ResetPasswordConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const ResetPasswordConfirmDialog: React.FC<ResetPasswordConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='更新確認'
            message='パスワードを更新しますか？'
            fullWidth
        />
    );
}