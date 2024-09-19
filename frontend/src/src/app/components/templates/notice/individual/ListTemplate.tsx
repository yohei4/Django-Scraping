import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { GridColDef } from "@mui/x-data-grid";
import { InvalidKbnDisplayNames, getInvalidKbnOptions } from "@enums/InvalidKbn";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { INotice, ISearchCondtion } from "@app/admin/interfaces/notice/individual";
import { FETCH_CARRIERS_MENU_ITEMS } from "@app/admin/constants/ApiUrls";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";

/**
 * 表示列
 */
export const columns: GridColDef<INotice>[] = [
    {
        field: 'id',
        headerName: '',
        width: 150,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`${params.row.DriverId}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'CarrierName',
        headerName: '輸送業者名',
        width: 200,
    },
    {
        field: 'TruckNo',
        headerName: '車番',
        width: 150
    },
    {
        field: 'InvalidKbn',
        headerName: '有効/無効',
        valueFormatter: (value) => InvalidKbnDisplayNames[value],
        width: 120
    },
    {
        field: 'Notice',
        headerName: 'お知らせ内容',
        width: 300
    },
];

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps<ISearchCondtion>[][] = [
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
    rows: readonly INotice[];
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
            <PageTitle text="個別お知らせ一覧" sx={{ mb: 4 }}>
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
