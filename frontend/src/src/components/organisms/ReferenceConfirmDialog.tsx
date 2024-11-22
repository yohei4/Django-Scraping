import React from "react";
import { ConfirmDefaultDialog, ConfirmDefaultDialogProps } from "@components/molecules/ConfirmDefaultDialog";

export interface ReferenceConfirmDialogProps extends ConfirmDefaultDialogProps {
}


export const ReferenceConfirmDialog: React.FC<ReferenceConfirmDialogProps> = (props) => {
    return (
        <ConfirmDefaultDialog
            {...props}
            dialogTitle='確認'
            message={props.message ?? <>参照モードに切り替えます。<br />編集中のデータは削除されますがよろしいですか？</>}
            fullWidth
        />
    );
}