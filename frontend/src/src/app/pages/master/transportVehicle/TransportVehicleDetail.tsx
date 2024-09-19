import { isAxiosError } from "axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { useClient } from "@hooks/useClient";
import { ICarrier } from "@app/admin/interfaces/master/transportVehicle/ICarrier";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { DetailTemplate, gridRows } from "@app/admin/components/templates/master/transportVehicle/DetailTemplate";
import { TRANSPORT_VEHICLE_DELETE, TRANSPORT_VEHICLE_DETAIL, TRANSPORT_VEHICLE_EDIT } from "@app/admin/constants/ApiUrls";

export const TransportVehicleDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<ICarrier> => {
    return (await post(TRANSPORT_VEHICLE_DETAIL, params)).data;
}

export const TransportVehicleDetail = () => {
    const data = useLoaderData() as ICarrier;
    const methods = useForm<ICarrier>({ defaultValues: data });
   const { gridFormRows } = useGridFormRows<ICarrier>(gridRows);
   const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<ICarrier> = async (data: ICarrier) => {
        try {
            await post(TRANSPORT_VEHICLE_EDIT, data, true);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof ICarrier, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    // 削除処理
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await post(TRANSPORT_VEHICLE_DELETE, methods.getValues(), true);
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
