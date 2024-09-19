import React from "react";
import { SubmitHandler } from "react-hook-form";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";
import { getStowageStatusKbnOptions, StowageStatusKbn, StowageStatusKbnDisplayNames } from "@enums/StowageStatusKbn";
import { ISearchCondtion } from "@app/admin/interfaces/loadingStatus";
import { FETCH_CARRIERS_MENU_ITEMS } from "@app/admin/constants/ApiUrls";
import { IStowage } from "@app/admin/interfaces/loadingStatus";
import { Box } from "@mui/material";
import { LoadingStatusDataGridfilter, LoadingStatusDataGridfilterOperator } from "../organisms/LoadingStatusDataGridfilter";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DangerButton } from "@components/atoms/DangerButton";
import { UpdateFormDialog } from "@components/organisms/UpdateFormDialog";
import { DeleteFormDialog } from "@components/organisms/DeleteFormDialog";

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps<ISearchCondtion>[][] = [
    [{
        type: 'select',
        name: 'StowageStatusKbn',
        label: '状況',
        labelId: 'StowageStatusKbn',
        options: [{ value: '', children: <>&#8195;</> }, ...getStowageStatusKbnOptions()],
    }],
    [
        {
            type: 'text',
            name: 'CarrierCd',
            label: '輸送業者コード',
        },
    ],
    [{
        type: 'async-free-solo',
        name: 'CarrierName',
        label: '輸送業者名',
        url: FETCH_CARRIERS_MENU_ITEMS,
    }],
    [{
        type: 'text',
        name: 'TruckNo',
        label: '車番',
    }],
]

export interface LoadingStatusTemplateProps {
    rows: readonly IStowage[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
    completionNoticeSubmit: SubmitHandler<any>;
    receptionDeleteSubmit: SubmitHandler<any>;
    onRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const LoadingStatusTemplate :React.FC<LoadingStatusTemplateProps> = (props) => {
    const [selectedRow, setSelectedRow] = React.useState<IStowage>();

    // 検索ダイアログ
    const [open, setOpen] = React.useState(false);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    };

    // 完成連絡
    const [noticeDialogOpen, setNoticeDialogOpen] = React.useState<boolean>(false);
    const handleNoticeDialogOpen = (event: React.MouseEvent<HTMLButtonElement>, row: IStowage) => {
        setSelectedRow(row);
        setNoticeDialogOpen(true);
    };
    const handleNoticeDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNoticeDialogOpen(false);
    };

    // 受付削除
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
    const handleDeleteDialogOpen = (event: React.MouseEvent<HTMLButtonElement>, row: IStowage) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };
    const handleDeleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDeleteDialogOpen(false);
    };

    /**
     * 表示列
     */
    const columns: GridColDef<IStowage>[] = [
        {
            field: 'complete',
            headerName: '',
            width: 120,
            filterable: false,
            sortable: false,
            editable: false,
            align: 'center',
            renderCell: (params) => (
                <DefaultButton
                    onClick={(event) => handleNoticeDialogOpen(event, params.row)}
                    disabled={params.row.StowageStatusKbn === StowageStatusKbn.Complete}
                >
                    完成連絡
                </DefaultButton>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 120,
            filterable: false,
            sortable: false,
            editable: false,
            align: 'center',
            renderCell: (params) => (
                <DangerButton
                    onClick={(event) => handleDeleteDialogOpen(event, params.row)}
                    disabled={params.row.StowageStatusKbn === StowageStatusKbn.Complete}
                >
                    受付削除
                </DangerButton>
            ),
        },
        {
            field: 'StowageStatusKbn',
            headerName: '状況',
            width: 100,
            valueFormatter: (value) => StowageStatusKbnDisplayNames[value],
            filterOperators: LoadingStatusDataGridfilterOperator
        },
        {
            field: 'StartDateTime',
            headerName: '受付日時',
            width: 180,
            valueFormatter: (value) => value ? moment(value).format('YYYY/MM/DD HH:mm:ss') : '',
        },
        {
            field: 'CompleteDateTime',
            headerName: '完成日時',
            width: 180,
            valueFormatter: (value) => value ? moment(value).format('YYYY/MM/DD HH:mm:ss') : '',
        },
        {
            field: 'CarrierName',
            headerName: '輸送業者名',
            width: 250,
        },
        {
            field: 'TruckNo',
            headerName: '車番',
            width: 150
        },
    ];

    return (
        <React.Fragment>
            <PageTitle text="積付表受渡状況一覧" sx={{ mb: 4 }}>
            </PageTitle>
            <SearchListCard
                dialogOpen={open}
                rows={props.rows}
                columns={columns}
                formControls={props.formControls}
                dataGridACtion={
                    <Box
                        sx={(theme) => ({
                            display: 'flex',
                            gap: theme.spacing(0, 1),
                        })}
                    >
                        <GridRefreshButton onClick={props.onRefreshButtonClick} />
                        <LoadingStatusDataGridfilter allChecked={true} />
                    </Box>
                }
                handleOpen={handleOpen}
                handleClose={handleClose}
                submit={props.submit}
            />
            <UpdateFormDialog
                open={noticeDialogOpen}
                dialogTitle={'連絡確認'}
                subTitle={selectedRow?.CarrierName}
                message='ドライバーへ積付表の完成を連絡しますか？'
                formId={`form_cell_completion_notice_${selectedRow?.id}`}
                completeTitle='連絡完了'
                completeMessage='ドライバーへ積付表の完成を連絡しました。'
                defaultValues={selectedRow}
                submit={props.completionNoticeSubmit}
                onClose={handleNoticeDialogClose}
                onNoButtonClick={handleNoticeDialogClose}
                onCloseButtonClick={handleNoticeDialogClose}
            />
            <DeleteFormDialog
                open={deleteDialogOpen}
                dialogTitle={'削除確認'}
                subTitle={selectedRow?.CarrierName}
                message='ドライバーからの受付を削除しますか？'
                formId={`form_cell_completion_notice_${selectedRow?.id}`}
                completeTitle='削除完了'
                completeMessage='ドライバーからの受付を削除しました。'
                defaultValues={selectedRow}
                submit={props.receptionDeleteSubmit}
                onClose={handleDeleteDialogClose}
                onNoButtonClick={handleDeleteDialogClose}
                onCloseButtonClick={handleDeleteDialogClose}
            />
        </React.Fragment>
    );
};
