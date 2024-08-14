import {
    ProfileForm,
    BackButton,
    FileUploader,
    ProfileButtonBlock,
    SubmitButton,
    Avatar
} from '@components';
import { template } from './template.ts';
import { IProfile, IProfileProps } from './types.ts';

import styles from './styles.module.css';
import {
    Block,
    IBlock,
    IEventBus,
    IPage,
    IProps,
    PAGES
} from '@shared/components';
import {
    IFormField,
    IFormValues,
    IUser,
    TSettingsFields
} from '@shared/types.ts';
import store from '@shared/stores/Store.ts';
import { authApi, userApi } from '@api';
import { isEqual } from '@shared/utils';

const formFields: IFormField<TSettingsFields>[] = [
    { title: 'Почта', name: 'email' },
    {
        title: 'Имя в чате',
        name: 'first_name'
    },
    {
        title: 'Фамилия',
        name: 'second_name'
    },
    {
        title: 'Логин',
        name: 'display_name'
    },
    { title: 'Телефон', name: 'phone' }
];

export class ProfilePage
    extends Block<IProps, IProfileProps>
    implements IProfile
{
    buttonBlock: IBlock;
    constructor({ history }: IPage) {
        const formId = 'changeDataForm';
        const user = store.getState().user as IUser;

        const form = new ProfileForm({
            id: formId,
            formFields: formFields.map(field => {
                return { ...field, value: user[field.name] };
            }),
            key: formId,
            handleSubmit: values => {
                this._handleSubmit(values);
            }
        });

        const avatar = new Avatar({ src: user.avatar });

        const backButton = new BackButton({
            onClick: () => {
                history && history.back();
            }
        });

        const buttonBlock = new ProfileButtonBlock({
            onChangeDataClick: () => {
                handleChangeData();
            },
            onChangePasswordClick: () => {
                handleChangePassword();
            },
            onExitClick: () => {
                handleExit();
            }
        });

        super('main', {
            form,
            backButton,
            buttonBlock,
            avatar,
            title: user.login,
            className: styles.layout
        });
        this.buttonBlock = buttonBlock as unknown as IBlock;

        const handleChangeData = () => {
            this._changeData();
        };

        const handleChangePassword = () => {
            history && history.go(PAGES.changePassword);
        };
        const handleExit = () => {
            authApi.logout().then(() => {
                history && history.go(PAGES.signIn);
            });
        };
    }

    _handleSubmit = (values: IFormValues) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, avatar, login, ...user } = store.getState().user as IUser;
        const myForm = document.getElementById('avatarForm');

        const form = new FormData(myForm as HTMLFormElement);

        if (!isEqual(values, user as IUser)) {
            userApi.updateProfile(values as unknown as IUser);
        }
        if ((form.get('avatar') as { size: number })?.size) {
            userApi.updateAvatar(form).then(data => {
                this.setProps({
                    avatar: new Avatar({ src: (data as IUser).avatar })
                });
            });
        } else {
            this.setProps({
                avatar: new Avatar({ src: avatar })
            });
        }
        this.setProps({ buttonBlock: this.buttonBlock });
    };

    _changeData = () => {
        (this.children.form as IEventBus).emit('edit');

        this.setProps({
            avatar: new FileUploader({
                label: 'Поменять аватар'
            }),
            buttonBlock: new SubmitButton({
                label: 'Сохранить',
                form: 'changeDataForm',
                type: 'submit',
                onClick: e => {
                    e.preventDefault();

                    (this.children.form as IEventBus).emit('save');
                }
            })
        });
    };

    render() {
        console.log(this.props);
        return this.compile(template, {
            ...this.props,
            form: this.children.form as IBlock,
            backButton: this.children.backButton as IBlock,
            buttonBlock: this.children.buttonBlock as IBlock,
            avatar: this.children.avatar as IBlock
        });
    }
}
