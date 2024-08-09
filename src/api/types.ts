export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

export interface IOptions {
    headers?: TObject;
    data?: TObject | FormData | string;
    timeout?: number;
    mode?: string;
    method?: keyof typeof METHODS;
    baseUrl?: string;
    credentials?: string;
}

export type TRequest = (
    url: string,
    options: IOptions,
    timeout?: number
) => Promise<unknown>;
