export enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

export interface IOptions {
    headers?: TObject;
    data?: TObject;
    timeout?: number;
    method?: keyof typeof METHODS;
}

export type TRequest = (
    url: string,
    options: IOptions,
    timeout?: number
) => Promise<unknown>;
