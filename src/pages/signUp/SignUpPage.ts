import { Form } from '@components';
import { template } from './template.ts';
import global from '@/globalStyles.module.css';
import { IFormField, IFormValues, TSignUpFields } from '@shared/types.ts';
import { Block, IPage, PAGES } from '@shared/components';
import { api } from '@api/HTTPTransport.ts';
import { ROUTES } from '@api';

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
const formId = 'signUpForm';

export class SignUpPage extends Block {
    history;
    constructor({ history }: IPage) {
        const onSignIn = () => {
            history.go(PAGES.signIn);
        };

        const onSignUp = (values: IFormValues) => {
            // console.log(values);
            this.signUp(values);
            // history.go(PAGES.chats);
        };

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
        this.history = history;
    }

    signUp = (values: IFormValues) => {
        const myUserForm = document.getElementById(formId);

        if (myUserForm) {
            // const form = new FormData(myUserForm as HTMLFormElement);

            api.post(ROUTES.signUp, {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                data: JSON.stringify(values)
            })
                .then(data => {
                    console.log({ data });
                    this.history.go(PAGES.chats);
                })
                .catch(e => console.log({ e }));
        }
    };

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
