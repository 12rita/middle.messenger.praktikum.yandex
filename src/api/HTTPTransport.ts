import { METHODS, TRequest } from './types.ts';
import { queryStringify } from '@shared/utils';
import { setError } from '@components/Toaster/Toaster.ts';

export class HTTPTransport {
    get: TRequest = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };

    put: TRequest = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };
    post: TRequest = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };
    delete: TRequest = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    onError = (e: string) => {
        setError(e);
        console.log(e);
        return;
    };

    request: TRequest = (url, options, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const { method, data, headers = {}, baseUrl } = options;
            if (!method) {
                reject('No method');
                return;
            }
            const base = baseUrl
                ? baseUrl
                : 'https://ya-praktikum.tech/api/v2/';
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${base}${url}${queryStringify(data)}`
                    : base + url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key] as string);
            });

            xhr.onload = () => {
                if (xhr.status <= 300) resolve(xhr);
                else {
                    console.log(this);
                    this.onError(xhr.response);
                    reject(xhr.response);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet && !data) {
                xhr.send();
            } else {
                xhr.send(data as unknown as XMLHttpRequestBodyInit);
            }
        });
    };
}

export const api = new HTTPTransport();
