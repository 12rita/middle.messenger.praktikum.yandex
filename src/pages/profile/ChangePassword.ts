import {
    BackButton,
    Block,
    FileUploader,
    IBlock,
    IFormField,
    IProps,
    ProfileForm,
    SubmitButton
} from '../../components';
import { user } from '../../const.ts';

import { IProfileProps } from './types.ts';
import { IPage, PAGES } from '../types.ts';
import styles from './styles.module.css';
import { template } from './template.ts';

const formFields: IFormField[] = [
    {
        title: 'Старый пароль',
        name: 'oldPassword',
        value: user.password,
        disabled: false
    },
    {
        title: 'Новый пароль',
        name: 'newPassword',
        value: user.password,
        disabled: false
    },
    {
        title: 'Повторите новый пароль',
        name: 'newPassword',
        value: user.password,
        disabled: false
    }
];
export class ChangePassword extends Block<IProps, IProfileProps> {
    history;
    constructor({ history }: IPage) {
        const formId = 'changePasswordForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            name: formId
        });

        const avatar = new FileUploader({
            label: 'Поменять аватар'
        }) as IBlock;

        const backButton = new BackButton({
            onClick: () => {
                history.emit('push', PAGES.profile);
            }
        });

        const buttonBlock = new SubmitButton({
            label: 'Сохранить',
            onClick: () => {
                this._saveData();
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

    _saveData = () => {
        console.log(this.children.form.values);
        this.history.emit('push', PAGES.profile);
    };

    componentDidUpdate() {
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.children,
            ...this.props,
            title: user.display_name
        });
    }
}
