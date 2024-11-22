import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL, REFRESH_TOKEN } from "@constants";
import { Cookies } from "react-cookie";

const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

export const client = axios.create(config);

/**
 * exec get.
 * @returns 
 */
export const get = async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<any>): Promise<R> => {
    return client.get<T, R>(url, config);
};

/**
 * exec post.
 * @returns 
 */
export const post = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<any>): Promise<R> => {
    return client.post<T, R>(url, data, config);
};

/**
 * exec post.
 * @returns 
 */
export const refreshToken = async (): Promise<any> => {
    const cookies = new Cookies();
    const refresh = cookies.get('refresh');
    const data = (await post(REFRESH_TOKEN, { refresh: refresh })).data;
    cookies.set('access', data.access);
    cookies.set('refresh', data.refresh);
    return data;
};

/**
 * exec get.
 * @returns 
 */
export const getWithToken = async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig<any>): Promise<R> => {
    const tokens = (await refreshToken());
    return get<T, R>(
        url,
        tokens.access ? { 
            ...config,
            headers: {
                Authorization: `JWT ${tokens.access}`
            }
        } : config
    );
};

/**
 * exec post.
 * @returns 
 */
export const postWithToken = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<any>): Promise<R> => {
    const tokens = (await refreshToken());
    return post<T, R>(url, data, tokens.access ? { 
        ...config,
        headers: {
            Authorization: `JWT ${tokens.access}`
        }
    } : config);
};
