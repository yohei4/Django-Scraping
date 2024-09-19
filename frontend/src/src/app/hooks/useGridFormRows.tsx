import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import React, { useCallback, useState } from "react";

type UseGridFormRowsResult<T extends { [key: string]: any } | undefined = any> = {
    gridFormRows: GridFormRowProps<T>[];
    setGridFormRows: React.Dispatch<React.SetStateAction<GridFormRowProps<T>[]>>;
    setProperty: <K extends keyof GridFormRowProps<T>>(propName: K, value?: K extends keyof GridFormRowProps<T> ? GridFormRowProps<T>[K] : never, condition?: (item: GridFormRowProps<T>) => boolean) => void;
    setFormControlProperty: <K extends keyof DynamicFormControlProps<T>>(propName: K, value?: K extends keyof DynamicFormControlProps<T> ? DynamicFormControlProps<T>[K] : never, condition?: (item: DynamicFormControlProps<T>) => boolean) => void;
};

export const useGridFormRows = <T extends { [key: string]: any } | undefined = any>(rows: GridFormRowProps<T>[]): UseGridFormRowsResult<T> => {
    const [gridFormRows, setGridFormRows] = useState<GridFormRowProps<T>[]>(rows);

    /**
     * formControlのプロパティを設定
     */
    const setProperty = useCallback(<K extends keyof GridFormRowProps<T>>(
        propName: K,
        value?: K extends keyof GridFormRowProps<T> ? GridFormRowProps<T>[K] : never,
        condition?: (item: GridFormRowProps<T>) => boolean,
        ) => {
            setGridFormRows(prevRows =>
                prevRows.map(row => {
                    if (!condition || condition(row)) {
                        return {
                            ...row,
                            [propName]: value,
                        };
                    }
                    return row;
                })
            );
    }, []);

    /**
     * formControlのプロパティを設定
     */
    const setFormControlProperty = useCallback(<K extends keyof DynamicFormControlProps<T>>(
        propName: K,
        value?: K extends keyof DynamicFormControlProps<T> ? DynamicFormControlProps<T>[K] : never,
        condition?: (item: DynamicFormControlProps<T>) => boolean,
        ) => {
            setGridFormRows(prevRows =>
                prevRows.map(row => {
                    return {
                        ...row,
                        formControls: row.formControls.map(control => {
                            if (!condition || condition(control)) {
                                return {
                                    ...control,
                                    [propName]: value,
                                };
                            }
                            return control;
                        }),
                    };
                })
            );
    }, []);

    return {
        gridFormRows,
        setGridFormRows,
        setProperty,
        setFormControlProperty
    };
};