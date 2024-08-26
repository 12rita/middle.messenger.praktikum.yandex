export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

interface IError {
    text: string;
    [key: string]: string;
}

export interface IOptions {
    headers?: TObject;
    data?: TObject | FormData | string;
    timeout?: number;
    mode?: string;
    method?: keyof typeof METHODS;
    baseUrl?: string;
    credentials?: string;
    onError?: (error: IError) => void;
}

export type TRequest = (
    url: string,
    options?: IOptions,
    timeout?: number
) => Promise<unknown>;
