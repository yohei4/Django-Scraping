import React from "react";
import { CompleteDangerDialog, CompleteDangerDialogProps } from "@components/molecules/CompleteDangerDialog";

export interface ErrorDialogProps extends CompleteDangerDialogProps {
}


export const ErrorDialog: React.FC<ErrorDialogProps> = (props) => {
    return (
        <CompleteDangerDialog
            {...props}
            dialogTitle={props.dialogTitle ?? 'エラー'}
            fullWidth
        />
    );
}