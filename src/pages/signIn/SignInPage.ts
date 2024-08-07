import { Form } from '@components';
import { template } from './template.ts';
import global from '@/globalStyles.module.css';
import { Block, IPage, PAGES } from '@shared/components';
import { IFormField, TSignInFields } from '@shared/types.ts';

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
        const formId = 'signInForm';
        const { history } = props;

        const onTextClick = () => {
            history.go(PAGES.signUp);
        };

        const onSubmitClick = () => {
            history.go(PAGES.chats);
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
            href: '../signUp/SignUpPage.html',
            submitButtonLabel: 'Войти',
            size: 'small'
        });
        super('main', { form, className: global.layout });
    }

    render() {
        return this.compile(template, { form: this.children.form });
    }
}
