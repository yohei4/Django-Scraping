import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { getInvalidKbnOptions } from "@enums/InvalidKbn";
import { Button } from "@components/atoms/Button";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { DangerButton } from "@components/atoms/DangerButton";
import { UpdateCompleteDialog } from "@components/organisms/UpdateCompleteDialog";
import { DeleteCompleteDialog } from "@components/organisms/DeleteCompleteDialog";
import { UpdateConfirmDialog } from "@components/organisms/UpdateConfirmDialog";
import { DeleteConfirmDialog } from "@components/organisms/DeleteConfirmDialog";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { ResetPasswordConfirmDialog } from "@app/admin/components/organisms/ResetPasswordConfirmDialog";
import { ResetPasswordCompleteDialog } from "@app/admin/components/organisms/ResetPasswordCompleteDialog";
import { FETCH_CARRIERS_MENU_ITEMS, FETCH_KINO_AUTH_GRP_MENU_ITEMS } from "@app/admin/constants/ApiUrls";

export interface DetailTemplateProps {
    formId: string;
    resetPasswordformId: string;
    gridFormRows: GridFormRowProps[];
    enableResetPassword: boolean;
    submit: SubmitHandler<IUser>;
    resetPasswordSubmit: SubmitHandler<IUser>;
    onDelete: (event: React.MouseEvent<HTMLButtonElement>) => Promise<boolean>;
};

export const gridRows: GridFormRowProps<IUser>[] = [
    {
        label: '担当者コード',
        required: true,
        formControls: [
            {
                type: 'text',
                name: 'UserCd',
                readOnly: true,
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
    {
        label: '登録日時',
        formControls: [
            {
                type: 'datetime-local',
                name: 'InsDateTime',
                label: '登録日時',
                required: true,
                readOnly: true,
            },
        ]
    },
    {
        label: '登録者',
        formControls: [
            {
                type: 'text',
                name: 'InsUserName',
                label: '登録者 ',
                required: true,
                readOnly: true,
            },
        ]
    },
    {
        label: '更新日時',
        formControls: [
            {
                type: 'datetime-local',
                name: 'UpdDateTime',
                label: '更新日時',
                required: true,
                readOnly: true,
            },
        ]
    },
    {
        label: '最終更新者',
        formControls: [
            {
                type: 'text',
                name: 'UpdUserName',
                label: '最終更新者',
                required: true,
                readOnly: true,
            },
        ]
    },
];

const passwordResetGridRows: GridFormRowProps<IUser>[] = [
    {
        label: 'パスワード',
        formControls: [
            {
                type: 'password',
                name: 'Password',
                label: 'パスワード',
            },
        ]
    },
    {
        label: 'パスワード(再入力)',
        formControls: [
            {
                type: 'password',
                name: 'ConfirmPassword',
                label: 'パスワード',
            },
        ]
    },
];

export const DetailTemplate: React.FC<DetailTemplateProps> = (props) => {
    const navigate = useNavigate();
    const { handleSubmit } = useFormContext();

    // 更新確認ダイアログ
    const [updConfirmDialogOpen, setUpdConfirmDialogOpen] = React.useState(false);
    const handleUpdConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdConfirmDialogOpen(true);
    };
    const handleUpdConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdConfirmDialogOpen(false);
    };

    // パスワード変更確認ダイアログ
    const [resetPasswordConfirmDialogOpen, setResetPasswordConfirmDialogOpen] = React.useState(false);
    const handleResetPasswordConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordConfirmDialogOpen(true);
    };
    const handleResetPasswordConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordConfirmDialogOpen(false);
    };

    // 削除確認ダイアログ
    const [delConfirmDialogOpen, setDelConfirmDialogOpen] = React.useState(false);
    const handleDelConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelConfirmDialogOpen(true);
    };
    const handleDelConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelConfirmDialogOpen(false);
    };

    // 更新完了ダイアログ
    const [updCompleteDialogOpen, setUpdCompleteDialogOpen] = React.useState(false);
    const handleUpdCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUpdCompleteDialogOpen(false);
        navigate('/master/contact-person');
    };

    // 削除完了ダイアログ
    const [delCompleteDialogOpen, setDelCompleteDialogOpen] = React.useState(false);
    const handleDelCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDelCompleteDialogOpen(false);
        navigate('/master/contact-person');
    };

    // パスワード変更完了ダイアログ
    const [resetPasswordCompleteDialogOpen, setResetPasswordCompleteDialogOpen] = React.useState(false);
    const handleResetPasswordCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordCompleteDialogOpen(false);
    };

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser, event?: React.BaseSyntheticEvent) => {
        if (await props.submit(data, event)) {
            setUpdCompleteDialogOpen(true);
        }
        setUpdConfirmDialogOpen(false);
    }

    // パスワード変更 submit 処理
    const resetPasswordSubmit: SubmitHandler<IUser> = async (data: IUser, event?: React.BaseSyntheticEvent) => {
        if (await props.resetPasswordSubmit(data, event)) {
            setResetPasswordCompleteDialogOpen(true);
        }
        setResetPasswordConfirmDialogOpen(false);
    }

    // delete 処理
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (await props.onDelete(event)) {
            setDelCompleteDialogOpen(true);
        }
        setDelCompleteDialogOpen(true);
    }

    return (
        <React.Fragment>
            <PageTitle text="担当者詳細" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={'/master/contact-person'}><Button color='default' variant="outlined">戻る</Button></Link>
                    <DangerButton onClick={handleDelConfirmDialogOpen}>削除</DangerButton>
                    <DefaultButton onClick={handleUpdConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard
                formId={props.formId}
                gridFormRows={props.gridFormRows}
                onSubmit={handleSubmit(submit)} />
            <br />
            {
                props.enableResetPassword ?
                <FormCard
                    formId={props.resetPasswordformId}
                    gridFormRows={passwordResetGridRows}
                    onSubmit={handleSubmit(resetPasswordSubmit)}
                    headerActions={<DefaultButton onClick={handleResetPasswordConfirmDialogOpen}>パスワード変更</DefaultButton>} />
                : null
            }
            <UpdateConfirmDialog formId={props.formId} open={updConfirmDialogOpen} message='マスタの更新をしますか？' onNoButtonClick={handleUpdConfirmDialogClose} />
            <DeleteConfirmDialog open={delConfirmDialogOpen} message='マスタの削除をしますか？' onNoButtonClick={handleDelConfirmDialogClose} onYesButtonClick={handleDelete} />
            <ResetPasswordConfirmDialog formId={props.resetPasswordformId} open={resetPasswordConfirmDialogOpen} onNoButtonClick={handleResetPasswordConfirmDialogClose} />
            <UpdateCompleteDialog open={updCompleteDialogOpen} message='マスタの更新しました。' onCloseButtonClick={handleUpdCompleteDialogClose} />
            <DeleteCompleteDialog open={delCompleteDialogOpen} message='マスタの削除しました。' onCloseButtonClick={handleDelCompleteDialogClose} />
            <ResetPasswordCompleteDialog open={resetPasswordCompleteDialogOpen} onCloseButtonClick={handleResetPasswordCompleteDialogClose} />
        </React.Fragment>
    );
};
