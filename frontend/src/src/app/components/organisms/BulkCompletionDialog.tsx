import { MouseEventHandler, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { UpdateFormDialog } from "@components/organisms/UpdateFormDialog";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";

export interface BulkCompletionDialogProps {
    open: boolean;
    submit: SubmitHandler<any>; // TODO: interfaceを設定
    onClose: MouseEventHandler<HTMLButtonElement>;
}

// TODO: interfaceを設定
interface BulkCompletionForm {
    dateTime: Date;
}

const formControls: DynamicFormControlProps<BulkCompletionForm>[][] = [
    [
        {
            type: 'datetime-local',
            name: 'dateTime',
            label: '荷役完了日時',
            required: true,
            format: 'YYYY/MM/DD HH:mm',
            views:['year', 'month', 'day', 'hours', 'minutes'],
        },
    ],
];

export const BulkCompletionDialog: React.FC<BulkCompletionDialogProps> = ({
    open,
    submit,
    onClose,
}) => {
    const [defaultValues, setDefaultValues] = useState<BulkCompletionForm>({ dateTime: new Date() });

    useEffect(() => {
        setDefaultValues({ dateTime: new Date() });
    }, [open]);

    return (
        <UpdateFormDialog
            open={open}
            dialogTitle='一括完了確認'
            message='荷役作業を完了しますか？'
            formId='form_bulk_completion'
            formControls={formControls}
            completeTitle='一括完了'
            completeMessage='荷役作業を完了しました。'
            defaultValues={defaultValues}
            submit={submit}
            onClose={onClose}
            onNoButtonClick={onClose}
            onCloseButtonClick={onClose}
        />
    );
}