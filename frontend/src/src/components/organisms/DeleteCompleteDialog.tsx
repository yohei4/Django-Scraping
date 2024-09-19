import React from "react";
import { CompleteDangerDialog, CompleteDangerDialogProps } from "@components/molecules/CompleteDangerDialog";

export interface DeleteCompleteDialogProps extends CompleteDangerDialogProps {
}


export const DeleteCompleteDialog: React.FC<DeleteCompleteDialogProps> = (props) => {
    return (
        <CompleteDangerDialog
            {...props}
            dialogTitle='削除完了'
            fullWidth
        />
    );
}