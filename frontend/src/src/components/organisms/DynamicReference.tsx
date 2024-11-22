import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { EditDataTable, EditDataTableColDef } from "@components/organisms/EditDataTable";
import { GridReferenceRow, GridReferenceRowProps } from "./GridReferenceRow";

export interface DynamicReferenceProps<T extends { [key: string]: any } | undefined = any> {
    gridReferenceRows: GridReferenceRowProps<T>[];
    referenceColumns?: readonly EditDataTableColDef[];
};

export const DynamicReference = <T extends { [key: string]: any } | undefined = any>(props: DynamicReferenceProps<T>) => {
    const control = useFormContext();
    // const values = control.getValues();

    return (
        <Box>
            <Grid container rowSpacing={2.5} columnSpacing={2}>
                {
                    props.gridReferenceRows.map((rowProps, index) => (
                        <GridReferenceRow key={index} {...rowProps} />
                    ))
                }
            </Grid>
            {
                // TODO: 参照用のデータテーブルを作成する ※現状必要そうな画面がないため、保留
                // Object.entries(values).map(([key, value], index) => {
                //     if (Array.isArray(value) && props.columns) {
                //         return(
                //             <EditDataTable
                //                 key={index}
                //                 name={key}
                //                 columns={props.columns}
                //                 sx={{marginTop: '24px'}}
                //             />
                //         );
                //     }
                // })
            }
        </Box>
    );
};
