import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store from '@shared/stores/Store.ts';
import { IUser } from '@shared/types.ts';
import { setError } from '@components/Toaster';

export enum USER_ROUTES {
    users = 'user/search/',
    profile = 'user/profile/',
    avatar = 'user/profile/avatar/',
    password = 'user/password/'
}

class UserAPIClass extends BaseAPI {
    search({ login }: { login: string }) {
        api.post(USER_ROUTES.users, {
            data: JSON.stringify({ login }),
            onError: setError
        }).then(data => {
            store.set('chat.users', data);
            // .set({})(this.children.users as Block)
            // .setProps({ users: data });
        });
    }

    updateProfile = (data: IUser) => {
        api.put(USER_ROUTES.profile, {
            data: JSON.stringify(data),
            onError: setError
        });
    };

    updateAvatar = (avatar: FormData) => {
        return api.put(USER_ROUTES.avatar, {
            data: avatar,
            headers: {},
            onError: setError
        });
    };

    updatePassword = ({
        oldPassword,
        newPassword
    }: {
        oldPassword: string;
        newPassword: string;
    }) => {
        return api.put(USER_ROUTES.password, {
            data: JSON.stringify({ oldPassword, newPassword }),
            onError: setError
        });
    };
}

export const userApi = new UserAPIClass();
