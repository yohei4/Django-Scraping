import { isAxiosError } from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { useClient } from "@hooks/useClient";
import { IWarehouse } from "@app/admin/interfaces/master/warehouse";
import { WAREHOUSE_DELETE, WAREHOUSE_DETAIL, WAREHOUSE_EDIT } from "@app/admin/constants/ApiUrls";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { DetailTemplate, gridRows } from "@app/admin/components/templates/master/warehouse/DetailTemplate";

export const WarehouseDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<IWarehouse> => {
    return (await post(WAREHOUSE_DETAIL, params)).data;
}

export const WarehouseDetail = () => {
    const data = useLoaderData() as IWarehouse;
    const methods = useForm<IWarehouse>({ defaultValues: data });
    const { gridFormRows } = useGridFormRows<IWarehouse>(gridRows);
    const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<IWarehouse> = async (data: IWarehouse) => {
        try {
            await post(WAREHOUSE_EDIT, data, true);
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

    // 削除処理
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await post(WAREHOUSE_DELETE, methods.getValues(), true);
        } catch {
            return false;
        }
        return true;
    };

    return (
        <FormProvider {...methods}>
            <DetailTemplate
                formId="entty_update"
                gridFormRows={gridFormRows}
                submit={submit}
                onDelete={handleDelete} />
        </FormProvider>
    );
};
