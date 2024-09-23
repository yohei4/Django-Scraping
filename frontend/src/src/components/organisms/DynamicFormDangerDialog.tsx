import { useEffect } from "react";
import { DefaultValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { DangerDialog, DangerDialogProps } from "@components/atoms/DangerDialog";
import { DangerButton } from "@components/atoms/DangerButton";
import { DynamicRangeFormControl } from "@components/organisms/DynamicRangeFormControl";
import { DynamicFormControlProps } from "./DynamicFormControl";

export type DynamicFormDangerFieldValues = Record<string, any>;
export interface DynamicFormDangerDialogProps<TFieldValues extends DynamicFormDangerFieldValues = DynamicFormDangerFieldValues> extends DangerDialogProps {
    formId: string;
    subTitle?: string;
    message?: React.ReactNode;
    formControls?: DynamicFormControlProps<TFieldValues>[][];
    defaultValues?: DefaultValues<TFieldValues>;
    onYesButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    onNoButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    submit: SubmitHandler<TFieldValues>;
};

export const DynamicFormDangerDialog = <TFieldValues extends DynamicFormDangerFieldValues = DynamicFormDangerFieldValues>(props: DynamicFormDangerDialogProps<TFieldValues>) => {
    const methods = useForm({ defaultValues: props.defaultValues });

    useEffect(() => {
        if (props.open && props.defaultValues) {
            methods.reset(props.defaultValues);
        }
    }, [props.open]);

    return (
        <DangerDialog
            {...props}
            children={
                <Box>
                    {
                        props.subTitle ?
                        <Box
                            className='DynamicFormDangerDialog-subTitle-root'
                            sx={(theme) => ({
                                width: '100%',
                                textAlign: 'center',
                                borderBottom: '1px solid #000',
                                marginBottom: theme.spacing(4),
                            })}
                        >
                            <Typography className='DynamicFormDangerDialog-subTitle' variant='h6'>{props.subTitle}</Typography>
                        </Box> :
                        null
                    }
                    {
                        props.message ?
                        <Box
                            className='DynamicFormDangerDialog-subTitle-root'
                            sx={(theme) => ({
                                width: '100%',
                                textAlign: 'center',
                                marginBottom: theme.spacing(2),
                            })}
                        >
                            <Typography className='DynamicFormDangerDialog-subTitle' variant='body1'>{props.message}</Typography>
                        </Box> :
                        null
                    }
                    <FormProvider {...methods}>
                        <Box
                            id={props.formId}
                            component='form'
                            onSubmit={methods.handleSubmit(props.submit)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {
                                props.formControls ?
                                props.formControls.map((formControls, index) => (
                                    <Box
                                        key={index}
                                        sx={
                                            ((theme) => ({
                                                '&:not(:last-child)': {
                                                    marginBottom: theme.spacing(2)
                                                }
                                            }))
                                        }
                                    >
                                        <DynamicRangeFormControl formControls={formControls} />
                                    </Box>
                                )) :
                                null
                            }
                        </Box>
                    </FormProvider>
                </Box>
            }
            actions={[
                <DangerButton autoFocus variant="outlined" onClick={props.onNoButtonClick}>いいえ</DangerButton>,
                <DangerButton type='submit' onClick={props.onYesButtonClick} form={props.formId}>はい</DangerButton>
            ]}
        />
    );
};
