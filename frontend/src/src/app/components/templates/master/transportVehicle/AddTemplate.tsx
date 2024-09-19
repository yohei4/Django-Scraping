import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { Button } from "@components/atoms/Button";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { InsertCompleteDialog } from "@components/organisms/InsertCompleteDialog";
import { InsertConfirmDialog } from "@components/organisms/InsertConfirmDialog";
import { EditDataTableColDef } from "@components/organisms/EditDataTable";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { ICarrier, ICarrierTruck } from "@app/admin/interfaces/master/transportVehicle";

export interface AddTemplateProps {
    formId: string;
    gridFormRows: GridFormRowProps[];
    submit: SubmitHandler<ICarrier>;
};

export const cols: EditDataTableColDef<ICarrierTruck>[] = [
    {
        field: 'TruckNo',
        headerName: '車番',
        width: 150,
        formControl: {
            type: 'text',
        },
    },
    {
        field: 'TelNo',
        headerName: '電話番号(ハイフンなし)',
        width: 200,
        formControl: {
            type: 'text',
        },
    },
    {
        field: 'Remark',
        headerName: '備考',
        width: 500,
        formControl: {
            type: 'text',
        },
    },
];

export const gridRows: GridFormRowProps<ICarrier>[] = [
    {
        label: '輸送業者コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierCd',
                label: '輸送業者コード',
                required: true,
            },
        ]
    },
    {
        label: '輸送業者名',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierName',
                label: '輸送業者名',
                required: true,
            },
        ]
    },
    {
        label: '輸送業者名(カナ)',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'CarrierKana',
                label: '輸送業者名(カナ)',
                required: true,
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
        navigate('/master/transport-vehicle');
    };

    // submit 処理
    const submit: SubmitHandler<ICarrier> = async (data: ICarrier, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setInsCompleteDialogOpen(true);
        }
        setInsConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="車両登録" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/transport-vehicle'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DefaultButton onClick={handleInsConfirmOpen}>登録</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows} columns={cols} onSubmit={handleSubmit(submit)} />
            <InsertConfirmDialog formId={props.formId} open={insConfirmDialogOpen} message='マスタの登録をしますか？' onNoButtonClick={handleInsConfirmClose} />
            <InsertCompleteDialog open={insCompleteDialogOpen} message='マスタを登録しました。' onCloseButtonClick={handleInsCompleteDialogClose} />
        </React.Fragment>
    );
};
