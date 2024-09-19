import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { LoadStatusKbnDisplayNames } from "@enums/LoadStatusKbn";
import { WaitingStatusTimeKbn, WaitingStatusTimeKbnDisplayNames } from "@enums/WaitingStatusTimeKbn";
import { Button } from "@components/atoms/Button";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { DetailListCard } from "@app/admin/components/organisms/DetailListCard";
import { GridRefreshButton } from "@app/admin/components/atoms/GridRefreshButton";
import { ILoading, IWarehouse } from "@app/admin/interfaces/pendingLoadingStatus/werehouseStatus";

/**
 * 表示列
 */
export const columns: GridColDef<ILoading>[] = [
    {
        field: 'id',
        headerName: '',
        width: 120,
        filterable: false,
        sortable: false,
        editable: false,
        align: 'center',
        renderCell: (params) => (
            <Link to={`/pending-loading-status/vehicles-status/${params.row.DriverId}`}><DefaultButton>詳細</DefaultButton></Link>
        ),
    },
    {
        field: 'No',
        headerName: 'No.',
        width: 80
    },
    {
        field: 'LoadStatusKbn',
        headerName: '状況',
        width: 80,
        valueFormatter: (value) => LoadStatusKbnDisplayNames[value],
    },
    {
        field: 'CarrierName',
        headerName: '輸送業者名',
        width: 150,
    },
    {
        field: 'TruckNo',
        headerName: '車番',
        width: 80
    },
    {
        field: 'EventStartDateTime',
        headerName: '倉庫到着日時',
        width: 180,
        valueFormatter: (value) => value ? moment(value).format('YYYY/MM/DD HH:mm:ss') : '',
    },
    {
        field: 'ElapsedTime',
        headerName: '経過時間',
        width: 100,
        valueFormatter: (value) => `${value}分`,
    },
    {
        field: 'WaitingStatusTimeKbn',
        headerName: '待機状況(時間)',
        width: 300,
        valueFormatter: (value) => WaitingStatusTimeKbnDisplayNames[value],
        renderCell: (params) => (
            <Typography component='span' variant={params.value === WaitingStatusTimeKbn.Ng ? 'error' : undefined}>{params.formattedValue}</Typography>
        ),
    },
];

export interface DetailTemplateProps {
    warehouse: IWarehouse;
    onRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const DetailTemplate :React.FC<DetailTemplateProps> = ({
    warehouse,
    onRefreshButtonClick,
}) => {
    return (
        <React.Fragment>
            <PageTitle text="倉庫待機状況詳細" sx={{ mb: 4 }}>
                <Link to={'/pending-loading-status/warehouse-status'}><Button color='default' variant="outlined">戻る</Button></Link>
            </PageTitle>
            <DetailListCard
                rows={warehouse.Loading as ILoading[]}
                columns={columns}
                title={warehouse.WarehouseName}
                action={<Typography variant='h6'>待機台数(目安)：<strong>{warehouse.Standby}</strong>台</Typography>}
                dataGridACtion={<GridRefreshButton onClick={onRefreshButtonClick} />}
                sx={{
                    '& .MuiCardHeader-action': {
                        margin: 0,
                    }
                }}
            />
        </React.Fragment>
    );
};
