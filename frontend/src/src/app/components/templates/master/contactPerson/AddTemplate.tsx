import React from "react";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "@components/atoms/Button";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { InsertConfirmDialog } from "@components/organisms/InsertConfirmDialog";
import { InsertCompleteDialog } from "@components/organisms/InsertCompleteDialog";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FETCH_CARRIERS_MENU_ITEMS, FETCH_KINO_AUTH_GRP_MENU_ITEMS } from "@app/admin/constants/ApiUrls";

export interface AddTemplateProps {
    formId: string;
    gridFormRows: GridFormRowProps[];
    submit: SubmitHandler<IUser>;
};

export const gridRows: GridFormRowProps<IUser>[] = [
    {
        label: '担当者コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'UserCd',
            },
        ]
    },
    {
        label: '担当者名',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'UserNameSei',
                label: '担当者名(姓)',
                required: true,
            },
            {
                type: 'text',
                name: 'UserNameMei',
                label: '担当者名(名)',
                required: true,
            },
        ]
    },
    {
        label: '担当者名(カナ)',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'UserKanaSei',
                label: '担当者名(カナ)(姓)',
                required: true,
            },
            {
                type: 'text',
                name: 'UserKanaMei',
                label: '担当者名(カナ)(名)',
                required: true,
            },
        ]
    },
    {
        label: '権限',
        required: true,
        formControls: [
            {
                type: 'async-select',
                name: 'KinoAuthGroupNo',
                label: '権限',
                labelId: 'KinoAuthGroupNo',
                defaultValue: '',
                required: true,
                url: FETCH_KINO_AUTH_GRP_MENU_ITEMS,
            },
        ]
    },
    {
        label: '輸送業者名',
        formControls: [
            {
                type: 'async-select',
                name: 'CarrierCd',
                label: '輸送業者名',
                labelId: 'CarrierCd',
                defaultValue: '',
                required: false,
                url: FETCH_CARRIERS_MENU_ITEMS,
            },
        ]
    },
    {
        label: 'パスワード',
        required: true,
        formControls: [
            {
                type: 'password',
                name: 'Password',
                label: 'パスワード',
                required: true,
            },
        ]
    },
    {
        label: 'パスワード(再入力)',
        required: true,
        formControls: [
            {
                type: 'password',
                name: 'ConfirmPassword',
                label: 'パスワード',
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
                required: true,
                options: getInvalidKbnOptions(),
            },
        ]
    },
];

export const AddTemplate: React.FC<AddTemplateProps> = (props) => {
    const navigate = useNavigate();
    const { handleSubmit } = useFormContext();

    // 登録確認ダイアログ
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
        navigate('/master/contact-person');
    };

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setInsCompleteDialogOpen(true);
        }
        setInsConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="担当者登録" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/contact-person'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DefaultButton onClick={handleInsConfirmOpen}>登録</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard formId={props.formId} gridFormRows={props.gridFormRows} onSubmit={handleSubmit(submit)} />
            <InsertConfirmDialog formId={props.formId} open={insConfirmDialogOpen} message='マスタの登録をしますか？' onNoButtonClick={handleInsConfirmClose} />
            <InsertCompleteDialog open={insCompleteDialogOpen} message='マスタの登録しました。' onCloseButtonClick={handleInsCompleteDialogClose} />
        </React.Fragment>
    );
};
