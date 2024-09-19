import React from "react";
import { Box } from "@mui/material";
import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import { GridPagination } from "@components/molecules/GridPagination";
import { GridToolbar } from "@components/molecules/GridToolbar";

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        action?: React.ReactNode;
    }
}

export interface DataGridProps extends MuiDataGridProps {
    action?: React.ReactNode;
}

export const DataGrid = (props: DataGridProps) => {

    const [paginationModel, setPaginationModel] = React.useState(props.paginationModel ?? {
        pageSize: 5,
        page: 0,
    });
  
    return (
        <MuiDataGrid
            {...props}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
            pagination={undefined}
            slots={{
                toolbar: GridToolbar,
                pagination: GridPagination,
            }}
            slotProps={{
                toolbar: { action: props.action },
            }}
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
    );
  }