import React from "react";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "@components/atoms/Button";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { InsertConfirmDialog } from "@components/organisms/InsertConfirmDialog";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { InsertCompleteDialog } from "@components/organisms/InsertCompleteDialog";
import { IWarehouse } from "@app/admin/interfaces/master/warehouse";
import { SubmitHandler, useFormContext } from "react-hook-form";

export interface AddTemplateProps {
    formId: string;
    gridFormRows: GridFormRowProps[];
    submit: SubmitHandler<IWarehouse>;
};

export const gridRows: GridFormRowProps<IWarehouse>[] = [
    {
        label: '倉庫コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseCd',
                label: '倉庫コード',
            },
        ]
    },
    {
        label: '倉庫名',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseName',
                label: '倉庫名',
                required: true,
            },
        ]
    },
    {
        label: '倉庫名(略)',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'WarehouseAbbr',
                label: '倉庫名(略)',
                required: true,
            },
        ]
    },
    {
        label: '積込想定時間',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'LoadingTime',
                label: '積込想定時間',
                required: true,
                endAdornmentInner: '分',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: 'アラート待機台数',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'AlertWaitNum',
                label: 'アラート待機台数',
                required: true,
                endAdornmentInner: '台',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '初期配置人数',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'DefaultLiftman',
                label: '初期配置人数',
                required: true,
                endAdornmentInner: '人',
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '表示順',
        required: true,
        formControls: [
            {
                type: 'number',
                name: 'SortOrder',
                label: '表示順',
                required: true,
                sx: { '& > .MuiInputBase-root': { width: '100px' } }
            },
        ]
    },
    {
        label: '備考',
        formControls: [
            {
                type: 'text',
                name: 'Remark',
                label: '備考',
            },
        ]
    },
    {
        label: '有効/無効',
        formControls: [
            {
                type: 'radio',
                name: 'InvalidKbn',
                label: '有効/無効',
                required: true,
                options: getInvalidKbnOptions(),
            },
        ]
    },
];

export const AddTemplate: React.FC<AddTemplateProps> = (props) => {
    const navigate = useNavigate();
    const { handleSubmit } = useFormContext();

    const [insConfirmDialogOpen, setInsConfirmDialogOpen] = React.useState(false);
    const handleInsConfirmOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsConfirmDialogOpen(true);
    };
    const handleInsConfirmClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsConfirmDialogOpen(false);
    };

    // 登録完了ダイアログ
    const [insCompleteDialogOpen, setInsCompleteDialogOpen] = React.useState(false);
    const handleInsCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInsCompleteDialogOpen(false);
        navigate('/master/warehouse');
    };

    // submit 処理
    const submit: SubmitHandler<IWarehouse> = async (data: IWarehouse, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setInsCompleteDialogOpen(true);
        }
        setInsConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="倉庫登録" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/warehouse'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DefaultButton onClick={handleInsConfirmOpen}>登録</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows} onSubmit={handleSubmit(submit)} />
            <InsertConfirmDialog formId={props.formId} open={insConfirmDialogOpen} message='マスタの登録をしますか？' onNoButtonClick={handleInsConfirmClose} />
            <InsertCompleteDialog open={insCompleteDialogOpen} message='マスタの登録しました。' onCloseButtonClick={handleInsCompleteDialogClose} />
        </React.Fragment>
    );
};
