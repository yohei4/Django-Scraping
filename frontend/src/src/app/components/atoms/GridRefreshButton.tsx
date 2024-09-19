import { IconButton, IconButtonProps } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';

export interface GridRefreshButtonProps extends IconButtonProps {
}

export const GridRefreshButton: React.FC<GridRefreshButtonProps> = (props) => {
    return (
        <IconButton {...props}>
            <CachedIcon fontSize='large' />
        </IconButton>
    );
}