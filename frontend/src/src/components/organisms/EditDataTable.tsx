import { GridValidRowModel } from "@mui/x-data-grid";
import { GridBaseColDef } from "@mui/x-data-grid/internals";
import { DynamicFormControl, DynamicFormControlProps } from "./DynamicFormControl";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableProps, TableRow, Toolbar } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FieldError, FieldErrorsImpl, Merge, useFieldArray, useFormContext } from "react-hook-form";
import { DangerButton } from "@components/atoms/DangerButton";
import { DefaultButton } from "@components/atoms/DefaultButton";

export type EditDataTableColDef<R extends GridValidRowModel = any, V = any, F = V> = GridBaseColDef<R, V, F> & {
    formControl?: DynamicFormControlProps<R>;
}

export interface EditDataTableProps<R extends GridValidRowModel = any> extends TableProps {
    name: string;
    headerClassName?: string;
    columns: readonly EditDataTableColDef<R>[];
}

export const EditDataTable = (props: EditDataTableProps) => {
    const control = useFormContext();
    const errors = control.formState.errors[props.name] as any[] | undefined;

     const { fields, append, remove } = useFieldArray({
        control: control.control,
        name: props.name,
    });

    const defaultValues = Object.fromEntries(
        Object.keys(fields[0]).map((key) => [key, '']),
    );

    const handleAppendRow = () => {
        append(defaultValues);
    };

    const handleDeleteRow = (index: number) => {
        remove(index);
        if (fields.length <= 1) {
            append(defaultValues);
        }
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderWidth: '1px',
                borderColor: 'rgba(224, 224, 224, 1)',
                borderStyle: 'solid',
                boxShadow: 'none',
                ...props.sx
            }}
        >
            <Table
                sx={(theme) => ({
                    tableLayout: 'fixed',
                    '& .MuiTableCell-root': {
                        '& .MuiTableCell-root': {
                            padding: theme.spacing(2),
                        }
                    }
                })}
            >
                <TableHead>
                    <TableRow>
                        <TableCell 
                            width={'90px'}
                            align="center"
                            sx={{
                                minWidth: `90px`,
                                maxWidth: `90px`,
                                width: `90px`,
                            }}
                        />
                        <TableCell
                            width={'50px'}
                            align="right"
                            sx={{
                                minWidth: `50px`,
                                maxWidth: `50px`,
                                width: `50px`,
                            }}>
                            No.
                        </TableCell>
                        {
                            props.columns.map((col, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        className={col.headerClassName as string}
                                        width={`${col.width}px`}
                                        sx={{
                                            minWidth: `${col.width}px`,
                                            maxWidth: `${col.width}px`,
                                            width: `${col.width}px`,
                                        }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                );
                            })
                        }
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map((field, fieldIndex) => (
                        <TableRow
                            key={field.id}
                        >
                            <TableCell align="center">
                                <DangerButton aria-label="delete" sx={{ minWidth: 'auto' }} onClick={() => {handleDeleteRow(fieldIndex)}}>
                                    <DeleteIcon />
                                </DangerButton>
                            </TableCell>
                            <TableCell
                                width={'50px'}
                                align="right"
                                sx={{
                                    minWidth: `50px`,
                                    maxWidth: `50px`,
                                    width: `50px`,
                                }}>
                                {fieldIndex + 1}
                            </TableCell>
                            {
                                props.columns.map((col, index) => {
                                    const error = errors ? (errors[fieldIndex] ? errors[fieldIndex][col.field] : undefined) : undefined;
                                    return (
                                        <TableCell
                                            key={index}
                                            className={col.headerClassName as string}
                                            width={`${col.width}px`}
                                            sx={{
                                                minWidth: `${col.width}px`,
                                                maxWidth: `${col.width}px`,
                                                width: `${col.width}px`,
                                            }}
                                        >
                                            {
                                                col.formControl ?
                                                <DynamicFormControl
                                                    {...col.formControl}
                                                    name={`${props.name}.${fieldIndex}.${col.field}`}
                                                    error={error ? true : false} /> :
                                                (field as any)[col.field]
                                            }
                                        </TableCell>
                                    );
                                })
                            }
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Toolbar component='td'>
                            <Box>
                                <DefaultButton startIconName='AddCircleOutline' sx={{ width: 'max-content' }} onClick={handleAppendRow}>行追加</DefaultButton>
                            </Box>
                        </Toolbar>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    ); 
}