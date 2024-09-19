import React, { EventHandler, MouseEventHandler, useState } from "react";
import { DataGrid, DataGridProps, GridFooter, GridFooterContainer, GridRenderCellParams, GridRenderEditCellParams, GridRowId, GridTreeNodeWithRender, GridValidRowModel, useGridApiRef } from "@mui/x-data-grid";
import { GridBaseColDef, GridSlotsComponentsProps } from "@mui/x-data-grid/internals";
import { DynamicFormControl, DynamicFormControlProps } from "./DynamicFormControl";
import { Box, Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import { DangerButton } from "@components/atoms/DangerButton";

export type EditGridColDef<R extends GridValidRowModel = any, V = any, F = V> = GridBaseColDef<R, V, F> & {
    formControl?: DynamicFormControlProps;
    renderCell?: (params: EditGridCellParams<R, V, F>) => React.ReactNode,
    renderEditCell?: (params: EditGridRenderEditCellParams<R, V, F>) => React.ReactNode,
}

export type EditGridCellParams<R extends GridValidRowModel = any, V = any, F = V, N extends GridTreeNodeWithRender = GridTreeNodeWithRender> = GridRenderCellParams<R, V, F, N> & {
    colDef: EditGridColDef;
}

export type EditGridRenderEditCellParams<R extends GridValidRowModel = any, V = any, F = V, N extends GridTreeNodeWithRender = GridTreeNodeWithRender> = GridRenderEditCellParams<R, V, F, N> & {
    colDef: EditGridColDef;
}

export interface EditDataGridProps<R extends GridValidRowModel = any> extends DataGridProps<R> {
    name: string;
    columns: readonly EditGridColDef<R>[];
}

declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
      onAppendRowClick?: MouseEventHandler<HTMLButtonElement>;
      onDeleteRowClick?: MouseEventHandler<HTMLButtonElement>;
    }
}

const A = (props: NonNullable<GridSlotsComponentsProps['footer']>) => {
    return (
        <GridFooterContainer>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onAppendRowClick}
                >
                    add
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onDeleteRowClick}
                >
                    delete
                </Button>
            </Box>
        </GridFooterContainer>
      );
}

export const EditDataGrid = (props: EditDataGridProps) => {
    const control = useFormContext();
    const apiRef = useGridApiRef();

    const { fields, append, remove, update } = useFieldArray({
        control: control.control,
        name: props.name,
    });

    const handleAppendRow = () => {
        append({});
    }

    const handleDeleteRow = () => {
        apiRef.current.getSelectedRows().forEach((row, key) => {
            remove(fields.findIndex(x => x.id === key));
            apiRef.current.updateRows([{ id: key, _action: 'delete' }]);
        });
    }

    // const handleDeleteRow = (event: React.MouseEvent<HTMLButtonElement>, params: GridRenderCellParams) => {
    //     event.stopPropagation();
    //     remove(params.api.getAllRowIds().findIndex(x => x === params.id));
    //     params.api.updateRows([{ id: params.id, _action: 'delete' }]);
    //     console.log(params.api.getAllRowIds());
    // }

    // 列の設定
    const columns: EditGridColDef<any, any, any>[] = [
        // {
        //     field: 'delete',
        //     headerName: '',
        //     width: 80,
        //     align: 'center',
        //     renderCell: (params) => (
        //         <DangerButton aria-label="delete" onClick={(event) => { handleDeleteRow(event, params) }} sx={{ minWidth: 'auto' }}>
        //             <DeleteIcon />
        //         </DangerButton>
        //     ),
        // },
        ...props.columns.map(col => {
            return {
                renderCell: (params: EditGridCellParams) => (
                    params.colDef.formControl ?
                    <Box className="FormControl-wrapper">
                        <DynamicFormControl
                            {...params.colDef.formControl}
                            name={`${props.name}.${fields.indexOf(params.row)}.${params.field}`}
                        />
                    </Box> :
                    params.value
                ),
                ...col,
            };
        })
    ];

    return (
        <DataGrid
            {...props}
            apiRef={apiRef}
            className="EditDataGrid-root"
            rows={fields.map(x => x)}
            columns={columns}
            hideFooterPagination
            hideFooterSelectedRowCount
            disableColumnFilter
            disableColumnMenu
            disableColumnSorting
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            checkboxSelection
            rowHeight={70}
            sx={{
                '& .FormControl-wrapper': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                },
                '& .MuiDataGrid-cell': {
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:focus-within': {
                        outline: 'none',
                    },
                },
                ...props.sx,
            }}
            slots={{
                footer: A,
            }}
            slotProps={{
                footer: { onAppendRowClick: handleAppendRow, onDeleteRowClick: handleDeleteRow }
            }}
        />
    );
};