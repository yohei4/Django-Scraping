import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ListTemplate, formControls as Controls } from '@app/admin/components/templates/master/contactPerson/ListTemplate';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { ISearchCondtion } from '@app/admin/interfaces/master/contactPerson';
import { useClient } from '@hooks/useClient';
import { IUser } from '@app/admin/interfaces/master/contactPerson/IUser';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { CONTACT_PERSON_SEARCH } from '@app/admin/constants/ApiUrls';

export const ContactPersonList = () => {
    const condition = useSearchConditionContext();
    const [rows, setRows] = useState<IUser[]>([]);
    const { post } = useClient(true);
    const { formControls } = useDynamicFormControls<ISearchCondtion>(Controls);

    // 初期表示時
    useEffect(() => {
        post(CONTACT_PERSON_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = async (data: ISearchCondtion) => {
        await post(CONTACT_PERSON_SEARCH, data, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    return (
        <ListTemplate
            rows={rows}
            formControls={formControls}
            submit={submit} />
    );
};
