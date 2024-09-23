import { HttpStatusCode } from 'axios';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { IUser } from '@app/interfaces/IUser';
import { LOGIN } from '@app/constants/ApiUrls';
import { LoginTemplate } from '@app/components/templates/LoginTemplate';

export const LoginLoader = async (): Promise<unknown> => {
    return null;
};

export const Login = () => {
    const navigate = useNavigate();
    const methods = useForm<IUser>({});
    const [cookies, setCookie, removeCookie] = useCookies();
    const [message, setMessage] = useState<string | undefined>();
    const { post } = useClient(false);

    // 初期処理 LOGOUT
    useLayoutEffect(() => {
        (async () => {
            removeCookie('access');
            removeCookie('refresh');
        })();
    }, []);

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser) => {
        setMessage(undefined);
        await post(LOGIN, data)
            .then((res) => {
                setCookie('access', res.data.access);
                setCookie('refresh', res.data.refresh);
                navigate('/');
            })
            .catch(({ response: res }) => {
                setMessage(res.statusText);
                switch (res.status) {
                    case HttpStatusCode.UnprocessableEntity:
                        Object.entries((res.data)).forEach(([key, messages]) => {
                            methods.setError(key as keyof IUser, { message: (messages as string[])[0] });
                        });
                        break;
                }
            });
    };

    return (
        <FormProvider {...methods}>
            <LoginTemplate
                message={message}
                LoginFormProps={{ onSubmit: methods.handleSubmit(submit) }}
            />
        </FormProvider>
    );
};
