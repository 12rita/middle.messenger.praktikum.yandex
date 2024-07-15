import { input } from '../../components';

document.addEventListener('DOMContentLoaded', () => {
    const formId = 'signInForm' as TFormKey;

    const form: HTMLFormElement = document.forms[formId] as HTMLFormElement;

    const formFields = [
        { title: 'Логин', value: 'login' },
        { title: 'Пароль', value: 'password', type: 'password' }
    ];

    if (form)
        formFields.forEach(field => {
            form.innerHTML += input({
                type: (field.type || 'text') as TInputType,
                name: field.value,
                placeholder: field.title
            });
        });
});
