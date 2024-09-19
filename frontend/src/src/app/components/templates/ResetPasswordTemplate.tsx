import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { FormCard } from "@app/admin/components/organisms/FormCard";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { GridFormRowProps } from "@app/admin/components/molecules/GridFormRow";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { ResetPasswordConfirmDialog } from "@app/admin/components/organisms/ResetPasswordConfirmDialog";
import { ResetPasswordCompleteDialog } from "@app/admin/components/organisms/ResetPasswordCompleteDialog";

export interface ResetPasswordTemplateProps {
    resetPasswordformId: string;
    resetPasswordSubmit: SubmitHandler<IUser>;
};

const passwordResetGridRows: GridFormRowProps<IUser>[] = [
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
];

export const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = (props) => {
    const navigate = useNavigate();
    const { handleSubmit } = useFormContext();

    // パスワード変更確認ダイアログ
    const [resetPasswordConfirmDialogOpen, setResetPasswordConfirmDialogOpen] = React.useState(false);
    const handleResetPasswordConfirmDialogOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordConfirmDialogOpen(true);
    };
    const handleResetPasswordConfirmDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordConfirmDialogOpen(false);
    };

    // パスワード変更完了ダイアログ
    const [resetPasswordCompleteDialogOpen, setResetPasswordCompleteDialogOpen] = React.useState(false);
    const handleResetPasswordCompleteDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setResetPasswordCompleteDialogOpen(false);
        navigate('/');
    };

    // パスワード変更 submit 処理
    const resetPasswordSubmit: SubmitHandler<IUser> = async (data: IUser, event?: React.BaseSyntheticEvent) => {
        if (await props.resetPasswordSubmit(data, event)) {
            setResetPasswordCompleteDialogOpen(true);
        }
        setResetPasswordConfirmDialogOpen(false);
    }

    return (
        <React.Fragment>
            <PageTitle text="パスワード変更" sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <DefaultButton onClick={handleResetPasswordConfirmDialogOpen}>更新</DefaultButton>
                </Box>
            </PageTitle>
            <FormCard
                formId={props.resetPasswordformId}
                gridFormRows={passwordResetGridRows}
                onSubmit={handleSubmit(resetPasswordSubmit)} />
            <ResetPasswordConfirmDialog formId={props.resetPasswordformId} open={resetPasswordConfirmDialogOpen} onNoButtonClick={handleResetPasswordConfirmDialogClose} />
            <ResetPasswordCompleteDialog open={resetPasswordCompleteDialogOpen} onCloseButtonClick={handleResetPasswordCompleteDialogClose} />
        </React.Fragment>
    );
};
