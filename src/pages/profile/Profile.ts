import profileField from '../../shared/ProfileField/ProfileField.ts';
import { user } from '../../../static/const.ts';

interface IFormField {
    title: string;
    value: keyof typeof user;
}

document.addEventListener('DOMContentLoaded', () => {
    const form: HTMLFormElement = document.forms[
        'profileForm' as TFormKey
    ] as HTMLFormElement;

    const title = document.getElementById('title');

    if (title) title.innerHTML = user.display_name;

    const formFields: IFormField[] = [
        { title: 'Почта', value: 'email' },
        { title: 'Имя в чате', value: 'first_name' },
        { title: 'Фамилия', value: 'second_name' },
        { title: 'Логин', value: 'display_name' },
        { title: 'Телефон', value: 'phone' }
    ];

    if (form)
        formFields.forEach(field => {
            form.innerHTML += profileField({
                ...field,
                value: user[field.value]
            });
        });
});
