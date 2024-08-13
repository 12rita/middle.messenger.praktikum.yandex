import { IExistedUserListProps } from './types.ts';
import { existedTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { UserItem } from '@components/UserList/UserItem.ts';
import { IUser } from '@shared/types.ts';

import { chatApi } from '@api';

import { SubmitButton } from '@components';

export class ExistedUserList extends Block<IExistedUserListProps> {
    users: IUser[] = [];
    active = new Set();

    constructor(props: IExistedUserListProps) {
        const deleteButton = new SubmitButton({
            label: 'Удалить пользователей',
            disabled: true,
            color: 'danger',
            onClick: () => {
                this.onDelete();
            }
        });

        super('ul', {
            ...props,
            deleteButton,
            className: styles.list,
            title: 0
        });

        this.users = [];

        this.init();
    }

    init = () => {
        chatApi.getChatUsers(this.props.id).then(data => {
            this.users = data as IUser[];
            this.setProps({
                usersBlock: (data as IUser[]).map(
                    user =>
                        new UserItem({
                            user,
                            onClick: () => {
                                this.setActive(user);
                            }
                        })
                ) as unknown as Block[]
            });
        });
    };

    onDelete = () => {
        chatApi.deleteChatUsers({
            users: Array.from(this.active) as number[],
            id: this.props.id
        });
    };

    setActive = (user: IUser) => {
        if (this.active.has(user.id)) {
            this.active.delete(user.id);
        } else this.active.add(user.id);

        (this.children.deleteButton as unknown as Block).setProps({
            disabled: !this.active.size
        });
    };

    render() {
        return this.compile(existedTemplate, {
            ...this.props,
            ...this.children,
            title: this.users?.length ?? 0
        });
    }
}
