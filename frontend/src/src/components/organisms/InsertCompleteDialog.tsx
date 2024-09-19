import React from "react";
import { CompleteDefaultDialog, CompleteDefaultDialogProps } from "@components/molecules/CompleteDefaultDialog";

export interface InsertCompleteDialogProps extends CompleteDefaultDialogProps {
}


export const InsertCompleteDialog: React.FC<InsertCompleteDialogProps> = (props) => {
    return (
        <CompleteDefaultDialog
            {...props}
            dialogTitle='登録完了'
            fullWidth
        />
    );
}