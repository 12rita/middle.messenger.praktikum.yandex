import {
    Block,
    IBlock,
    IProps,
    ProfileForm,
    BackButton,
    TextButton,
    FileUploader
} from '../../components';
import { user } from '../../const.ts';
import { template } from './template.ts';
import { IProfileProps } from './types.ts';
import { IPage, PAGES } from '../types.ts';
import styles from './styles.module.css';

interface IFormField {
    title: string;
    name: keyof typeof user;
    value: string | number;
}

export class Profile extends Block<IProps, IProfileProps> {
    constructor({ history }: IPage) {
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

        const avatar = new FileUploader({ label: 'Поменять аватар' });

        const backButton = new BackButton({
            onClick: () => {
                history.emit('push', PAGES.chats);
            }
        });

        const textButtonChangePassword = new TextButton({
            label: 'Изменить пароль'
        });
        const textButtonExit = new TextButton({
            label: 'Выйти',
            type: 'danger',
            onClick: () => {
                history.emit('push', PAGES.signIn);
            }
        });

        const textButtonChangeData = new TextButton({
            label: 'Изменить данные',
            onClick: () => {
                handleChange();
            }
        });

        super('main', {
            form,
            backButton,
            className: styles.layout,
            textButtonChangePassword,
            textButtonExit,
            textButtonChangeData
        });

        const handleChange = () => {
            this._changeData();
        };
    }

    _changeData = () => {
        console.log(this.children.form);
        this.emit('edit');
    };

    render() {
        return this.compile(template, {
            form: this.children.form as IBlock,
            backButton: this.children.backButton as IBlock,
            title: user.display_name,
            avatar: '<img alt="noPicture" src="../../static/noPicture.svg">'
        });
    }
}

// export const profile = new Profile();
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
