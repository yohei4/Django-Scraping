import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { GridColDef } from "@mui/x-data-grid";
import { getWaitingStatusTruckKbnOptions, WaitingStatusTruckKbn, WaitingStatusTruckKbnDisplayNames } from "@enums/WaitingStatusTruckKbn";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";
import { IWarehouse } from "@app/admin/interfaces/pendingLoadingStatus/werehouseStatus";
import { UpdateFormDialog } from "@components/organisms/UpdateFormDialog";
import { FETCH_WAREHOUSES_MENU_ITEMS } from "@app/admin/constants/ApiUrls";
import { Typography } from "@mui/material";

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps<IWarehouse>[][] = [
      [{
        type: 'async-free-solo',
        name: 'WarehouseName',
        label: '倉庫名',
        url: FETCH_WAREHOUSES_MENU_ITEMS,
    }],
    [{
        type: 'select',
        name: 'WaitingStatusTruckKbn',
        label: '待機状況(車両)',
        labelId: 'WaitingStatusTruckKbn',
        defaultValue: '',
        options: [{ value: '', children: <>&#8195;</> }, ...getWaitingStatusTruckKbnOptions()],
    }]
]

const dialogFormControls: DynamicFormControlProps<IWarehouse>[][] = [
    [
        {
            type: 'number',
            name: 'Liftman',
            label: '配置人数',
            required: true,
            endAdornmentInner: '人',
            sx: { width: '150px' }
        },
    ],
];

export interface ListTemplateProps {
    rows: readonly IWarehouse[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
    numberChangeSubmit: SubmitHandler<any>;
    onRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ListTemplate :React.FC<ListTemplateProps> = (props) => {
    const [selectedRow, setSelectedRow] = React.useState<IWarehouse>();

    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);

    // 人数変更
    const [numberChangeDialogOpen, setNumberChangeDialogOpen] = React.useState<boolean>(false);
    const handleNumberChangeDialogOpen = (event: React.MouseEvent<HTMLButtonElement>, row: IWarehouse) => {
        setSelectedRow(row);
        setNumberChangeDialogOpen(true);
    };
    const handleNumberChangeDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNumberChangeDialogOpen(false);
    };

    /**
     * 表示列
     */
    const columns: GridColDef<IWarehouse>[] = [
        {
            field: 'id',
            headerName: '',
            width: 120,
            filterable: false,
            sortable: false,
            editable: false,
            align: 'center',
            renderCell: (params) => (
                <Link to={`${params.row.WarehouseCd}`}><DefaultButton>詳細</DefaultButton></Link>
            ),
        },
        {
            field: 'countChange',
            headerName: '',
            width: 120,
            filterable: false,
            sortable: false,
            editable: false,
            align: 'center',
            renderCell: (params) => (
                <DefaultButton onClick={(event) => handleNumberChangeDialogOpen(event, params.row)}>人数変更</DefaultButton>
            ),
        },
        {
            field: 'WarehouseName',
            headerName: '倉庫名',
            width: 150,
        },
        {
            field: 'DefaultLiftman',
            headerName: '初期配置人数',
            width: 120,
            valueFormatter: (value) => `${value}人`,
        },
        {
            field: 'Liftman',
            headerName: '配置人数',
            width: 80,
            valueFormatter: (value) => `${value}人`,
        },
        {
            field: 'Loading',
            headerName: '積込中台数',
            width: 100,
            valueFormatter: (value) => `${value}台`,
        },
        {
            field: 'Standby',
            headerName: '待機台数(目安)',
            width: 120,
            valueFormatter: (value) => `${value}台`,
        },
        {
            field: 'WaitingStatusTruckKbn',
            headerName: '待機状況(車両)',
            width: 300,
            valueFormatter: (value) => WaitingStatusTruckKbnDisplayNames[value],
            renderCell: (params) => (
                <Typography component='span' variant={params.value === WaitingStatusTruckKbn.Ng ? 'error' : undefined}>{params.formattedValue}</Typography>
            ),
        },
    ];

    return (
        <React.Fragment>
            <PageTitle text="倉庫待機状況一覧" sx={{ mb: 4 }} />
            <SearchListCard
                dialogOpen={open}
                rows={props.rows}
                columns={columns}
                formControls={props.formControls}
                dataGridACtion={<GridRefreshButton onClick={props.onRefreshButtonClick} />}
                handleOpen={handleOpen}
                handleClose={handleClose}
                submit={props.submit}
            />
            <UpdateFormDialog
                open={numberChangeDialogOpen}
                dialogTitle={'更新確認'}
                subTitle={selectedRow?.WarehouseName}
                message='配置人数を更新しますか？'
                formId={`form_cell_number_change_${selectedRow?.id}`}
                formControls={dialogFormControls}
                completeTitle='更新完了'
                completeMessage='配置人数を更新しました。'
                defaultValues={selectedRow}
                submit={props.numberChangeSubmit}
                onClose={handleNumberChangeDialogClose}
                onNoButtonClick={handleNumberChangeDialogClose}
                onCloseButtonClick={handleNumberChangeDialogClose}
            />
        </React.Fragment>
    );
};
