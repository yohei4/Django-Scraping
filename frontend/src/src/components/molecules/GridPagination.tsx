import React from "react";
import { Pagination as MuiPagenation, PaginationItem, TablePaginationProps } from "@mui/material";
import { gridPageCountSelector, useGridApiContext, useGridSelector, GridPagination as MuiGridPagination } from "@mui/x-data-grid";

function Pagination({
    page,
    onPageChange,
    className,
  }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
        <MuiPagenation
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            sx={{ 
                '& .MuiPagination-ul': {
                    flexWrap: 'nowrap'
                }
            }}
            // @ts-expect-error
            renderItem={(itemProps) => <PaginationItem {...itemProps} disableRipple />}
            onChange={(event: React.ChangeEvent<unknown>, newPage: number) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

export const GridPagination = (props: any) => {
    return (<MuiGridPagination ActionsComponent={Pagination} {...props} />);
}
