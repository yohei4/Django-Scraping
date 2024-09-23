import { HttpStatusCode } from 'axios';
import { useLayoutEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { useClient } from '@hooks';
import { useUser } from '@app/hooks';
import { IUser } from '@app/interfaces/IUser';
import { REGISTER } from '@app/constants/ApiUrls';
import { SignUpTemplate } from '@app/components/templates/SignUpTemplate';

export const SignUpLoader = async (): Promise<unknown> => {
    return null;
};

export const SignUp = () => {
    const navigate = useNavigate();
    const methods = useForm<IUser>({});
    const [message, setMessage] = useState<string | undefined>();
    const [severity, setSeverity] = useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined>();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { post } = useClient(false);
    const { updateUser } = useUser();

    // 初期処理 LOGOUT
    useLayoutEffect(() => {
        (async () => {
            removeCookie('access');
            removeCookie('refresh');
        })();
    }, []);

    // submit 処理
    const submit: SubmitHandler<IUser> = async (data: IUser) => {
        setSeverity(undefined);
        setMessage(undefined);
        await post(REGISTER, data)
            .then((res) => {
                setSeverity('success');
                setMessage(res.statusText);
                updateUser(res.data.user);
                setCookie('access', res.data.access);
                setCookie('refresh', res.data.refresh);
                navigate('/');
            })
            .catch(({ response: res }) => {
                setSeverity('error');
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
            <SignUpTemplate
                severity={severity}
                message={message}
                registerFormProps={{ onSubmit: methods.handleSubmit(submit) }}
            />
        </FormProvider>
    );
};
