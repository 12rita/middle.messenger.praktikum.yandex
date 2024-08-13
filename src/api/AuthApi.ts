import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store from '@shared/stores/Store.ts';

export enum AUTH_ROUTES {
    user = 'auth/user/',
    logout = 'auth/logout/'
}

class AuthAPIClass extends BaseAPI {
    checkAuthorise = () => {
        api.get(AUTH_ROUTES.user)
            .then(data => {
                store.set('user', data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {});
    };

    logout = () => {
        return api.post(AUTH_ROUTES.logout);
    };
}

export const authApi = new AuthAPIClass();
