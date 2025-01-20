import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { LOCAL_STORAGE_AUTH_KEY } from "./constants";
import { RequestFormError } from "./types";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FecthConfig = {
    url: string;
    body?: any;
    settings?: AxiosRequestConfig
}

const AX = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

AX.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (token && typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) =>  Promise.reject(error));

const METHOD_HANDLERS = {
    GET: <T>({url, settings}: FecthConfig) => AX.get<T>(url, settings),
    DELETE: <T>({url, settings}: FecthConfig) => AX.delete<T>(url, settings),
    POST: <T>({url, body, settings}: FecthConfig) => AX.post<T>(url, body, settings),
    PUT: <T>({url, body, settings}: FecthConfig) => AX.put<T>(url, body, settings),
    PATCH: <T>({url, body, settings}: FecthConfig) => AX.patch<T>(url, body, settings)
};

/** Realiza una solicitud HTTP */
export async function appFetch<T, E = RequestFormError>(
    method: Method,
    { url, body = null, settings = {} }: FecthConfig
): Promise<{
    data: T|null,
    error: E|null
}> {
    let error:E|null = null;
    let data:T|null = null;

    try {
        const handler = METHOD_HANDLERS[method];
        const { data: d } = await handler<T>({url, body, settings});
        data = d;
    } catch (e) {
        error = (e as AxiosError).response?.data as E;
    }

    return { error, data };
}
