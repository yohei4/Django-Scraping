import { DynamicFormDefaultDialog, DynamicFormDefaultDialogProps, DynamicFormDefaultFieldValues } from "@components/organisms/DynamicFormDefaultDialog";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { CompleteDefaultDialog } from "@components/molecules/CompleteDefaultDialog";

export interface UpdateFormDialogProps<TFieldValues extends DynamicFormDefaultFieldValues = DynamicFormDefaultFieldValues> extends DynamicFormDefaultDialogProps<TFieldValues> {
    open: boolean;
    completeTitle: string;
    completeMessage: string;
};

export const UpdateFormDialog = <TFieldValues extends DynamicFormDefaultFieldValues = DynamicFormDefaultFieldValues>(props: UpdateFormDialogProps<TFieldValues>) => {
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
            <DynamicFormDefaultDialog
                {...props}
                submit={submit}
                fullWidth
            />
            <CompleteDefaultDialog
                open={completeOpen}
                dialogTitle={props.completeTitle}
                message={props.completeMessage}
                onCloseButtonClick={() => setCompleteOpen(false)}
                fullWidth
            />
        </React.Fragment>
    );
};
