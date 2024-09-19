import { DataGrid as CDataGrid, DataGridProps } from "@components/organisms/DataGrid";

export const DataGrid = (props: DataGridProps) => (
    <CDataGrid
        {...props}
        sx={{ ...props.sx, border: 'none' }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection={false}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableAutosize
        disableMultipleRowSelection />
)
