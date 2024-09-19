import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { IUser } from '@app/admin/interfaces/IUser';
import { useMenu, useSystem, useUser } from '@app/admin/hooks';
import { LOGIN, LOGOUT } from '@app/admin/constants/ApiUrls';
import { LoginTemplate } from '@app/admin/components/templates/LoginTemplate';

export const LoginLoader = async (): Promise<unknown> => {
    return null;
};

export const Login = () => {
    const navigate = useNavigate();
    const methods = useForm<IUser>({});
    const [message, setMessage] = useState<string | undefined>();
    const { updateUser } = useUser();
    const { updateSystem } = useSystem();
    const { updateMenu } = useMenu();
    const { post } = useClient(false);

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser) => {
        setMessage(undefined);
        await post(LOGIN, data)
            .then((res) => {
                updateUser(res.data.user);
                updateSystem(res.data.system);
                updateMenu(res.data.menu);
                navigate('/');
            })
            .catch(({ response: res }) => {
                setMessage(res.data.message);
                switch (res.status)
                {
                    case HttpStatusCode.UnprocessableEntity:
                        Object.entries((res.data.errors)).forEach(([key, messages]) => {
                            methods.setError(key as keyof IUser, { message: (messages as string[])[0] });
                        });
                        break;
                }
            });
    };


    // 初期処理 LOGOUT
    useEffect(() => {
        (async () => {
            await post(LOGOUT);
        })();
    }, []);

    return (
        <FormProvider {...methods}>
            <LoginTemplate message={message} LoginFormProps={{ onSubmit: methods.handleSubmit(submit) }} />
        </FormProvider>
    );
};
