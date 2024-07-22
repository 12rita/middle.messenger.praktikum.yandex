import { Block, Form } from '../../components';
import { template } from './template.ts';

export class SignInPage extends Block {
    constructor() {
        // const handleClick = () => {
        //     console.log('Click');
        //     const link = document.createElement('a');
        //     link.href = '../chats/Chats.html';
        //     link.click();
        // };
        const formFields = [
            { title: 'Логин', value: 'login' },
            {
                title: 'Пароль',
                value: 'password',
                type: 'password' as TInputType
            }
        ];
        const formId = 'signInForm';
        const form = new Form({
            id: 'signInForm',
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти'
        });
        super('div', { form });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}

export const signInPage = new SignInPage();

// document.addEventListener('DOMContentLoaded', () => {
//     const formId = 'signInForm' as TFormKey;
//
//     const form: HTMLFormElement = document.forms[formId] as HTMLFormElement;
//
//     const formFields = [
//         { title: 'Логин', value: 'login' },
//         { title: 'Пароль', value: 'password', type: 'password' }
//     ];
//
//     if (form)
//         formFields.forEach(field => {
//             form.innerHTML += input({
//                 type: (field.type || 'text') as TInputType,
//                 name: field.value,
//                 placeholder: field.title
//             });
//         });
// });
