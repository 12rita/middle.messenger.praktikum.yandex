import { TFieldName } from '../types.ts';

interface IFieldProps {
    name: TFieldName;
    value: string;
}

type TIsValidField = ({ name, value }: IFieldProps) => {
    message: string;
    valid: boolean;
};

const rules = {
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    phone: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message: /^.+$/,
    name: /^[А-ЯA-Z][а-яa-zА-ЯA-Z]{2,19}$/,
    login: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    first_name: /^[А-ЯA-Z][а-яa-zА-ЯA-Z]{2,19}$/,
    second_name: /^[А-ЯA-Z][а-яa-zА-ЯA-Z]{2,19}$/,
    display_name: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
};

const messages = {
    password:
        'Пароль должен содержать от 8 до 40 символов, одну заглавную букву и цифру',
    phone: 'Введите корректный номер телефона',
    message: 'Введите сообщение',
    name: 'Поле не должно содержать спецсимволы и цифры, допустим только дефис, первая буква должна быть заглавной',
    login: 'Поле должно содержать от 3 до 20 символов, хотя бы одну букву и не должно содержать спецсимволы кроме дефиса и нижнего подчёркивания',
    email: 'Введите корректный email',
    first_name:
        'Поле не должно содержать спецсимволы и цифры, допустим только дефис, первая буква должна быть заглавной',
    second_name:
        'Поле не должно содержать спецсимволы и цифры, допустим только дефис, первая буква должна быть заглавной',
    display_name:
        'Поле должно содержать от 3 до 20 символов, хотя бы одну букву и не должно содержать спецфисмолы кроме дефиса и нижнего подчёркивания',
    oldPassword:
        'Пароль должен содержать от 8 до 40 символов, одну заглавную букву и цифру',
    newPassword:
        'Пароль должен содержать от 8 до 40 символов, одну заглавную букву и цифру'
};

export const isValidField: TIsValidField = ({ name, value }) => {
    const valid = rules[name].test(value);
    return { valid, message: valid ? '' : messages[name] };
};
