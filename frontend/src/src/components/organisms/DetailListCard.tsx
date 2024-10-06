import React from "react";
import { Card, CardContent, CardHeader, Divider, SxProps } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@components/organisms/DataGrid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

export interface DetailListCardProps {
    rows: readonly any[];
    columns: GridColDef[];
    dataGirdInitialState?: GridInitialStateCommunity | undefined;
    title?: React.ReactNode;
    action?: React.ReactNode;
    dataGridACtion?: React.ReactNode;
    sx?: SxProps;
};

export const DetailListCard: React.FC<DetailListCardProps> = (props) => {

    return (
        <Card
            sx={{
                ...props.sx,
            }}
            >
            <CardHeader
                title={props.title}
                action={props.action} />
            <Divider />
            <CardContent
                sx={{
                    padding: 0,
                    '&:last-child': {
                        paddingBottom: 0,
                    }
                }}
            >
                <DataGrid
                    sx={{ border: 'none' }}
                    columns={props.columns}
                    rows={props.rows}
                    initialState={props.dataGirdInitialState}
                    action={props.dataGridACtion}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection={false}
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    disableAutosize
                    disableMultipleRowSelection
                />
            </CardContent>
        </Card>
    );
};