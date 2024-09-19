import "react-router";
import * as Icons from '@mui/icons-material';

declare module 'react-router' {
    interface IndexRouteObject {
        meta?: {
            text?: string;
            icon?: keyof typeof Icons;
        }
    }
    interface NonIndexRouteObject {
        meta?: {
            text?: string;
            icon?: keyof typeof Icons;
        }
    }
}
