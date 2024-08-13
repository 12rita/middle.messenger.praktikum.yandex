import { IExistedUserListProps } from './types.ts';
import { existedTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { UserItem } from '@components/UserList/UserItem.ts';
import { IUser } from '@shared/types.ts';
import { deepClone, isEqual } from '@shared/utils';
import { chatApi } from '@api';
import { connect } from '@shared/stores';
import { IState } from '@components/NewChat/types.ts';

export class ExistedUserListBase extends Block<IExistedUserListProps> {
    users: IUser[] = [];
    active = new Set();

    constructor(props: IExistedUserListProps) {
        super('ul', {
            ...props,
            className: styles.list,
            title: 0
        });

        this.users = [];

        this.init();
    }

    init = () => {
        chatApi.getChatUsers(this.props.id);
    };

    componentDidUpdate(
        oldProps: IExistedUserListProps,
        newProps: IExistedUserListProps
    ) {
        if (!isEqual(oldProps.existedUsers, newProps.existedUsers)) {
            const newUsers = deepClone(this.users);

            const existed = newProps.existedUsers;
            newUsers.unshift(...existed);
            existed.forEach(user => {
                this.active.add(user.id);
            });

            if (newUsers.length) {
                this.setProps({
                    usersBlock: newProps.existedUsers.map(
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
        return this.compile(existedTemplate, {
            ...this.props,
            ...this.children,
            title: this.users?.length ?? 0
        });
    }
}
const withStore = connect(state => ({
    existedUsers: (state?.chat as IState)?.existedUsers
}));
export const ExistedUserList = withStore(ExistedUserListBase);
