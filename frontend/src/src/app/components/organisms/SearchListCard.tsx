import React, { useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { SearchButton } from "../atoms/SearchButton";
import { ResetSerachButton } from "@components/atoms/ResetSerachButton";
import { SearchFormDialog } from "@components/organisms/SearchFormDialog";
import { DynamicFormControlProps } from "@components/organisms/DynamicFormControl";
import { DataGrid } from "../atoms/DataGrid";
import { SearchCondition } from "@components/organisms/SearchCondition";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useInitialSearchConditionContext, useSearchConditionContext, useSearchConditionDispatch } from "@hooks/useSearchConditionContext";

export interface SearchListCardProps {
    dialogOpen: boolean;
    rows: readonly any[];
    columns: GridColDef[];
    formControls: DynamicFormControlProps[][];
    dataGirdInitialState?: GridInitialStateCommunity | undefined;
    dataGridACtion?: React.ReactNode;
    columnVisibilityModel?: GridColumnVisibilityModel;
    handleOpen: React.MouseEventHandler<HTMLButtonElement>;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    submit: SubmitHandler<any>;
};

export const SearchListCard: React.FC<SearchListCardProps> = (props: SearchListCardProps) => {
    const condition = useSearchConditionContext();
    const methods = useForm({ defaultValues: condition });
    const initialCondtion = useInitialSearchConditionContext();
    const searchCondtionDispatch = useSearchConditionDispatch();

    // リセットボタン処理
    const handleResetButtonClick = () => {
        methods.reset(initialCondtion);
    };

    // submit 処理
    const submit: SubmitHandler<any> = (data: any, event?: React.BaseSyntheticEvent) => {
        props.submit(data, event);
        searchCondtionDispatch({ type: 'SET_SEARCH_CONDITION', payload: data });
        props.handleClose(event as any);
    };

    // リセットボタン処理
    const handleResetSearchButtonClick = () => {
        handleResetButtonClick();
        methods.handleSubmit(submit)();
    };

    // ダイアログ表示時
    useEffect(() => {
        Object.entries(condition).forEach(([key, value]) => {
            methods.setValue(key, value);
        });
    }, [props.dialogOpen]);

    return (
        <FormProvider {...methods}>
            <Card>
                <CardHeader
                    sx={{
                        '& .MuiCardHeader-content': {
                            overflowX: 'scroll',
                            '&::-webkit-scrollbar': {
                                width: 0,
                                height: 0,
                            },
                        }
                    }}
                    avatar={<SearchButton onClick={props.handleOpen}>検索条件</SearchButton>}
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SearchCondition formControls={props.formControls} />
                            <ResetSerachButton onClick={handleResetSearchButtonClick}>検索条件をリセット</ResetSerachButton>
                        </Box>
                    }
                />
                <Divider />
                <CardContent sx={{ padding: 0, '&:last-child': {paddingBottom: 0} }}>
                    <DataGrid columns={props.columns} rows={props.rows} initialState={props.dataGirdInitialState} columnVisibilityModel={props.columnVisibilityModel} action={props.dataGridACtion}></DataGrid>
                </CardContent>
                <SearchFormDialog
                    formId='form_search_condition'
                    dialogTitle='検索条件'
                    open={props.dialogOpen}
                    formControls={props.formControls}
                    onSubmit={methods.handleSubmit(submit)}
                    onCloseButtonClick={props.handleClose}
                    onResetButtonClick={handleResetButtonClick}
                />
            </Card>
        </FormProvider>
    );
}