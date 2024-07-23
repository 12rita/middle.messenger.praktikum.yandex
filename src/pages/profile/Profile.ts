import {
    Block,
    IBlock,
    IProps,
    ProfileForm,
    TextButton
} from '../../components';
import { user } from '../../const.ts';

import { template } from '../signUp/template.ts';
import { IProfileProps } from './types.ts';

interface IFormField {
    title: string;
    name: keyof typeof user;
    value: string | number;
}

export class Profile extends Block<IProps, IProfileProps> {
    constructor() {
        const formFields: IFormField[] = [
            { title: 'Почта', name: 'email', value: user['email'] },
            {
                title: 'Имя в чате',
                name: 'first_name',
                value: user['first_name']
            },
            {
                title: 'Фамилия',
                name: 'second_name',
                value: user['second_name']
            },
            {
                title: 'Логин',
                name: 'display_name',
                value: user['display_name']
            },
            { title: 'Телефон', name: 'phone', value: user['phone'] }
        ];
        const formId = 'signUpForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            name: formId
        });

        const textButtonChangePassword = new TextButton({
            label: 'Изменить пароль'
        });
        const textButtonExit = new TextButton({ label: 'Выйти' });
        const textButtonChangeData = new TextButton({
            label: 'Изменить данные'
        });
        super('div', {
            form,
            textButtonChangePassword,
            textButtonExit,
            textButtonChangeData
        });
    }

    render() {
        return this.compile(template, {
            form: this.children.form as IBlock,
            textButtonChangeData: this.children.textButtonChangeData as IBlock,
            textButtonChangePassword: this.children
                .textButtonChangePassword as IBlock,
            textButtonExit: this.children.textButtonExit as IBlock
        });
    }
}

export const profile = new Profile();
//
// document.addEventListener('DOMContentLoaded', () => {
//     const form: HTMLFormElement = document.forms[
//         'profileForm' as TFormKey
//     ] as HTMLFormElement;
//
//     const title = document.getElementById('title');
//
//     const avatar = document.getElementById('profilePicture');
//
//     const changeDataButton = document.getElementById('changeDataButton');
//
//     if (changeDataButton) {
//         changeDataButton.addEventListener('click', () => {
//             Array.from(form.elements).forEach(el => {
//                 (el as HTMLInputElement).disabled = false;
//             });
//
//             if (avatar) avatar.innerHTML = fileUploader({});
//
//             changeDataButton.outerHTML = submitButton({
//                 label: 'Сохранить',
//                 formId: form.id,
//                 href: ''
//             });
//         });
//     }
//
//     if (title) title.innerHTML = user.display_name;
//
//     const formFields: IFormField[] = [
//         { title: 'Почта', name: 'email' },
//         { title: 'Имя в чате', value: 'first_name' },
//         { title: 'Фамилия', value: 'second_name' },
//         { title: 'Логин', value: 'display_name' },
//         { title: 'Телефон', value: 'phone' }
//     ];
//
//     if (form)
//         formFields.forEach(field => {
//             form.innerHTML += profileField({
//                 ...field,
//                 name: field.value,
//                 disabled: true,
//                 key: field.value,
//                 type: 'text',
//                 value: user[field.value]
//             });
//         });
// });
