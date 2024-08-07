import {
    BackButton,
    FileUploader,
    ProfileForm,
    SubmitButton
} from '../../components';
import { user } from '../../shared/const.ts';

import { IProfileProps } from './types.ts';
import {
    Block,
    IBlock,
    IFormField,
    IFormValues,
    IPage,
    IProps,
    PAGES,
    TChangePasswordFields
} from '../../shared';
import styles from './styles.module.css';
import { template } from './template.ts';
import { IForm } from '../../components/Form/types.ts';

const formFields: IFormField<TChangePasswordFields>[] = [
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
export class ChangePasswordPage extends Block<IProps, IProfileProps> {
    history;
    constructor({ history }: IPage) {
        const formId = 'changePasswordForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            key: formId,
            handleSubmit: values => {
                handleSubmit(values);
            }
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
        const handleSubmit = (values: IFormValues) => {
            this._handleSubmit(values);
        };
    }

    _saveData = () => {
        console.log((this.children.form as unknown as IForm).values);
        this.history.emit('push', PAGES.profile);
    };

    _handleSubmit = (values: IFormValues) => {
        console.log(values);
    };

    componentDidUpdate() {
        return true;
    }

    render() {
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
