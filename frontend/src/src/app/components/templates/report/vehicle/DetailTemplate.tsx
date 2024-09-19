import React, { useCallback } from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { Box } from "@mui/material";
import { Button } from "@components/atoms/Button";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { SearchListCard } from "@app/admin/components/organisms/SearchListCard";
import { SubmitHandler } from "react-hook-form";

/**
 * 行の型
 */
export type Row = {
    id: number;
    date: string;
    carrierName: string;
    vehicleCode: string;
    event : string;
    startTime: string;
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
            <DefaultButton>編集</DefaultButton>
        ),
    },
    {
        field: 'date',
        headerName: '日付',
        width: 120
    },
    {
        field: 'carrierName',
        headerName: '輸送業者名',
        width: 200,
    },
    {
        field: 'vehicleCode',
        headerName: '車番',
        width: 80
    },
    {
        field: 'event',
        headerName: 'イベント',
        width: 180
    },
    {
        field: 'startTime',
        headerName: '開始時間',
        width: 100
    },
    {
        field: 'completeTime',
        headerName: '完了時間',
        width: 100,
    },
    {
        field: 'loadingTime',
        headerName: '荷役時間',
        width: 100
    },
    {
        field: 'overTime',
        headerName: '超過時間',
        width: 100,
    },
];

/**
 * 検索条件
 */
export const formControls: DynamicFormControlProps[][] = [
]

export interface DetailTemplateProps {
    rows: readonly Row[];
    formControls: DynamicFormControlProps[][];
    submit: SubmitHandler<any>;
};

export const DetailTemplate :React.FC<DetailTemplateProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }, [open]);
    const handleClose = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    }, [open]);

    return (
        <React.Fragment>
            <PageTitle text="車両別荷役時間詳細" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/report/vehicle'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DefaultButton>CSV出力</DefaultButton>
                </Box>
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
