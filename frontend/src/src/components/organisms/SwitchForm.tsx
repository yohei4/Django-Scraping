import { Box } from "@mui/material";
import { GridFormRow } from "./GridFormRow";
import { useFormContext } from "react-hook-form";
import { DynamicForm, DynamicFormProps } from "./DynamicForm";
import { DynamicReference, DynamicReferenceProps } from "./DynamicReference";

export interface SwitchFormProps<T extends { [key: string]: any } | undefined = any> extends DynamicFormProps<T>, DynamicReferenceProps<T> {
    reference?: boolean;
};

export const SwitchForm = <T extends { [key: string]: any } | undefined = any>(props: SwitchFormProps<T>) => {
    const control = useFormContext();
    const values = control.getValues();

    return (
        props.reference ? <DynamicReference {...props} /> : <DynamicForm {...props} />
    );
};
