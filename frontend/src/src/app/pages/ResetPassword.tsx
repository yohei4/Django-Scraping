import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { IUser } from '@app/admin/interfaces/IUser';
import { useMenu, useSystem, useUser } from '@app/admin/hooks';
import { RESET_PASSWORD } from '@app/admin/constants/ApiUrls';
import { ResetPasswordTemplate } from '@app/admin/components/templates/ResetPasswordTemplate';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const methods = useForm<IUser>({});
    const [message, setMessage] = useState<string | undefined>();
    const { updateUser } = useUser();
    const { updateSystem } = useSystem();
    const { updateMenu } = useMenu();
    const { post } = useClient(false);

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser) => {
        try {
            await post(RESET_PASSWORD, data, true);
        } catch {
            return false;
        }
        return true;
    };

    return (
        <FormProvider {...methods}>
            <ResetPasswordTemplate
                resetPasswordformId='form-entry'
                resetPasswordSubmit={submit} />
        </FormProvider>
    );
};
