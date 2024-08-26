import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';
import store from '@shared/stores/Store.ts';
import { IFormValues } from '@shared/types.ts';
import { setError } from '@components/Toaster';

export enum AUTH_ROUTES {
    user = 'auth/user/',
    logout = 'auth/logout/',
    signUp = 'auth/signup/',
    signIn = 'auth/signin/'
}

class AuthAPIClass extends BaseAPI {
    checkAuthorise = () => {
        return api
            .get(AUTH_ROUTES.user, { onError: setError })
            .then(data => {
                store.set('user', data);
                store.set('authorised', true);
            })
            .catch(() => {
                store.set('authorised', false);
            });
    };

    signIn = (data: IFormValues) => {
        return api.post(AUTH_ROUTES.signIn, {
            data: JSON.stringify(data),
            onError: setError
        });
    };

    signUp = (data: IFormValues) => {
        return api.post(AUTH_ROUTES.signUp, {
            data: JSON.stringify(data),
            onError: setError
        });
    };

    logout = () => {
        return api.post(AUTH_ROUTES.logout, { onError: setError });
    };
}

export const authApi = new AuthAPIClass();
