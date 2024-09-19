import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/client";
import { InvalidKbn } from "@enums/InvalidKbn";
import { useClient } from "@hooks/useClient";
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { NoticeGeneralTemplate, gridRows } from "@app/admin/components/templates/notice/general/NoticeGeneralTemplate";
import { NOTICE_GENERAL_DETAIL, NOTICE_GENERAL_EDIT } from "@app/admin/constants/ApiUrls";
import { ICommonNotice } from "@app/admin/interfaces/notice/general/ICommonNotice";

export const NoticeGeneralLoader = async ({ params }: LoaderFunctionArgs): Promise<ICommonNotice> => {
    return (await post(NOTICE_GENERAL_DETAIL, params)).data;
}

export const NoticeGeneral = () => {
    const data = useLoaderData() as ICommonNotice;
    const methods = useForm<ICommonNotice>({ defaultValues: data });
    const isInvalid = methods.watch('InvalidKbn');
    const [enableNoticeContents, setEnableNoticeContents] = useState(isInvalid == InvalidKbn.Off);
    const { gridFormRows, setProperty, setFormControlProperty } = useGridFormRows(gridRows);
    const { post } = useClient(true);

    // submit 処理
    const submit: SubmitHandler<ICommonNotice> = async (data: ICommonNotice) => {
        try {
            const notice = (await post(NOTICE_GENERAL_EDIT, data, true)).data;
            Object.entries(notice).forEach(([key, value]) => {
                methods.setValue(key as keyof ICommonNotice, value as any);
            });
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                Object.entries((error.response.data.errors)).forEach(([key, messages]) => {
                    methods.setError(key as keyof ICommonNotice, { message: (messages as string[])[0] });
                });
            }
            return false;
        }
        return true;
    };

    // formData変更時
    useEffect(() => {
        setEnableNoticeContents(isInvalid == InvalidKbn.Off);
    }, [isInvalid]);

    // お知らせ内容の入力可否
    useEffect(() => {
        setProperty('required', enableNoticeContents, x => x.formControls.some(y => y.name === 'Notice'));
        setFormControlProperty('required', enableNoticeContents, x => x.name === 'Notice');
        setFormControlProperty('disabled', !enableNoticeContents, x => x.name === 'Notice');
    }, [enableNoticeContents]);

    return (
        <FormProvider {...methods}>
            <NoticeGeneralTemplate
                formId="entty_update"
                gridFormRows={gridFormRows}
                submit={submit} />
        </FormProvider>
    );
};
