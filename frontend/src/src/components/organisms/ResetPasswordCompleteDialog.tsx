import React from "react";
import { CompleteDefaultDialog, CompleteDefaultDialogProps } from "@components/molecules/CompleteDefaultDialog";

export interface ResetPasswordCompleteDialogProps extends CompleteDefaultDialogProps {
}


export const ResetPasswordCompleteDialog: React.FC<ResetPasswordCompleteDialogProps> = (props) => {
    return (
        <CompleteDefaultDialog
            {...props}
            dialogTitle='パスワード変更完了'
            message='パスワード変更が完了しました。'
            fullWidth
        />
    );
}