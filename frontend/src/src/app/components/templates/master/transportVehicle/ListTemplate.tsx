import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { GridColDef } from "@mui/x-data-grid";
import { getInvalidKbnOptions, InvalidKbnDisplayNames } from "@enums/InvalidKbn";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { ICarrierTruck, ISearchCondtion } from '@app/admin/interfaces/master/transportVehicle';
import { FETCH_CARRIERS_MENU_ITEMS } from "@app/admin/constants/ApiUrls";

/**
 * 表示列
 */
export const columns: GridColDef<ICarrierTruck>[] = [
    {
        field: 'id',
        headerName: '',
        width: 150,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`detail/${params.row.CarrierCd}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'CarrierCd',
        headerName: '輸送業者コード',
        width: 150,
    },
    {
        field: 'CarrierName',
        headerName: '輸送業者名',
        width: 200,
    },
    {
        field: 'CarrierKana',
        headerName: '輸送業者名(カナ)',
        width: 200
    },
    {
        field: 'TruckNo',
        headerName: '車番',
        width: 150
    },
    {
        field: 'TelNo',
        headerName: '電話番号',
        width: 150
    },
    {
        field: 'Remark',
        headerName: '備考',
        width: 150
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
        name: 'CarrierCd',
        label: '輸送業者コード',
    }],
    [{
        type: 'async-free-solo',
        name: 'CarrierName',
        label: '輸送業者名',
        url: FETCH_CARRIERS_MENU_ITEMS,
    }],
    [{
        type: 'text',
        name: 'CarrierKana',
        label: '輸送業者名(カナ)',
    }],
    [{
        type: 'text',
        name: 'TruckNo',
        label: '車番',
    }],
    [{
        type: 'text',
        name: 'TelNo',
        label: '電話番号',
    }],
    [{
        type: 'text',
        name: 'Remark',
        label: '備考',
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
    rows: readonly ICarrierTruck[];
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
            <PageTitle text="車両一覧" sx={{ mb: 4 }}>
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
