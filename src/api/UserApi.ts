import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store from '@shared/stores/Store.ts';

export enum USER_ROUTES {
    users = 'user/search/'
}

class UserAPIClass extends BaseAPI {
    search({ login }: { login: string }) {
        api.post(USER_ROUTES.users, {
            data: JSON.stringify({ login })
        }).then(data => {
            store.set('chat.users', data);
            // .set({})(this.children.users as Block)
            // .setProps({ users: data });
        });
    }
}

export const userApi = new UserAPIClass();
