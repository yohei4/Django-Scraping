import React from "react";
import { Card, CardContent, CardHeader, SxProps, Theme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@components/organisms/DataGrid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

export interface DataGridCardProps {
    rows: readonly any[];
    columns: GridColDef[];
    dataGirdInitialState?: GridInitialStateCommunity | undefined;
    title?: React.ReactNode;
    action?: React.ReactNode;
    dataGridACtion?: React.ReactNode;
    sx?: SxProps<Theme>;
    hiddenHeader?: boolean;
    pageSizeOptions?: readonly (number | { value: number; label: string; })[] | undefined;
    checkboxSelection?: boolean;
};

export const DataGridCard: React.FC<DataGridCardProps> = (props) => {

    return (
        <Card sx={props.sx} >
            {
                props.hiddenHeader ?
                null :
                <React.Fragment>
                    <CardHeader
                        title={props.title}
                        action={props.action} />
                </React.Fragment>
            }
            <CardContent
                sx={{
                    padding: 0,
                    '&:last-child': {
                        paddingBottom: 0,
                    }
                }}
            >
                <DataGrid
                    columns={props.columns}
                    rows={props.rows}
                    initialState={props.dataGirdInitialState}
                    action={props.dataGridACtion}
                    sx={{ border: 'none' }}
                    pageSizeOptions={props.pageSizeOptions ?? [10, 25, 50, 100]}
                    checkboxSelection={props.checkboxSelection}
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    disableAutosize
                    disableMultipleRowSelection />
            </CardContent>
        </Card>
    );
};
