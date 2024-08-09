import { IUserListProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { UserItem } from '@components/UserList/UserItem.ts';
import { IUser } from '@shared/types.ts';
import { deepClone, isEqualArrays } from '@shared/utils';

export class UserList extends Block<IUserListProps> {
    users: IUser[] = [];
    active = new Set();

    constructor(props: IUserListProps) {
        const usersBlock = props.users.map(
            user => new UserItem({ user, onClick: () => {} })
        );

        super('ul', {
            ...props,
            className: styles.list,
            usersBlock
        });

        this.users = [...props.users];
    }

    componentDidUpdate(oldProps: IUserListProps, newProps: IUserListProps) {
        if (!isEqualArrays(oldProps.users ?? [], newProps.users ?? [])) {
            this.users = deepClone(newProps.users);
            this.children.usersBlock = this.users.map(
                user =>
                    new UserItem({
                        user,
                        onClick: () => {
                            this.setActive(user);
                        }
                    })
            ) as unknown as Block[];
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
