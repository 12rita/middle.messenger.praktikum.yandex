import { Form } from '@components';
import { template } from './template.ts';
import global from '@/globalStyles.module.css';
import { Block, IPage, PAGES } from '@shared/components';
import { IFormField, IFormValues, TSignInFields } from '@shared/types.ts';
import { api, ROUTES } from '@api';
const formId = 'signInForm';
export class SignInPage extends Block {
    constructor(props: IPage) {
        const formFields: IFormField<TSignInFields>[] = [
            { title: 'Логин', name: 'login', value: '' },
            {
                title: 'Пароль',
                name: 'password',
                value: '',
                type: 'password' as TInputType
            }
        ];

        const { history } = props;

        const onTextClick = () => {
            history.go(PAGES.signUp);
        };

        const onSubmitClick = (values: IFormValues) => {
            this.signIn(values);
        };

        const form = new Form({
            id: formId,
            formFields,
            name: formId,
            title: 'Вход',
            label: 'Войти',
            onSubmitClick: onSubmitClick,
            onTextClick: onTextClick,
            textButtonLabel: 'Нет аккаунта?',
            submitButtonLabel: 'Войти',
            size: 'small'
        });
        super('main', { form, className: global.layout });
    }

    signIn = (values: IFormValues) => {
        const myUserForm = document.getElementById(formId);

        if (myUserForm) {
            // const form = new FormData(myUserForm as HTMLFormElement);

            api.post(ROUTES.signIn, {
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
                    this.props.history.go(PAGES.chats);
                })
                .catch(e => console.log({ e }));
        }
    };

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
