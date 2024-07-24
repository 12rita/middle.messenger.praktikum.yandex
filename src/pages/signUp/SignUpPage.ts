import { Block, Form } from '../../components';
import { template } from './template.ts';
import global from '../../globalStyles.module.css';
import { IPage, PAGES } from '../../shared';

const formFields = [
    { title: 'Почта', value: 'email' },
    { title: 'Имя', value: 'first_name' },
    { title: 'Фамилия', value: 'second_name' },
    { title: 'Логин', value: 'login' },
    { title: 'Телефон', value: 'phone' },
    {
        title: 'Пароль',
        value: 'password',
        type: 'password' as TInputType
    },
    {
        title: 'Пароль (ещё раз)',
        value: 'password',
        type: 'password' as TInputType
    }
];

export class SignUpPage extends Block {
    constructor({ history }: IPage) {
        const onSignIn = () => {
            history.emit('push', PAGES.signIn);
        };

        const onSignUp = () => {
            history.emit('push', PAGES.chats);
        };

        const formId = 'signUpForm';
        const form = new Form({
            id: formId,
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти',
            textButtonLabel: 'Войти',
            onTextClick: onSignIn,
            onSubmitClick: onSignUp,
            submitButtonLabel: 'Зарегестрироваться',
            size: 'big'
        });
        super('main', { form, className: global.layout });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
