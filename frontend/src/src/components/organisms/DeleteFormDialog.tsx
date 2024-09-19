import { DynamicFormDangerDialog, DynamicFormDangerDialogProps, DynamicFormDangerFieldValues } from "@components/organisms/DynamicFormDangerDialog";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { CompleteDangerDialog } from "@components/molecules/CompleteDangerDialog";

export interface DeleteFormDialogProps<TFieldValues extends DynamicFormDangerFieldValues = DynamicFormDangerFieldValues> extends DynamicFormDangerDialogProps<TFieldValues> {
    open: boolean;
    completeTitle: string;
    completeMessage: string;
};

export const DeleteFormDialog = <TFieldValues extends DynamicFormDangerFieldValues = DynamicFormDangerFieldValues>(props: DeleteFormDialogProps<TFieldValues>) => {
    const [completeOpen, setCompleteOpen] = useState<boolean>(false);

    // submit 処理
    const submit: SubmitHandler<TFieldValues> = async (data: TFieldValues, event?: React.BaseSyntheticEvent) => {
        if(props.onCloseButtonClick) props.onCloseButtonClick(event as any);
        if(await props.submit(data, event)) {
            setCompleteOpen(true);
        }
    };

    return(
        <React.Fragment>
            <DynamicFormDangerDialog
                {...props}
                submit={submit}
                fullWidth
            />
            <CompleteDangerDialog
                open={completeOpen}
                dialogTitle={props.completeTitle}
                message={props.completeMessage}
                onCloseButtonClick={() => setCompleteOpen(false)}
                fullWidth
            />
        </React.Fragment>
    );
};
