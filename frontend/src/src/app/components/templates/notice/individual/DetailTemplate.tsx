import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { getPriorityKbnOptions } from "@enums/PriorityKbn";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { INotice } from "@app/admin/interfaces/notice/individual";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";

export interface DetailTemplateProps {
    formId: string;
    gridFormRows?: GridFormRowProps[];
    submit: SubmitHandler<INotice>;
};

export const gridRows: GridFormRowProps<INotice>[] = [
    {
        label: '輸送業者名',
        formControls: [
            {
                type: 'text',
                name: 'CarrierName',
                label: '輸送業者名',
                readOnly: true,
            },
        ]
    },
    {
        label: '車番',
        formControls: [
            {
                type: 'text',
                name: 'TruckNo',
                label: '車番',
                readOnly: true,
            },
        ]
    },
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

export const DetailTemplate :React.FC<DetailTemplateProps> = (props) => {
    const navigate = useNavigate();
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
        navigate('/notice/individual');
    };

    // submit 処理
    const submit: SubmitHandler<INotice> = async (data: INotice, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setUpdCompleteDialogOpen(true);
        }
        setUpdConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="個別お知らせ登録" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/notice/individual'}><DefaultButton variant="outlined">戻る</DefaultButton></Link>
                    <DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows ?? gridRows} onSubmit={handleSubmit(submit)} />
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='お知らせを更新しますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='お知らせを更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
        </React.Fragment>
    );
};
