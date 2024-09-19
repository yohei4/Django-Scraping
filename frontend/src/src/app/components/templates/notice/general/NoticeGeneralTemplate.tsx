import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { getPriorityKbnOptions } from "@enums/PriorityKbn";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";
import { ICommonNotice } from "@app/admin/interfaces/notice/general/ICommonNotice";

export interface NoticeGeneralTemplateProps {
    formId: string;
    gridFormRows?: GridFormRowProps[];
    submit: SubmitHandler<ICommonNotice>;
};

export const gridRows: GridFormRowProps<ICommonNotice>[] = [
    {
        label: '有効/無効',
        formControls: [
            {
                type: 'radio',
                name: 'InvalidKbn',
                required: true,
                options: getInvalidKbnOptions(),
            },
        ]
    },
    {
        label: '重要度',
        formControls: [
            {
                type: 'radio',
                name: 'PriorityKbn',
                required: true,
                options: getPriorityKbnOptions(),
            },
        ]   
    },
    {
        label: 'お知らせ内容',
        required: true,
        formControls: [
            {
                type: 'textarea',
                name: 'Notice',
                label: 'お知らせ内容',
                minRows: 5,
                maxRows: 10,
                required: true,
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

export const NoticeGeneralTemplate :React.FC<NoticeGeneralTemplateProps> = (props) => {
    const { handleSubmit } = useFormContext();

    // 更新確認ダイアログ
    const [updConfirmDialogOpen, setUpdConfirmDialogOpen] = React.useState(false);
    const handleUpdConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdConfirmDialogOpen(true);
    };
    const handleUpdConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdConfirmDialogOpen(false);
    };

    // 更新完了ダイアログ
    const [updCompleteDialogOpen, setUpdCompleteDialogOpen] = React.useState(false);
    const handleUpdCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdCompleteDialogOpen(false);
    };

    // submit 処理
    const submit: SubmitHandler<ICommonNotice> = async (data: ICommonNotice, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setUpdCompleteDialogOpen(true);
        }
        setUpdConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="共通お知らせ登録" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows ?? gridRows} onSubmit={handleSubmit(submit)} />
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='お知らせを更新しますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='お知らせを更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
        </React.Fragment>
    );
};
