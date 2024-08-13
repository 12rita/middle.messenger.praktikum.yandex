import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store from '@shared/stores/Store.ts';
import { IUser } from '@shared/types.ts';

export enum USER_ROUTES {
    users = 'user/search/',
    user = 'auth/user/',
    profile = 'user/profile/',
    avatar = 'user/profile/avatar/',
    password = 'user/password/'
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

    checkAuthorise = () => {
        api.get(USER_ROUTES.user)
            .then(data => {
                store.set('user', data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {});
    };

    updateProfile = (data: IUser) => {
        api.put(USER_ROUTES.profile, { data: JSON.stringify(data) });
    };

    updateAvatar = (avatar: FormData) => {
        return api.put(USER_ROUTES.avatar, { data: avatar, headers: {} });
    };

    updatePassword = ({
        oldPassword,
        newPassword
    }: {
        oldPassword: string;
        newPassword: string;
    }) => {
        return api.put(USER_ROUTES.password, {
            data: JSON.stringify({ oldPassword, newPassword })
        });
    };
}

export const userApi = new UserAPIClass();
