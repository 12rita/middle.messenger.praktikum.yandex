import { IUserListProps } from './types.ts';
import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { UserItem } from '@components/UserList/UserItem.ts';
import { IUser } from '@shared/types.ts';
import { deepClone, isEqual } from '@shared/utils';
import { userApi } from '@api';
import { connect } from '@shared/stores';
import { IState } from '@components/NewChat/types.ts';
import store from '@shared/stores/Store.ts';

export class UserListBase extends Block {
    users: IUser[] = [];
    active = new Set();

    constructor() {
        const preLoadedUsers = (store.getState().chat as IState)?.users ?? [];

        const usersBlock =
            [...preLoadedUsers].map(
                user => new UserItem({ user, onClick: () => {} })
            ) ?? [];

        super('ul', {
            className: styles.list,
            usersBlock
        });

        this.users = [...preLoadedUsers];

        this.init();
    }

    init = () => {
        userApi.search({ login: '' });
    };

    componentDidUpdate(oldProps: IUserListProps, newProps: IUserListProps) {
        if (!isEqual(oldProps.users, newProps.users)) {
            const newUsers = deepClone(this.users);

            newUsers.push(...deepClone(newProps.users));

            if (newUsers.length) {
                this.setProps({
                    usersBlock: newUsers.map(
                        user =>
                            new UserItem({
                                user,
                                active: this.active.has(user.id),
                                onClick: () => {
                                    this.setActive(user);
                                }
                            })
                    ) as unknown as Block[]
                });
            }

            this.users = newUsers;
            return true;
        }

        return false;
    }

    setActive = (user: IUser) => {
        if (this.active.has(user.id)) {
            this.active.delete(user.id);
        } else this.active.add(user.id);
    };

    render() {
        return this.compile(template, {
            ...this.props,
            ...this.children
        });
    }
}
const withStore = connect(state => ({
    users: (state?.chat as IState)?.users
}));
export const UserList = withStore(UserListBase);
