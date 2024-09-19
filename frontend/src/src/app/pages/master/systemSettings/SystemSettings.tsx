import { isAxiosError } from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { useClient } from "@hooks/useClient";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { SYSTEM_SETTINGS_DETAIL, SYSTEM_SETTINGS_EDIT } from "@app/admin/constants/ApiUrls";
import { SystemSettingsTemplate, gridRows } from "@app/admin/components/templates/master/systemSettings/SystemSettingsTemplate";
import { ISystem } from "@app/admin/interfaces/master/systemSettings";
import { useSystem } from "@app/admin/hooks";

export const SystemSettingsLoader = async ({ params }: LoaderFunctionArgs): Promise<ISystem> => {
    return (await post(SYSTEM_SETTINGS_DETAIL, params)).data;
}

export const SystemSettings = () => {
    const data = useLoaderData() as ISystem;
    const methods = useForm<ISystem>({ defaultValues: data });
    const { gridFormRows } = useGridFormRows<ISystem>(gridRows);
    const { post } = useClient(true);
    const { updateSystem } = useSystem();

    // submit 処理
    const submit: SubmitHandler<ISystem> = async (data: ISystem): Promise<boolean> => {
        try {
            const system = (await post(SYSTEM_SETTINGS_EDIT, data, true)).data;
            updateSystem(system);
            Object.entries(system).forEach(([key, value]) => {
                methods.setValue(key as keyof ISystem, value as any);
            });
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof ISystem, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    return (
        <FormProvider {...methods}>
            <SystemSettingsTemplate
                formId="form_entry"
                gridFormRows={gridFormRows}
                submit={submit} />
        </FormProvider>
    );
}
