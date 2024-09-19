import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridPagination } from "./GridPagination";
import { Box } from "@mui/material";

export interface GridToolbarProps {
    action?: React.ReactNode;
}

export const GridToolbar: React.FC<GridToolbarProps> = (props: GridToolbarProps) => {
    return (
        <GridToolbarContainer>
            <Box className='Toolbar-action'>
                {props.action}
            </Box>
            <GridPagination sx={{ flexGrow: 1 }} />
        </GridToolbarContainer>
    );
}
