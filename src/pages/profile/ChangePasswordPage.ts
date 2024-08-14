import { Avatar, BackButton, ProfileForm, SubmitButton } from '@components';
import { IProfileProps } from './types.ts';
import styles from './styles.module.css';
import { template } from './template.ts';
import { IForm } from '@components/Form/types.ts';
import { IFormField, IUser, TChangePasswordFields } from '@shared/types.ts';
import { Block, IBlock, IPage, IProps, PAGES } from '@shared/components';
import store from '@shared/stores/Store.ts';
import { userApi } from '@api';

const formFields: IFormField<TChangePasswordFields>[] = [
    {
        title: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        value: '',
        disabled: false
    },
    {
        title: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        value: '',
        disabled: false
    },
    {
        title: 'Повторите новый пароль',
        name: 'newPasswordRepeat',
        type: 'password',
        value: '',
        disabled: false
    }
];
export class ChangePasswordPage extends Block<IProps, IProfileProps> {
    history;
    constructor({ history }: IPage) {
        const formId = 'changePasswordForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            key: formId,
            handleSubmit: () => {}
        });
        const user = store.getState().user as IUser;

        const avatar = new Avatar({ src: user.avatar });

        const backButton = new BackButton({
            onClick: () => {
                history && history.back();
            }
        });

        const buttonBlock = new SubmitButton({
            label: 'Сохранить',
            onClick: () => {
                this._handleSubmit();
            }
        });

        super('main', {
            form,
            backButton,
            buttonBlock,
            avatar,
            className: styles.layout
        });
        this.history = history;
    }

    _handleSubmit = () => {
        const values = (this.children.form as unknown as IForm).values;
        const { oldPassword, newPassword, newPasswordRepeat } = values;
        if (newPassword !== newPasswordRepeat) {
            this.setProps({ error: 'Пароли не совпадают' });
        } else {
            this.setProps({ error: '' });
            userApi
                .updatePassword({
                    oldPassword: oldPassword as string,
                    newPassword: newPassword as string
                })
                .then(() => {
                    this.history && this.history.go(PAGES.profile);
                });
        }
    };

    render() {
        const user = store.getState().user as IUser;
        return this.compile(template, {
            ...this.props,
            buttonBlock: this.children.buttonBlock as IBlock,
            avatar: this.children.avatar as IBlock,
            form: this.children.form as IBlock,
            backButton: this.children.backButton as IBlock,
            title: user.display_name
        });
    }
}
