import { isAxiosError } from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InvalidKbn } from "@enums/InvalidKbn";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { AddTemplate, gridRows } from "@app/admin/components/templates/master/transportVehicle/AddTemplate";
import { ICarrier } from "@app/admin/interfaces/master/transportVehicle/ICarrier";
import { TRANSPORT_VEHICLE_ADD } from "@app/admin/constants/ApiUrls";
import { useClient } from "@hooks/useClient";

export const defaultValues: ICarrier = {
    InvalidKbn: InvalidKbn.Off,
    CarrierTrucks: [
        { TruckNo: '', TelNo: '', Remark: '' },
    ]
};

export const TransportVehicleAdd = () => {
    const methods = useForm<ICarrier>({ defaultValues: defaultValues });
    const {gridFormRows} = useGridFormRows<ICarrier>(gridRows);
    const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<ICarrier> = async (data: ICarrier) => {
        try {
            await post(TRANSPORT_VEHICLE_ADD, data, true);
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

    return (
        <FormProvider {...methods}>
            <AddTemplate
                formId='entty_insert'
                gridFormRows={gridFormRows}
                submit={submit} />
        </FormProvider>
    );
};
