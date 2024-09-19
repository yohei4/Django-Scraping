import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { Button } from "@components/atoms/Button";
import { DangerButton } from "@components/atoms/DangerButton";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";
import { DeleteCompleteDialog } from "@components/organisms/DeleteCompleteDialog";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { DeleteConfirmDialog } from "@components/organisms/DeleteConfirmDialog";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { IWarehouse } from "@app/admin/interfaces/master/warehouse";

export interface DetailTemplateProps {
    formId: string;
    gridFormRows?: GridFormRowProps[];
    submit: SubmitHandler<IWarehouse>;
    onDelete: (event: React.MouseEvent<HTMLButtonElement>) => Promise<boolean>;
};

export const gridRows: GridFormRowProps<IWarehouse>[] = [
    {
        label: '倉庫コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseCd',
                label: '倉庫コード',
                readOnly: true
            },
        ]
    },
    {
        label: '倉庫名',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseName',
                label: '倉庫名',
                required: true,
            },
        ]
    },
    {
        label: '倉庫名(略)',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseAbbr',
                label: '倉庫名(略)',
                required: true,
            },
        ]
    },
    {
        label: '積込想定時間',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'LoadingTime',
                label: '積込想定時間',
                required: true,
                endAdornmentInner: '分',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: 'アラート待機台数',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'AlertWaitNum',
                label: 'アラート待機台数',
                required: true,
                endAdornmentInner: '台',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '初期配置人数',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'DefaultLiftman',
                label: '初期配置人数',
                required: true,
                endAdornmentInner: '人',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '表示順',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'SortOrder',
                label: '表示順',
                required: true,
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '備考',
        formControls: [
            {
                type: 'text',
                name: 'Remark',
                label: '備考',
            },
        ]
    },
    {
        label: '有効/無効',
        formControls: [
            {
                type: 'radio',
                name: 'InvalidKbn',
                label: '有効/無効',
                required: true,
                options: getInvalidKbnOptions(),
            },
        ]
    },
    {
        label: '登録日時',
        formControls: [
            {
                type: 'datetime-local',
                name: 'InsDateTime',
                label: '登録日時',
                required: true,
                readOnly: true,
            },
        ]
    },
    {
        label: '登録者',
        formControls: [
            {
                type: 'text',
                name: 'InsUserName',
                label: '登録者 ',
                required: true,
                readOnly: true,
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
                readOnly: true
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

    // 削除確認ダイアログ
    const [delConfirmDialogOpen, setDelConfirmDialogOpen] = React.useState(false);
    const handleDelConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelConfirmDialogOpen(true);
    };
    const handleDelConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelConfirmDialogOpen(false);
    };

    // 更新完了ダイアログ
    const [updCompleteDialogOpen, setUpdCompleteDialogOpen] = React.useState(false);
    const handleUpdCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdCompleteDialogOpen(false);
        navigate('/master/warehouse');
    };

    // 削除完了ダイアログ
    const [delCompleteDialogOpen, setDelCompleteDialogOpen] = React.useState(false);
    const handleDelCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelCompleteDialogOpen(false);
        navigate('/master/warehouse');
    };

    // submit 処理
    const submit: SubmitHandler<IWarehouse> = async (data: IWarehouse, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setUpdCompleteDialogOpen(true);
        }
        setUpdConfirmDialogOpen(false);
    }

    // delete 処理
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (await props.onDelete(event)) {
            setDelCompleteDialogOpen(true);
        }
        setDelCompleteDialogOpen(true);
    }


    return (
        <React.Fragment>
            <PageTitle text="倉庫詳細" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/warehouse'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DangerButton onClick={handleDelConfirmDialogOpen}>削除</DangerButton>
                    <DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows ?? gridRows} onSubmit={handleSubmit(submit)} />
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='マスタの更新をしますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <DeleteConfirmDialog open={delConfirmDialogOpen} message='マスタの削除をしますか？' onNoButtonClick={handleDelConfirmDialogClose} onYesButtonClick={handleDelete} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='マスタの更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
            <DeleteCompleteDialog open={delCompleteDialogOpen} message='マスタの削除しました。' onCloseButtonClick={handleDelCompleteDialogClose} />
        </React.Fragment>
    );
};
