import { METHODS, TRequest } from './types.ts';
import { queryStringify } from '../shared/utils';

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

    request: TRequest = (url, options, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const {
                method,
                data,
                headers = {
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                credentials = 'include',
                onError,
                baseUrl
            } = options || {};
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
                    ? `${base}${url}${queryStringify(data as TObject)}`
                    : base + url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key] as string);
            });
            xhr.withCredentials = credentials === 'include';

            xhr.onload = () => {
                if (xhr.status <= 400) {
                    try {
                        const res = JSON.parse(xhr.responseText);
                        resolve(res);
                    } catch {
                        resolve(xhr);
                    }
                } else {
                    try {
                        const errorMessage = JSON.parse(xhr.response);
                        const { reason, error } = errorMessage;
                        onError && onError({ title: error, text: reason });
                    } catch (err) {
                        onError && onError({ text: xhr.response });
                    }
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
