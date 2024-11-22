import React from "react";
import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";

export interface ReturnConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const ReturnConfirmDialog: React.FC<ReturnConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='確認'
            message={props.message ?? <>一覧に戻ります。<br />編集中のデータは削除されますがよろしいですか？</>}
            fullWidth
        />
    );
}