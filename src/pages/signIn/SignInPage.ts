import { Block, Form } from '../../components';
import { template } from './template.ts';
import { PAGES, IPage } from '../../shared';
import global from '../../globalStyles.module.css';

export class SignInPage extends Block {
    constructor(props: IPage) {
        const formFields = [
            { title: 'Логин', value: 'login' },
            {
                title: 'Пароль',
                value: 'password',
                type: 'password' as TInputType
            }
        ];
        const formId = 'signInForm';
        const { history } = props;

        const onTextClick = () => {
            history.emit('push', PAGES.signUp);
        };

        const onSubmitClick = () => {
            history.emit('push', PAGES.chats);
        };

        const form = new Form({
            id: formId,
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти',
            onSubmitClick: onSubmitClick,
            onTextClick: onTextClick,
            textButtonLabel: 'Нет аккаунта?',
            href: '../signUp/SignUpPage.html',
            submitButtonLabel: 'Войти',
            size: 'small'
        });
        super('main', { form, className: global.layout });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
