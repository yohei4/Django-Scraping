import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { InsertConfirmDialog } from "@components/organisms/InsertConfirmDialog";
import { InsertCompleteDialog } from "@components/organisms/InsertCompleteDialog";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { ISystem } from "@app/admin/interfaces/master/systemSettings";

export interface SystemSettingsTemplateProps<T extends { [key: string]: any } | undefined = any> {
    formId: string;
    gridFormRows: GridFormRowProps<T>[];
    submit: SubmitHandler<ISystem>;
};

export const gridRows: GridFormRowProps<ISystem>[] = [
    {
        label: '荷役時間想定時間',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'CargoHandlingTime',
                required: true,
                endAdornmentInner: '分',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '伝票受取完了時間',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'InvoiceReceiptTime',
                label: '伝票受取完了時間',
                required: true,
                endAdornmentInner: '分',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '自動更新間隔(社員)',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'AutoUpdateStaff',
                label: '自動更新間隔(社員)',
                required: true,
                endAdornmentInner: '秒',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '自動更新間隔(ドライバー)',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'AutoUpdateDriver',
                label: '自動更新間隔(社員)',
                required: true,
                endAdornmentInner: '秒',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: 'アラートメッセージ',
        required: true,
        formControls: [
            {
                type: 'textarea',
                name: 'AlertMessage',
                label: 'アラートメッセージ',
                required: true,
                minRows: 3,
            },
        ]
    },
    {
        label: '更新日時',
        formControls: [
            {
                type: 'datetime-local',
                name: 'UpdDateTime',
                label: '更新日時',
                required: true,
                readOnly: true,
            },
        ]
    },
    {
        label: '最終更新者',
        formControls: [
            {
                type: 'text',
                name: 'UpdUserName',
                label: '最終更新者',
                required: true,
                readOnly: true,
            },
        ]
    },
];

export const SystemSettingsTemplate = <T extends { [key: string]: any } | undefined = any>(props: SystemSettingsTemplateProps<T>) => {
    const [insConfirmDialogOpen, setInsConfirmDialogOpen] = React.useState(false);
    const { handleSubmit } = useFormContext();

    const handleInsConfirmOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsConfirmDialogOpen(true);
    };
    const handleInsConfirmClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsConfirmDialogOpen(false);
    };

    // 登録完了ダイアログ
    const [insCompleteDialogOpen, setInsCompleteDialogOpen] = React.useState(false);
    const handleInsCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsCompleteDialogOpen(false);
    };

    // submit 処理
    const submit: SubmitHandler<ISystem> = async (data: ISystem, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setInsCompleteDialogOpen(true);
        }
        setInsConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="システム設定" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <DefaultButton onClick={handleInsConfirmOpen}>登録</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows} onSubmit={handleSubmit(submit)} />
            <InsertConfirmDialog formId={props.formId} open={insConfirmDialogOpen} message='マスタの登録をしますか？' onNoButtonClick={handleInsConfirmClose} />
            <InsertCompleteDialog open={insCompleteDialogOpen} message='マスタの登録しました。' onCloseButtonClick={handleInsCompleteDialogClose} />
        </React.Fragment>
    );
};
