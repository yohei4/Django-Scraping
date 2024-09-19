import React from "react";
import { Box } from "@mui/material";
import { DynamicFormControlProps } from "./DynamicFormControl";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DefaultDialog, DefaultDialogProps } from "@components/atoms/DefaultDialog";
import { DynamicRangeFormControl } from "./DynamicRangeFormControl";

export interface SearchFormDialogProps<T extends { [key: string]: any } | undefined = any> extends DefaultDialogProps {
    formId: string;
    formControls: DynamicFormControlProps<T>[][];
    onSubmit: React.FormEventHandler<HTMLDivElement | HTMLFormElement>;
    onSearchButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    onResetButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * 検索ダイアログ
 * @summary ※ SearchConditionProviderの設定をしてください。
 * @param props
 * @returns
 */
export const SearchFormDialog = <T extends { [key: string]: any } | undefined = any>(props: SearchFormDialogProps<T>) => {
    return (
        <DefaultDialog
            {...props}
            fullWidth
            onClose={props.onCloseButtonClick}
            children={
                <Box component='form' id={props.formId} onSubmit={props.onSubmit}>
                    {
                        props.formControls.map((formControls, index) => (
                            <Box
                                key={index}
                                sx={
                                    ((theme) => ({
                                        '&:not(:last-child)': {
                                            marginBottom: theme.spacing(2)
                                        }
                                    }))
                                }
                            >
                                <DynamicRangeFormControl key={index} formControls={formControls} />
                            </Box>
                        ))
                    }
                </Box>
            }
            actions={[
                <DefaultButton variant="outlined" onClick={props.onResetButtonClick}>リセット</DefaultButton>,
                <DefaultButton type="submit" autoFocus onClick={props.onSearchButtonClick} form={props.formId}>検索</DefaultButton>
            ]}
        />
    );
};
