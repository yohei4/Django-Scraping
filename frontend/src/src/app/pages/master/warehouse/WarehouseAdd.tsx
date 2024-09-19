import { isAxiosError } from "axios";
import { useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { get } from "@utils/client";
import { InvalidKbn } from "@enums/InvalidKbn";
import { useClient } from "@hooks/useClient";
import { WAREHOUSE_ADD, WAREHOUSE_MAX_SORT_ORDER } from "@app/admin/constants/ApiUrls";
import { IWarehouse } from "@app/admin/interfaces/master/warehouse";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { AddTemplate, gridRows } from "@app/admin/components/templates/master/warehouse/AddTemplate";

export const WarehouseAddLoader = async (): Promise<number> => {
    return (await get(WAREHOUSE_MAX_SORT_ORDER)).data;
}

export const defaultValues: IWarehouse = {
    InvalidKbn: InvalidKbn.Off,
};

export const WarehouseAdd = () => {
    const data = useLoaderData() as number;
    const methods = useForm<IWarehouse>({ defaultValues: {...defaultValues, SortOrder: data } });
    const {gridFormRows} = useGridFormRows<IWarehouse>(gridRows);
    const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<IWarehouse> = async (data: IWarehouse) => {
        try {
            await post(WAREHOUSE_ADD, data, true);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof IWarehouse, { message: (messages as string[])[0] });
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
