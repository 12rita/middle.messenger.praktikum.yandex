import { profileField } from '../../components';
import { user } from '../../const.ts';
import { submitButton } from '../../components';

document.addEventListener('DOMContentLoaded', () => {
    const form: HTMLFormElement = document.forms[
        'changePasswordForm' as TFormKey
    ] as HTMLFormElement;

    const changeDataButton = document.getElementById('changeDataButton');

    if (changeDataButton) {
        changeDataButton.addEventListener('click', () => {
            Array.from(form.elements).forEach(el => {
                (el as HTMLInputElement).disabled = false;
            });

            changeDataButton.outerHTML = submitButton({
                label: 'Сохранить',
                formId: form.id,
                href: ''
            });
        });
    }

    const formFields = [
        { title: 'Старый пароль', value: 'oldPassword' },
        { title: 'Новый пароль', value: 'newPassword' },
        { title: 'Повторите новый пароль', value: 'newPassword' }
    ];

    if (form) {
        formFields.forEach(field => {
            form.innerHTML += profileField({
                ...field,
                name: field.value,
                key: field.value,
                type: 'password',
                value: user.password,
                disabled: false
            });
        });
        Array.from(form.elements).forEach(el => {
            (el as HTMLInputElement).disabled = false;
        });
    }
});
