import { input } from '../../components';

document.addEventListener('DOMContentLoaded', () => {
    const form: HTMLFormElement = document.forms[
        'signUpForm' as TFormKey
    ] as HTMLFormElement;

    const formFields = [
        { title: 'Почта', value: 'email' },
        { title: 'Имя', value: 'first_name' },
        { title: 'Фамилия', value: 'second_name' },
        { title: 'Логин', value: 'login' },
        { title: 'Телефон', value: 'phone' },
        { title: 'Пароль', value: 'password', type: 'password' },
        { title: 'Пароль (ещё раз)', value: 'password', type: 'password' }
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
