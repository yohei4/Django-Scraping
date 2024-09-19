import React, { useCallback } from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { SubmitHandler } from "react-hook-form";
import { ISearchCondtion } from '@app/admin/interfaces/report/warehouse';

/**
 * 行の型
 */
export type Row = {
    id: number;
    date: string;
    warehouseName: string;
    carrierName: string;
    vehicleCode: string;
    arrivalTime: string;
    completeTime: string;
    loadingTime: string;
    overTime: string;
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
            <DefaultButton>詳細</DefaultButton>
        ),
    },
    {
        field: 'date',
        headerName: '日付',
        width: 110
    },
    {
        field: 'warehouseName',
        headerName: '倉庫名',
        width: 200,
    },
    {
        field: 'carrierName',
        headerName: '輸送業者名',
        width: 200,
    },
    {
        field: 'vehicleCode',
        headerName: '車番',
        width: 90
    },
    {
        field: 'arrivalTime',
        headerName: '到着時間',
        width: 130
    },
    {
        field: 'completeTime',
        headerName: '完了時間',
        width: 130
    },
    {
        field: 'loadingTime',
        headerName: '荷役時間',
        width: 120
    },
    {
        field: 'overTime',
        headerName: '超過時間',
        width: 120
    },
];

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps<ISearchCondtion>[][] = [
    [
        {
            type: 'date',
            name: 'periodFrom',
            label: '期間(From)',
        },
        {
           type: 'date',
            name: 'periodTo',
            label: '期間(To)',
        },
    ],
    [{
        type: 'time',
        name: 'timeZone',
        label: '時間帯',
        format: 'HH:mm',
        views: ['hours', 'minutes']
    }],
    [{
        type: 'async-free-solo',
        name: 'warehouseName',
        label: '対象倉庫名',
    }],
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
        type: 'number',
        name: 'loadingTime',
        label: '荷役時間',
        endAdornmentInner: '分以上',
        sx: { width: '200px' }
    }],
];

export interface ListTemplateProps {
    rows: readonly Row[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
};

export const ListTemplate :React.FC<ListTemplateProps> = (props) => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);

    return (
        <React.Fragment>
            <PageTitle text="倉庫別荷役時間" sx={{ mb: 4 }}>
                <DefaultButton>CSV出力</DefaultButton>
            </PageTitle>
            <SearchListCard
                dialogOpen={open}
                rows={props.rows}
                columns={columns}
                formControls={props.formControls}
                handleOpen={handleOpen}
                handleClose={handleClose}
                submit={props.submit}
            />
        </React.Fragment>
    );
};
