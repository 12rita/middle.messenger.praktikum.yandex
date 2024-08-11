import { api, ROUTES } from '@api';
import { IUser } from '@shared/types.ts';

export class User {
    data: IUser | null = null;
    authorised = false;

    checkAuthorise = (callback: TVoid) => {
        api.get(ROUTES.user)
            .then(data => {
                this.data = data as IUser;
                this.authorised = true;
                callback();
            })
            .catch(e => {
                console.log(e);
            });
    };
}
export const user = new User();
