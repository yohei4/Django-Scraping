import React from "react";
import { CompleteDefaultDialog, CompleteDefaultDialogProps } from "@components/molecules/CompleteDefaultDialog";

export interface ResetPasswordCompleteDialogProps extends CompleteDefaultDialogProps {
}


export const ResetPasswordCompleteDialog: React.FC<ResetPasswordCompleteDialogProps> = (props) => {
    return (
        <CompleteDefaultDialog
            {...props}
            dialogTitle='更新完了'
            message='パスワードを更新しました。'
            fullWidth
        />
    );
}