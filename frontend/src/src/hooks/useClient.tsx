import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { client, get as clientGet, post as clientPost } from "@utils/client";
import { setLoading } from "@features/loading/loading.slice";
import { REFRESH_TOKEN } from "@app/constants/ApiUrls";

interface UseClientResult {
    get: <T = any, R = AxiosResponse<T>>(url: string, showLoading?: boolean, config?: AxiosRequestConfig<any>) => Promise<R>;
    post: <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, showLoading?: boolean, config?: AxiosRequestConfig<any>) => Promise<R>;
}

export const useClient = (errorPage: boolean = false): UseClientResult => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const interceptor = client.interceptors.response.use(
            (response) => {
                dispatch(setLoading(false));
                return response;
            },
            (error) => {
                dispatch(setLoading(false));
                if (errorPage) {
                    switch(error.response.status)
                    {
                        case HttpStatusCode.UnprocessableEntity:
                            break;
                        default:
                            navigate(`/error/${error.response.status}`);
                            break;
                    }
                }

                return Promise.reject(error);
            }
        )

        return () => {
            client.interceptors.response.eject(interceptor);
        };
    }, [errorPage, cookies, navigate, dispatch]);

    /**
     * _refreshToken methods
     */
    const _refreshToken = useCallback(
        async (config?: AxiosRequestConfig<any>) => {
            if (cookies.access) {
                await clientPost(REFRESH_TOKEN, { refresh: cookies.refresh }, config)
                    .then(({ data }) => {
                        setCookie('access', data.access);
                        setCookie('refresh', data.refresh);
                    })
                    .catch(() => {
                        navigate(`/error/${HttpStatusCode.Unauthorized}`);
                    });
            }
        }
    , [cookies]);

    /**
     * get methods
     */
    const get = useCallback(
        async <T = any, R = AxiosResponse<T>>(url: string, showLoading?: boolean, config?: AxiosRequestConfig<any>): Promise<R> => {
            if (showLoading) dispatch(setLoading(true));
            await _refreshToken();
            return clientGet(
                url,
                cookies.access ? { 
                    ...config,
                    headers: {
                        Authorization: `JWT ${cookies.access}`
                    }
                } :
                config
            );
        }
    , [cookies]);
    
    /**
     * post methods
     */
    const post = useCallback(
        async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, showLoading?: boolean, config?: AxiosRequestConfig<any>): Promise<R> => {
            if (showLoading) dispatch(setLoading(true));
            await _refreshToken();
            return clientPost(
                url,
                data,
                cookies.access ? { 
                    ...config,
                    headers: {
                        Authorization: `JWT ${cookies.access}`
                    }
                } :
                config
            );
        }
    , [cookies]);

    return { get, post };
}
