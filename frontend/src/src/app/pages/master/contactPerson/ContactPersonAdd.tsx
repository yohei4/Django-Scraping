import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InvalidKbn } from "@enums/InvalidKbn";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { IUser } from "@app/admin/interfaces/master/contactPerson/IUser";
import { AddTemplate, gridRows } from "@app/admin/components/templates/master/contactPerson/AddTemplate";
import { useClient } from "@hooks/useClient";
import { CONTACT_PERSON_ADD, FETCH_CARRIERS_MENU_ITEMS, FETCH_KINO_AUTH_GRP_MENU_ITEMS } from "@app/admin/constants/ApiUrls";
import { isAxiosError } from 'axios';
import { FuncAuthGKbn } from "@enums/FuncAuthGKbn";

export const defaultValues: IUser = {
    InvalidKbn: InvalidKbn.Off,
};

export const ContactPersonAdd = () => {
    const methods = useForm<IUser>({ defaultValues: defaultValues });
    const kinoAuthGroupNo = methods.watch('KinoAuthGroupNo');
    const [ enableCarrierCd, setEnableCarrierCd ] = useState(false);
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
    const submit: SubmitHandler<IUser> = async (data: IUser): Promise<boolean> => {
        try {
            await post(CONTACT_PERSON_ADD, data, true);
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

    return (
        <FormProvider {...methods}>
            <AddTemplate
                formId='entty_insert'
                gridFormRows={gridFormRows}
                submit={submit} />
        </FormProvider>
    );
};
