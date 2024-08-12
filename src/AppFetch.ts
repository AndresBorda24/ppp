import axios, { AxiosRequestConfig } from "axios";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FecthConfig = {
    url: string;
    body: any;
    settings: AxiosRequestConfig
}

const AX = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const METHOD_HANDLERS = {
    GET: <T>({url, settings}: FecthConfig) => AX.get<T>(url, settings),
    DELETE: <T>({url, settings}: FecthConfig) => AX.delete<T>(url, settings),
    POST: <T>({url, body, settings}: FecthConfig) => AX.post<T>(url, body, settings),
    PUT: <T>({url, body, settings}: FecthConfig) => AX.put<T>(url, body, settings),
    PATCH: <T>({url, body, settings}: FecthConfig) => AX.patch<T>(url, body, settings)
};

/** Realiza una solicitud HTTP */
export async function appFetch<T>(method: Method, { url, body, settings = {} }: FecthConfig) {
    let error:Object|null = null;
    let data:T|null = null;

    try {
        const handler = METHOD_HANDLERS[method];
        const { data: d } = await handler<T>({url, body, settings});
        data = d;
    } catch (e) {
        error = e;
    }

    return { error, data };
}
