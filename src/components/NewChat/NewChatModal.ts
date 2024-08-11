import { INewChatProps, IState } from './types.ts';
import { modalTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { Input, SubmitButton } from '@components';
import { chatApi, userApi } from '@api';
import { UserList } from '@components/UserList';
import { connect } from '@shared/stores';
import { isEqual } from '@shared/utils';

class NewChatModalBase extends Block<INewChatProps> {
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
        userApi.search({ login: '' });
    };

    onCreate = () => {
        const title = (this.children.inputName as unknown as Input).value;
        const users = Array.from(
            (this.children.users as unknown as UserList).active
        ) as number[];

        chatApi.createNewChat({ title, users, onClose: this.props.onClose });
    };

    onSearch = (e: Event) => {
        setTimeout(() => {
            userApi.search({ login: (e.target as HTMLInputElement)?.value });
        }, 300); //debounce
    };

    componentDidUpdate(oldProps: IState, newProps: IState) {
        if (!isEqual(oldProps.users, newProps.users)) {
            (this.children.users as Block).setProps({ users: newProps.users });
            return true;
        }
        return false;
    }

    render() {
        return this.compile(modalTemplate, {
            ...this.props,
            ...this.children
        });
    }
}

const withStore = connect(state => ({ users: (state?.chat as IState)?.users }));
export const NewChatModal = withStore(NewChatModalBase);
