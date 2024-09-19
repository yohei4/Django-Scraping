import React, { useCallback } from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";
import { SubmitHandler } from "react-hook-form";

/**
 * 行の型
 */
export type Row = {
    id: number;
    carrierName: string;
    vehicleCode: string;
    warehouseName: string;
    loadingStatusKbnNm: string;
    loadingDateTime : string;
    elapsedTime: string;
    pendingStatusTimeKbnNm: string;
};

/**
 * 表示列
 */
export const columns: GridColDef<Row>[] = [
    {
        field: 'id',
        headerName: '',
        width: 120,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`${params.row.id}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'carrierName',
        headerName: '輸送業者名',
        width: 200,
    },
    {
        field: 'vehicleCode',
        headerName: '車番',
        width: 100
    },
    {
        field: 'warehouseName',
        headerName: '倉庫名',
        width: 200
    },
    {
        field: 'loadingStatusKbnNm',
        headerName: '状況',
        width: 100
    },
    {
        field: 'loadingDateTime',
        headerName: '荷役開始日時',
        width: 180
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

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps[][] = [
      [{
        type: 'async-free-solo',
        name: 'carrierName',
        label: '輸送業者名',
    }],
    [{
        type: 'text',
        name: 'vehicleCode',
        label: '車番',
    }],
    [{
      type: 'async-free-solo',
      name: 'warehouseName',
      label: '倉庫名',
    }],
    [{
        type: 'multiple-select',
        name: 'loadingStatusKbn',
        label: '状況',
        labelId: 'loadingStatusKbn',
        defaultValue: '',
        options: [
            { children: <>&#8195;</>, value: '' },
            { children: '荷役開始', value: 0 },
            { children: '積込中', value: 1 },
            { children: '待機中', value: 2 },
            { children: '完了', value: 3 },
        ]
    }],
    [{
        type: 'select',
        name: 'alertKbn',
        label: 'アラート',
        labelId: 'alertKbn',
        defaultValue: '',
        options: [
            { children: <>&#8195;</>, value: '' },
            { children: 'あり', value: 0 },
            { children: 'なし', value: 1 },
        ]
    }]
]

export interface ListTemplateProps {
    rows: readonly Row[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
    onRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const ListTemplate :React.FC<ListTemplateProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);

    return (
        <React.Fragment>
            <PageTitle text="車両待機状況一覧" sx={{ mb: 4 }}>
            </PageTitle>
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
        </React.Fragment>
    );
};
