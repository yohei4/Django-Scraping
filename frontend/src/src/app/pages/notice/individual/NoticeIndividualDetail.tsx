import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { useClient } from "@hooks/useClient";
import { InvalidKbn } from "@enums/InvalidKbn";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { DetailTemplate, gridRows } from "@app/admin/components/templates/notice/individual/DetailTemplate";
import { INotice } from "@app/admin/interfaces/notice/individual";
import { NOTICE_INDIVIDUAL_DETAIL, NOTICE_INDIVIDUAL_EDIT } from "@app/admin/constants/ApiUrls";

export const NoticeIndividualDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<INotice> => {
    return (await post(NOTICE_INDIVIDUAL_DETAIL, params)).data;
}

export const NoticeIndividualDetail = () => {
    const data = useLoaderData() as INotice;
    const methods = useForm<INotice>({ defaultValues: data });
    const isInValid = methods.watch('InvalidKbn');
    const [enableNoticeContents, setEnableNoticeContents] = useState(isInValid == InvalidKbn.Off);
    const { gridFormRows, setProperty, setFormControlProperty } = useGridFormRows(gridRows);
    const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<INotice> = async (data: INotice) => {
        try {
            const notice = (await post(NOTICE_INDIVIDUAL_EDIT, data, true)).data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof INotice, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    // formData変更時
    useEffect(() => {
        setEnableNoticeContents(isInValid == InvalidKbn.Off);
    }, [isInValid]);

    // お知らせ内容の入力可否
    useEffect(() => {
        setProperty('required', enableNoticeContents, x => x.formControls.some(y => y.name === 'Notice'));
        setFormControlProperty('required', enableNoticeContents, x => x.name === 'Notice');
        setFormControlProperty('disabled', !enableNoticeContents, x => x.name === 'Notice');
    }, [enableNoticeContents]);

    return (
        <FormProvider {...methods}>
            <DetailTemplate
                formId="entty_update"
                gridFormRows={gridFormRows}
                submit={submit} />
        </FormProvider>
    );
};
