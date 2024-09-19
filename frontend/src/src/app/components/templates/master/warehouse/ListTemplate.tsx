import React, { useCallback } from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { ISearchCondtion, IWarehouse } from "@app/admin/interfaces/master/warehouse";
import { SubmitHandler } from "react-hook-form";
import { getInvalidKbnOptions, InvalidKbnDisplayNames } from "@enums/InvalidKbn";
import { FETCH_WAREHOUSES_MENU_ITEMS } from "@app/admin/constants/ApiUrls";

export const columns: GridColDef<IWarehouse>[] = [
    { 
        field: 'id',
        headerName: '',
        width: 150,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`detail/${params.row.WarehouseCd}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'SortOrder',
        headerName: '表示順',
        width: 100,
        sortable: true,
    },
    {
        field: 'WarehouseCd',
        headerName: '倉庫コード',
        width: 150,
    },
    {
        field: 'WarehouseName',
        headerName: '倉庫名',
        width: 200,
    },
    {
        field: 'WarehouseAbbr',
        headerName: '倉庫名(略)',
        width: 200
    },
    {
        field: 'LoadingTime',
        headerName: '積込想定時間',
        width: 150,
        valueFormatter: (value) => `${value}分`,
    },
    {
        field: 'AlertWaitNum',
        headerName: 'アラート待機台数',
        width: 150,
        valueFormatter: (value) => `${value}台`,
    },
    {
        field: 'DefaultLiftman',
        headerName: '初期配置人数',
        width: 150,
        valueFormatter: (value) => `${value}人`,
    },
    {
        field: 'InvalidKbn',
        headerName: '有効/無効',
        width: 120,
        valueFormatter: (value) => InvalidKbnDisplayNames[value],
    },
];

export const formControls: DynamicFormControlProps<ISearchCondtion>[][] = [
    [{
        type: 'text',
        name: 'WarehouseCd',
        label: '倉庫コード',
    }],
    [{
        type: 'async-free-solo',
        name: 'WarehouseName',
        label: '倉庫名',
        url: FETCH_WAREHOUSES_MENU_ITEMS,
    }],
    [{
        type: 'text',
        name: 'WarehouseAbbr',
        label: '倉庫名(略)',
    }],
    [{
        type: 'select',
        name: 'InvalidKbn',
        label: '有効/無効',
        labelId: 'InvalidKbn',
        defaultValue: '',
        options: [{ value: '', children: <>&#8195;</> }, ...getInvalidKbnOptions()],
    }]
]

export interface ListTemplateProps {
    rows: readonly IWarehouse[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
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
            <PageTitle text="倉庫一覧" sx={{ mb: 4 }}>
                <Link to={'add'}><DefaultButton>新規追加</DefaultButton></Link>
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
