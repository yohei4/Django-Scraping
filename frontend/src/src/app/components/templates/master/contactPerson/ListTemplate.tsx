import React, { useCallback } from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { ISearchCondtion } from "@app/admin/interfaces/master/contactPerson";
import { SubmitHandler } from "react-hook-form";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { getInvalidKbnOptions, InvalidKbnDisplayNames } from "@enums/InvalidKbn";
import { getFuncAuthGKbnOptions } from "@enums/FuncAuthGKbn";
import { FETCH_CARRIERS_MENU_ITEMS } from "@app/admin/constants/ApiUrls";

/**
 * 表示列
 */
export const columns: GridColDef<IUser>[] = [
    { 
        field: 'id',
        headerName: '',
        width: 150,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`detail/${params.row.UserCd}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'UserCd',
        headerName: '担当者コード',
        width: 150,
    },
    {
        field: 'UserName',
        headerName: '担当者名',
        width: 200,
    },
    {
        field: 'UserKana',
        headerName: '担当者名(カナ)',
        width: 200
    },
    {
        field: 'KinoAuthGroupNm',
        headerName: '権限',
        width: 150
    },
    {
        field: 'CarrierName',
        headerName: '輸送業者名',
        width: 250
    },
    {
        field: 'InvalidKbn',
        headerName: '有効/無効',
        width: 120,
        valueFormatter: (value) => InvalidKbnDisplayNames[value],
    },
];

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps<ISearchCondtion>[][] = [
    [{
        type: 'text',
        name: 'UserCd',
        label: '担当者コード',
    }],
    [{
        type: 'text',
        name: 'UserName',
        label: '担当者名',
    }],
    [{
        type: 'text',
        name: 'UserKana',
        label: '担当者名(カナ)',
    }],
    [{
        type: 'multiple-select',
        name: 'KinoAuthGroupNos',
        label: '権限',
        labelId: 'KinoAuthGroupNos',
        options: getFuncAuthGKbnOptions(),
    }],
    [{
        type: 'async-free-solo',
        name: 'CarrierName',
        label: '輸送業者名',
        url: FETCH_CARRIERS_MENU_ITEMS,
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

/**
 * 初期ソートモデル
 */
export const initSortModel: GridSortModel = [
    { field: 'nameKana', sort: 'asc' }
];

export interface ListTemplateProps<T extends { [key: string]: any } | undefined = any> {
    rows: readonly IUser[];
    formControls: DynamicFormControlProps<T>[][];
    submit: SubmitHandler<any>;
};

export const ListTemplate = <T extends { [key: string]: any } | undefined = any>(props: ListTemplateProps<T>) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);

    return (
        <React.Fragment>
            <PageTitle text="担当者一覧" sx={{ mb: 4 }}>
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
