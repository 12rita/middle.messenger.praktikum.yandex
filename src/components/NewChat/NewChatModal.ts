import { INewChatProps } from './types.ts';
import { modalTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { Input, SubmitButton } from '@components';
import { chatApi, userApi } from '@api';
import { UserList } from '@components/UserList';

import { UserListBase } from '@components/UserList/UserList.ts';
import { ExistedUserList } from '@components/UserList/ExistedUserList.ts';

const avatarId = 'chatAvatarForm';
export class NewChatModal extends Block<INewChatProps> {
    constructor(props: INewChatProps) {
        const { edit, title } = props;
        const input = new Input({
            type: 'text',
            name: 'search',
            className: styles.search,
            placeholder: edit
                ? '🔍 Добавить пользователей'
                : '🔍 Найти пользователей',
            onChange: e => {
                this.onSearch(e);
            }
        });

        const submitButton = new SubmitButton({
            label: edit ? 'Обновить' : 'Создать',
            disabled: !edit,
            onClick: () => {
                this.onCreate();
            }
        });

        const deleteButton = new SubmitButton({
            label: 'Удалить чат',
            className: styles.deleteButton,
            onClick: () => {
                this.onDelete();
            }
        });
        const inputAvatar = new Input({
            name: 'avatar',
            type: 'file',
            id: 'chatAvatar',
            accept: 'image/*',
            className: [styles.avatar]
        });

        const inputName = new Input({
            type: 'text',
            name: 'name',
            className: styles.search,
            value: edit ? title : '',
            placeholder: 'Название чата',
            onChange: e => {
                const value = (e.target as HTMLInputElement)?.value;
                if (!value) {
                    submitButton.setProps({ disabled: true });
                } else submitButton.setProps({ disabled: false });
            }
        });

        const users = new UserList();
        let existedUsers;

        if (props.chatId) {
            existedUsers = new ExistedUserList({ id: props.chatId });
        }

        super('div', {
            ...props,
            input,
            className: styles.modal,
            users,
            submitButton,
            inputName,
            inputAvatar,
            existedUsers,
            ...(props.edit && { deleteButton }),
            avatarForm: avatarId,
            header: edit ? 'Редактировать чат' : 'Новый чат',
            events: {
                ...(props.onClose && { click: props.onClose })
            }
        });
    }

    init = () => {
        userApi.search({ login: '' });
    };

    onDelete = () => {
        this.props.chatId &&
            chatApi.deleteChat(this.props.chatId).then(() => {
                this.props.onClose && this.props.onClose();
            });
    };

    onCreate = () => {
        const title = (this.children.inputName as unknown as Input).value;
        const users = Array.from(
            (this.children.users as unknown as UserListBase).active
        ) as number[];

        const myForm = document.getElementById(avatarId);

        const avatarData = new FormData(myForm as HTMLFormElement);
        const hasAvatar = !!(avatarData.get('avatar') as { size: number })
            ?.size;

        if (this.props.chatId) {
            chatApi
                .updateChat({
                    users,
                    avatar: hasAvatar ? avatarData : undefined,
                    id: this.props.chatId
                })
                .then(() => {
                    this.props.onClose && this.props.onClose();
                });
        } else
            chatApi
                .createNewChat({
                    title,
                    users,
                    avatar: avatarData
                })
                .then(() => {
                    this.props.onClose && this.props.onClose();
                });
    };

    onSearch = (e: Event) => {
        setTimeout(() => {
            userApi.search({ login: (e.target as HTMLInputElement)?.value });
        }, 300); //debounce
    };
    //
    // componentDidUpdate(oldProps: IState, newProps: IState) {
    //     if (!isEqual(oldProps.users, newProps.users)) {
    //         (this.children.users as Block).setProps({ users: newProps.users });
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        return this.compile(modalTemplate, {
            ...this.props,
            ...this.children
        });
    }
}

// const withStore = connect(state => ({
//     users: (state?.chat as IState)?.users
// }));
// export const NewChatModal = withStore(NewChatModalBase);
