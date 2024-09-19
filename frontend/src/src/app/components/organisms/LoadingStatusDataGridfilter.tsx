import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useGridApiContext, GridFilterOperator } from "@mui/x-data-grid";
import { BoxCheckBox } from "@components/atoms/BoxCheckBox";
import { StowageStatusKbn, StowageStatusKbnDisplayNames, getStowageStatusKbnOptions } from "@enums/StowageStatusKbn";

/**
 * カスタムフィルター
 */
export const LoadingStatusDataGridfilterOperator: GridFilterOperator<any, StowageStatusKbn>[] = [
    {
        label: '状態',
        value: 'stowageStatusKbn',
        getApplyFilterFn: (filterItem) => {
            if (!Array.isArray(filterItem.value)) {
                return null;
            }
            return (value) => {
                return (
                    value !== null &&
                    filterItem.value.length < 0 || (0 < filterItem.value.length && filterItem.value[0] === value || filterItem.value[1] === value)
                );
            };
        },
    },
];
  

export interface LoadingStatusDataGridfilterProps {
    allChecked?: boolean;
}

/**
 * 積付表受渡状況一覧のフィルターに使用
 * @param props 
 * @returns 
 */
export const LoadingStatusDataGridfilter: React.FC<LoadingStatusDataGridfilterProps> = (props) => {
    const apiRef = useGridApiContext();
    const [values, setValues] = useState<StowageStatusKbn[]>((
        props.allChecked ?
        [StowageStatusKbn.Complete, StowageStatusKbn.Incomplete] :
        []
    ));

    // value変更時
    useEffect(() => {
        apiRef.current.setFilterModel({
            items: [
                {
                    id: 'StowageStatusKbn',
                    field: 'StowageStatusKbn',
                    operator: 'stowageStatusKbn',
                    value: values,
                },
            ],
        });
    }, [values]);

    // チェンジイベント
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked) setValues([...values, parseInt(event.target.value)]);
        else setValues(values.filter(x => x !== parseInt(event.target.value)));
    }

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                gap: theme.spacing(0, 1),
            })}
        >
            {
                getStowageStatusKbnOptions().map((option, index) => (
                    <BoxCheckBox
                        key={index}
                        name={`StowageStatusKbn[${index}]`}
                        label={StowageStatusKbnDisplayNames[option.value as StowageStatusKbn]}
                        value={option.value as StowageStatusKbn}
                        checked={values.includes(option.value as StowageStatusKbn)}
                        onChange={handleChange}
                    />
                ))
            }
        </Box>
    );
}