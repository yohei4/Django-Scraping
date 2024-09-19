import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios";
import { client, get as clientGet, post as clientPost } from "@/utils/client";
import { setLoading } from "@/features/loading/loading.slice";

interface UseClientResult {
    get: <T = any, R = AxiosResponse<T>>(url: string, showLoading?: boolean, config?: AxiosRequestConfig<any>) => Promise<R>;
    post: <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, showLoading?: boolean, config?: AxiosRequestConfig<any>) => Promise<R>;
}

export const useClient = (errorPage: boolean = false): UseClientResult => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    }, [errorPage, navigate, dispatch]);

    /**
     * get methods
     */
    const get = useCallback(
        async <T = any, R = AxiosResponse<T>>(url: string, showLoading?: boolean, config?: AxiosRequestConfig<any>): Promise<R> => {
            if (showLoading) dispatch(setLoading(true));
            return clientGet(url, config);
        }
    , []);
    
    /**
     * post methods
     */
    const post = useCallback(
        async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, showLoading?: boolean, config?: AxiosRequestConfig<any>): Promise<R> => {
            if (showLoading) dispatch(setLoading(true));
            return clientPost(url, data, config);
        }
    , []);

    return { get, post };
}
