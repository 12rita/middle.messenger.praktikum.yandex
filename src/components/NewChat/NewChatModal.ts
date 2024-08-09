import { INewChatProps } from './types.ts';
import { modalTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { Input, SubmitButton } from '@components';
import { api, ROUTES } from '@api';
import { UserList } from '@components/UserList';

export class NewChatModal extends Block<INewChatProps> {
    constructor(props: INewChatProps) {
        const input = new Input({
            type: 'text',
            name: 'search',
            className: styles.search,
            placeholder: '🔍 Найти пользователей',
            onChange: e => {
                this.onSearch(e);
            }
        });

        const submitButton = new SubmitButton({
            label: 'Создать',
            disabled: true,
            onClick: () => {
                this.onCreate();
            }
        });

        const inputName = new Input({
            type: 'text',
            name: 'name',
            className: styles.search,
            placeholder: 'Название чата',
            onChange: e => {
                const value = (e.target as HTMLInputElement)?.value;
                if (!value) {
                    submitButton.setProps({ disabled: true });
                } else submitButton.setProps({ disabled: false });
            }
        });

        const users = new UserList({ users: [] });

        super('div', {
            ...props,
            input,
            className: styles.modal,
            users,
            submitButton,
            inputName,
            events: {
                ...(props.onClose && { click: props.onClose })
            }
        });

        this.init();
    }

    init = () => {
        api.post(ROUTES.users, {
            data: JSON.stringify({ login: '' })
        }).then(data => {
            (this.children.users as Block).setProps({ users: data });
        });
    };

    onCreate = () => {
        api.post(ROUTES.chats, {
            data: JSON.stringify({
                title: (this.children.inputName as unknown as Input).value
            })
        }).then(data => {
            const activeUsers = (this.children.users as unknown as UserList)
                .active;

            const addUsersData = {
                users: Array.from(activeUsers),
                chatId: (data as { id: number }).id
            };
            api.put(ROUTES.addUsers, {
                data: JSON.stringify(addUsersData)
            }).then(() => {
                this.props.onClose && this.props.onClose();
            });
        });
    };

    onSearch = (e: Event) => {
        setTimeout(() => {
            const data = {
                login: (e.target as HTMLInputElement)?.value
            };
            api.post(ROUTES.users, {
                data: JSON.stringify(data)
            }).then(data => {
                (this.children.users as Block).setProps({ users: data });
            });
        }, 300); //debounce
    };

    render() {
        return this.compile(modalTemplate, {
            ...this.props,
            ...this.children
        });
    }
}
