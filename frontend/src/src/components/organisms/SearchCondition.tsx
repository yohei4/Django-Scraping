import React from "react";
import { Box, Chip, SxProps, Theme } from "@mui/material";
import { DynamicFormControlProps } from "./DynamicFormControl";
import { useSearchConditionContext } from "@hooks/useSearchConditionContext";
import moment from "moment";

export interface SearchConditionProps {
    formControls: DynamicFormControlProps[][];
    sx?: SxProps<Theme>;
};

const putSearchLabel = (key: string, value: any, formControls: DynamicFormControlProps[][]): React.ReactNode => {
    const control = formControls.flat().find(x => x.name === key);
    let node: React.ReactNode = '';

    if(control) {
        switch(control.type) {
            case 'text':
            case 'number':
                node = (
                    <React.Fragment>
                        <Box component='span'>{control.startAdornmentInner}</Box>
                        <Box component='span'>{String(value)}</Box>
                        <Box component='span'>{control.endAdornmentInner}</Box>
                    </React.Fragment>
                );
                break;
            case 'select':
                node = control.options?.find(x => x.value === value)?.children ?? value;
                break;
            case 'multiple-select':
                node = control.options?.filter(x => value.includes(x.value)).map((item) => item.children).join(',');
                break;
            case 'date':
                node = moment(value).format(control.format ?? 'YYYY/MM/DD');
                break;
            case 'time':
                node = moment(value).format(control.format ?? 'HH:mm:ss');
                break;
            case 'datetime-local':
                node = moment(value).format(control.format ?? 'YYYY/MM/DD HH:mm:ss');
                break;
            default:
                node = String(value);
                break;
        }
        return (
            <React.Fragment>
                <Box component='span' sx={{fontWeight: 'bold'}}>{control.label}</Box>
                <Box component='span'>: {node}</Box>
            </React.Fragment>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}

/**
 * 検索条件チップ群
 * @summary ※ SearchConditionProviderの設定をしてください。
 * @param param0 
 * @returns 
 */
export const SearchCondition: React.FC<SearchConditionProps> = ({ formControls, sx }) => {
    const condition = useSearchConditionContext();

    // TODO: 検索条件の並び順を変更したい
    return (
        <Box className='search-condition-wrapper' sx={{ ...sx, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {
                Object.entries(condition)
                    .filter(([key, value]) => value !== '' &&
                            ((Array.isArray(value) && 0 < value.length) || (value !== undefined && value !== null && !Array.isArray(value))))
                    .map(([key, value], index) => {
                        return (
                            <Chip
                                key={index}
                                label={putSearchLabel(key, value, formControls)}
                                color='default'
                                variant='outlined'
                            />
                    );
                })
            }
        </Box>
    );
};