import { DynamicFormDefaultDialog, DynamicFormDefaultDialogProps, DynamicFormDefaultFieldValues } from "@components/organisms/DynamicFormDefaultDialog";
import React, { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { CompleteDefaultDialog } from "@components/molecules/CompleteDefaultDialog";

export interface UpdateFormDialogProps<TFieldValues extends DynamicFormDefaultFieldValues = DynamicFormDefaultFieldValues> extends DynamicFormDefaultDialogProps<TFieldValues> {
    open: boolean;
    completeTitle: string;
    completeMessage: string;
    submit: (data: TFieldValues, event?: React.BaseSyntheticEvent, methods?: UseFormReturn<TFieldValues, any, undefined>) => any;
};

export const UpdateFormDialog = <TFieldValues extends DynamicFormDefaultFieldValues = DynamicFormDefaultFieldValues>(props: UpdateFormDialogProps<TFieldValues>) => {
    const [completeOpen, setCompleteOpen] = useState<boolean>(false);

    // submit 処理
    const submit: SubmitHandler<TFieldValues> = async (data: TFieldValues, event?: React.BaseSyntheticEvent, methods?: UseFormReturn<TFieldValues, any, undefined>) => {
        if(await props.submit(data, event, methods)) {
            if(props.onCloseButtonClick) props.onCloseButtonClick(event as any);
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
