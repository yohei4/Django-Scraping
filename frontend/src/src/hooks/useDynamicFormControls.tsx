import React, { useCallback, useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import { DynamicFormControlProps } from "@/components/organisms/DynamicFormControl";

type UseDynamicFormResult<T extends { [key: string]: any } | undefined = any> = {
    formControls: DynamicFormControlProps<T>[][];
    setFormControls: React.Dispatch<React.SetStateAction<DynamicFormControlProps<T>[][]>>;
    setProperty: <K extends keyof DynamicFormControlProps<T>>(propName: K, value?: K extends keyof DynamicFormControlProps<T> ? DynamicFormControlProps<T>[K] : never, condition?: (item: DynamicFormControlProps<T>) => boolean) => void;
    setControl: (control?: Control<FieldValues>) => void;
};

export const useDynamicFormControls = <T extends { [key: string]: any } | undefined = any>(rows: DynamicFormControlProps<T>[][]): UseDynamicFormResult<T> => {
    const [formControls, setFormControls] = useState<DynamicFormControlProps<T>[][]>(rows);

    /**
     * formControlのプロパティを設定
     */
    const setProperty = useCallback(<K extends keyof DynamicFormControlProps<T>>(
        propName: K,
        value?: K extends keyof DynamicFormControlProps<T> ? DynamicFormControlProps<T>[K] : never,
        condition?: (item: DynamicFormControlProps<T>) => boolean,
        ) => {
            setFormControls(prevRows =>
                prevRows.map(rows => {
                    return [
                        ...rows.map(row => {
                            if (!condition || condition(row)) {
                                return {
                                    ...row,
                                    [propName]: value,
                                };
                            }
                            return row;
                        })
                    ];
                })
            );
    }, []);

    /**
     * 初期値の設定など
     * @param control 
     */
    const setControl = (control?: Control<FieldValues>) => {
        setFormControls(prevRows =>
            prevRows.map(rows => {
                return [
                    ...rows.map(row => {
                        return { ...row, control: control } as DynamicFormControlProps<T>;
                    })
                ];
            })
        );
    };

    return {
        formControls,
        setFormControls,
        setProperty,
        setControl
    };
};