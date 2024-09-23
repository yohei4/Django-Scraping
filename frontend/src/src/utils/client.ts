import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "@constants";

const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
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
