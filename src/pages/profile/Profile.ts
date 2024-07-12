import { fileUploader, profileField } from '../../components';
import { user } from '../../const.ts';
import { submitButton } from '../../components';

interface IFormField {
    title: string;
    value: keyof typeof user;
}

document.addEventListener('DOMContentLoaded', () => {
    const form: HTMLFormElement = document.forms[
        'profileForm' as TFormKey
    ] as HTMLFormElement;

    const title = document.getElementById('title');

    const avatar = document.getElementById('profilePicture');

    const changeDataButton = document.getElementById('changeDataButton');

    if (changeDataButton) {
        changeDataButton.addEventListener('click', () => {
            Array.from(form.elements).forEach(el => {
                (el as HTMLInputElement).disabled = false;
            });

            if (avatar) avatar.innerHTML = fileUploader({});

            changeDataButton.outerHTML = submitButton({
                label: 'Сохранить',
                formId: form.id,
                href: ''
            });
        });
    }

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
                disabled: true,
                key: field.value,
                type: 'text',
                value: user[field.value]
            });
        });
});
