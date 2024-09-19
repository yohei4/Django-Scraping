import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { CONTACT_PERSON_DELETE, CONTACT_PERSON_DETAIL, CONTACT_PERSON_EDIT, CONTACT_PERSON_RESET_PASSWORD, FETCH_CARRIERS_MENU_ITEMS, FETCH_KINO_AUTH_GRP_MENU_ITEMS } from "@app/admin/constants/ApiUrls";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { DetailTemplate, gridRows } from "@app/admin/components/templates/master/contactPerson/DetailTemplate";
import { useClient } from "@hooks/useClient";
import { FuncAuthGKbn } from "@enums/FuncAuthGKbn";
import { useUser } from "@app/admin/hooks";
import { AdminAuthKbn } from "@enums/AdminAuthKbn";

export const ContactPersonDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<IUser> => {
    const data = (await post(CONTACT_PERSON_DETAIL, params)).data;
    console.log(data);
    return data;
    // return (await post(CONTACT_PERSON_DETAIL, params)).data;
}

export const ContactPersonDetail = () => {
    const { user } = useUser();
    const data = useLoaderData() as IUser;
    const methods = useForm<IUser>({ defaultValues: data });
    const kinoAuthGroupNo = methods.watch('KinoAuthGroupNo');
    const [ enableResetPassword, setEnableResetPassword ] = useState(user.AdminAuthKbn === AdminAuthKbn.Admin);
    const [ enableCarrierCd, setEnableCarrierCd ] = useState(kinoAuthGroupNo === FuncAuthGKbn.Carrier);
    const { gridFormRows, setProperty, setFormControlProperty } = useGridFormRows<IUser>(gridRows);
    const { post } = useClient(true);

    // formData変更時
    useEffect(() => {
        setEnableCarrierCd(kinoAuthGroupNo === FuncAuthGKbn.Carrier);
    }, [kinoAuthGroupNo]);

    // 輸送業者名の入力可否
    useEffect(() => {
        setProperty('required', enableCarrierCd, x => x.formControls.some(y => y.name === 'CarrierCd'));
        setFormControlProperty('required', enableCarrierCd, x => x.name === 'CarrierCd');
        setFormControlProperty('disabled', !enableCarrierCd, x => x.name === 'CarrierCd');
    }, [enableCarrierCd]);

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser) => {
        try {
            await post(CONTACT_PERSON_EDIT, data, true);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof IUser, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    // submit 処理
    const resetPasswordSubmit: SubmitHandler<IUser> = async (data: IUser) => {
        try {
            const user: IUser = (await post(CONTACT_PERSON_RESET_PASSWORD, data, true)).data;
            methods.setValue('UpdUserName', user.UpdUserName);
            methods.setValue('UpdDateTime', user.UpdDateTime);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof IUser, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    // 削除処理
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await post(CONTACT_PERSON_DELETE, methods.getValues(), true);
        } catch {
            return false;
        }
        return true;
    };

    return (
        <FormProvider {...methods}>
            <DetailTemplate
                formId="entty_update"
                resetPasswordformId="entry_reset_password"
                gridFormRows={gridFormRows}
                enableResetPassword={enableResetPassword}
                submit={submit}
                resetPasswordSubmit={resetPasswordSubmit}
                onDelete={handleDelete} />
        </FormProvider>
    );
};
