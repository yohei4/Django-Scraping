import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { Button } from "@components/atoms/Button";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DangerButton } from "@components/atoms/DangerButton";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { DeleteConfirmDialog } from "@components/organisms/DeleteConfirmDialog";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";
import { DeleteCompleteDialog } from "@components/organisms/DeleteCompleteDialog";
import { EditDataTableColDef } from "@components/organisms/EditDataTable";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { ICarrier, ICarrierTruck } from "@app/admin/interfaces/master/transportVehicle";

export interface DetailTemplateProps {
    formId: string;
    gridFormRows: GridFormRowProps[];
    submit: SubmitHandler<ICarrier>;
    onDelete: (event: React.MouseEvent<HTMLButtonElement>) => Promise<boolean>;
};

export const cols: EditDataTableColDef<ICarrierTruck>[] = [
    {
        field: 'TruckNo',
        headerName: '車番',
        width: 150,
        formControl: {
            type: 'text',
        },
    },
    {
        field: 'TelNo',
        headerName: '電話番号(ハイフンなし)',
        width: 200,
        formControl: {
            type: 'text',
        },
    },
    {
        field: 'Remark',
        headerName: '備考',
        width: 500,
        formControl: {
            type: 'text',
        },
    },
];

export const gridRows: GridFormRowProps<ICarrier>[] = [
    {
        label: '輸送業者コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierCd',
                label: '輸送業者コード',
                readOnly: true
            },
        ]
    },
    {
        label: '輸送業者名',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierName',
                label: '輸送業者名',
                required: true
            },
        ]
    },
    {
        label: '輸送業者名(カナ)',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierKana',
                label: '輸送業者名(カナ)',
                required: true
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
                readOnly: true
            },
        ]
    },
    {
        label: '登録者',
        formControls: [
            {
                type: 'text',
                name: 'InsUserName',
                label: '登録者',
                required: true,
                readOnly: true
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
                readOnly: true
            },
        ]
    },
];

export const DetailTemplate: React.FC<DetailTemplateProps> = (props) => {
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
        navigate('/master/transport-vehicle');
    };

    // 削除完了ダイアログ
    const [delCompleteDialogOpen, setDelCompleteDialogOpen] = React.useState(false);
    const handleDelCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelCompleteDialogOpen(false);
        navigate('/master/transport-vehicle');
    };

    // submit 処理
    const submit: SubmitHandler<ICarrier> = async (data: ICarrier, event?: React.BaseSyntheticEvent) => {
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
            <PageTitle text="車両詳細" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/transport-vehicle'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DangerButton onClick={handleDelConfirmDialogOpen}>削除</DangerButton>
                    <DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows ?? gridRows} columns={cols} onSubmit={handleSubmit(submit)} />
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='マスタの更新をしますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <DeleteConfirmDialog open={delConfirmDialogOpen} message='マスタの削除をしますか？' onNoButtonClick={handleDelConfirmDialogClose} onYesButtonClick={handleDelete} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='マスタを更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
            <DeleteCompleteDialog open={delCompleteDialogOpen} message='マスタを削除しました。' onCloseButtonClick={handleDelCompleteDialogClose} />
        </React.Fragment>
    );
};
