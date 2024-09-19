import React, { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/material";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { Button } from "@components/atoms/Button";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { GridColDef } from "@mui/x-data-grid";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { getPriorityKbnOptions } from "@enums/PriorityKbn";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";
import { DetailListCard } from "@app/admin/components/organisms/DetailListCard";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";
import { BulkCompletionDialog } from "@app/admin/components/organisms/BulkCompletionDialog";
import { SubmitHandler } from "react-hook-form";

/**
 * 行の型
 */
export type Row = {
    id: number;
    warehouseName: string;
    loadingStatusKbnNm: string;
    arrivalDateTime: string;
    completeDateTime: string;
    elapsedTime: string;
    pendingStatusTimeKbnNm: string;
};

/**
 * 表示列
 */
export const columns: GridColDef<Row>[] = [
    {
        field: 'warehouseName',
        headerName: '倉庫名',
        width: 200
    },
    {
        field: 'loadingStatusKbnNm',
        headerName: '積込状況',
        width: 100
    },
    {
        field: 'arrivalDateTime',
        headerName: '倉庫到着日時',
        width: 180
    },
    {
        field: 'completeDateTime',
        headerName: '積込完了日時',
        width: 180,
    },
    {
        field: 'elapsedTime',
        headerName: '経過時間',
        width: 100,
    },
    {
        field: 'pendingStatusTimeKbnNm',
        headerName: '待機状況(時間)',
        width: 300,
    },
];

export const gridRows: GridFormRowProps[] = [
    {
        label: '有効/無効',
        formControls: [
            {
                type: 'radio',
                name: 'isValid',
                defaultValue: 1,
                required: true,
                options: getInvalidKbnOptions().reverse(),
            },
        ]
    },
    {
        label: '重要度',
        formControls: [
            {
                type: 'radio',
                name: 'importanceKbn',
                defaultValue: 1,
                required: true,
                options: getPriorityKbnOptions().reverse(),
            },
        ]
    },
    {
        label: 'お知らせ内容',
        required: true,
        formControls: [
            {
                type: 'textarea',
                name: 'noticeContents',
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
                name: 'updDateTime',
                label: '更新日時',
                readOnly: true,
            },
        ]
    },
    {
        label: '最終更新者',
        formControls: [
            {
                type: 'text',
                name: 'updContactPersonName',
                label: '最終更新者',
                readOnly: true,
            },
        ]
    },
];

export interface DetailTemplateProps {
    formId: string;
    gridFormRows?: GridFormRowProps[];
    rows: readonly Row[];
    onSubmit: React.FormEventHandler<HTMLDivElement | HTMLFormElement>;
    bulkComletionSubmit: SubmitHandler<any>; // TODO: interfaceを設定
    onRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const DetailTemplate :React.FC<DetailTemplateProps> = (props) => {
    const navigate = useNavigate();

    // 一括完了
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);


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
        navigate('/pending-loading-status/vehicles-status');
    };

    // submit 処理
    const handleSubmit = (event: React.FormEvent<HTMLDivElement | HTMLFormElement>) => {
        if(props.onSubmit) props.onSubmit(event);
        setUpdConfirmDialogOpen(false);
        setUpdCompleteDialogOpen(true);
    }

    return (
        <React.Fragment>
            <PageTitle text="車両待機状況詳細" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/pending-loading-status/vehicles-status'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DefaultButton onClick={handleOpen}>一括完了</DefaultButton>
                </Box>
            </PageTitle>
            <DetailListCard
                rows={props.rows}
                columns={columns}
                title='○○○輸送 / XXXXX' // TODO: 倉庫名は取得したデータを表示する
                dataGridACtion={<GridRefreshButton onClick={props.onRefreshButtonClick} />}
                sx={{
                    '& .MuiCardHeader-action': {
                        margin: 0,
                    }
                }}
            />
            <br />
            <FormCard
                formId={props.formId} 
                gridFormRows={props.gridFormRows ?? gridRows}
                onSubmit={handleSubmit}
                headerActions={<DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>}
            />
            <BulkCompletionDialog open={open} onClose={handleClose} submit={props.bulkComletionSubmit} />
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='お知らせを更新しますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='お知らせを更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
        </React.Fragment>
    );
};
