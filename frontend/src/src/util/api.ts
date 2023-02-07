import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "@/config/constants";

const config: AxiosRequestConfig = {
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
};

const client = axios.create(config);

export const  fetchToken = (data: any) => {
    return client.post('token/', data);
};

export const register = (data: any) => {
    return client.post('account/register/', data);
};