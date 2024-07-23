import { Block, Form } from '../../components';
import { template } from './template.ts';

export class SignUpPage extends Block {
    constructor() {
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
        const formId = 'signUpForm';
        const form = new Form({
            id: formId,
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти',
            textButtonLabel: 'Войти',
            href: '../signIn/SignInPage.html',
            submitButtonLabel: 'Зарегестрироваться'
        });
        super('div', { form });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}

export const signUpPage = new SignUpPage();

// document.addEventListener('DOMContentLoaded', () => {
//     const form: HTMLFormElement = document.forms[
//         'signUpForm' as TFormKey
//     ] as HTMLFormElement;
//
//     const formFields = [
//         { title: 'Почта', value: 'email' },
//         { title: 'Имя', value: 'first_name' },
//         { title: 'Фамилия', value: 'second_name' },
//         { title: 'Логин', value: 'login' },
//         { title: 'Телефон', value: 'phone' },
//         { title: 'Пароль', value: 'password', type: 'password' },
//         { title: 'Пароль (ещё раз)', value: 'password', type: 'password' }
//     ];
//     if (form)
//         formFields.forEach(field => {
//             form.innerHTML += input({
//                 type: (field.type || 'text') as TInputType,
//                 name: field.value,
//                 placeholder: field.title
//             });
//         });
// });
