import React from "react";
import { CompleteDefaultDialog, CompleteDefaultDialogProps } from "@components/molecules/CompleteDefaultDialog";

export interface UpdateCompleteDialogProps extends CompleteDefaultDialogProps {
}


export const UpdateCompleteDialog: React.FC<UpdateCompleteDialogProps> = (props) => {
    return (
        <CompleteDefaultDialog
            {...props}
            dialogTitle='更新完了'
            fullWidth
        />
    );
}