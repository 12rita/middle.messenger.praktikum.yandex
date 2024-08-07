import { METHODS, TRequest } from './types.ts';
import { queryStringify } from '../shared';

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
            const { method, data, headers = {} } = options;
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key] as string);
            });

            xhr.onload = function () {
                resolve(xhr);
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
