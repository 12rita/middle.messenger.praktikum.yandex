import { Form } from '@components';
import { template } from './template.ts';
import global from '@/globalStyles.module.css';
import { IFormField, IFormValues, TSignUpFields } from '@shared/types.ts';
import { Block, IPage, PAGES } from '@shared/components';

const formFields: IFormField<TSignUpFields>[] = [
    { title: 'Почта', value: '', name: 'email', type: 'email' },
    { title: 'Имя', value: '', name: 'first_name' },
    { title: 'Фамилия', value: '', name: 'second_name' },
    { title: 'Логин', value: '', name: 'login' },
    { title: 'Телефон', value: '', name: 'phone', type: 'phone' },
    {
        title: 'Пароль',
        name: 'password',
        value: '',
        type: 'password'
    },
    {
        title: 'Пароль (ещё раз)',
        name: 'password',
        value: '',
        type: 'password'
    }
];

export class SignUpPage extends Block {
    constructor({ history }: IPage) {
        const onSignIn = () => {
            history.go(PAGES.signIn);
        };

        const onSignUp = (values: IFormValues) => {
            console.log(values);
            history.go(PAGES.chats);
        };

        const formId = 'signUpForm';
        const form = new Form({
            id: formId,
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти',
            textButtonLabel: 'Войти',
            onTextClick: onSignIn,
            onSubmitClick: onSignUp,
            submitButtonLabel: 'Зарегестрироваться',
            size: 'big'
        });
        super('main', { form, className: global.layout });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
