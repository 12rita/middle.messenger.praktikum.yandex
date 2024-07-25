import {
    ProfileForm,
    BackButton,
    FileUploader,
    ProfileButtonBlock,
    SubmitButton
} from '../../components';
import { user } from '../../shared/const.ts';
import { template } from './template.ts';
import { IProfile, IProfileProps } from './types.ts';
import {
    Block,
    EVENTS,
    IBlock,
    IFormField,
    IFormValues,
    IPage,
    IProps,
    PAGES,
    TSettingsFields
} from '../../shared';
import styles from './styles.module.css';
import { IEventBus } from '../../shared/components/EventBus/types.ts';

const formFields: IFormField<TSettingsFields>[] = [
    { title: 'Почта', name: 'email', value: user['email'] },
    {
        title: 'Имя в чате',
        name: 'first_name',
        value: user['first_name']
    },
    {
        title: 'Фамилия',
        name: 'second_name',
        value: user['second_name']
    },
    {
        title: 'Логин',
        name: 'display_name',
        value: user['display_name']
    },
    { title: 'Телефон', name: 'phone', value: user['phone'] }
];

export class ProfilePage
    extends Block<IProps, IProfileProps>
    implements IProfile
{
    buttonBlock: IBlock;
    constructor({ history }: IPage) {
        const formId = 'changeDataForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            key: formId,
            handleSubmit: values => {
                handleSubmit(values);
            }
        });

        const avatar = new FileUploader({
            label: 'Поменять аватар'
        }) as IBlock;

        const backButton = new BackButton({
            onClick: () => {
                history.emit('push', PAGES.chats);
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
            className: styles.layout
        });
        this.buttonBlock = buttonBlock as unknown as IBlock;

        const handleChangeData = () => {
            this._changeData();
        };
        const handleSubmit = (values: IFormValues) => {
            this._handleSubmit(values);
        };
        const handleChangePassword = () => {
            history.emit('push', PAGES.changePassword);
        };
        const handleExit = () => {
            history.emit('push', PAGES.signIn);
        };
    }

    _saveData = () => {
        (this.children.form as IEventBus).emit('save');
        (this.children.avatar as IEventBus).emit('save');
        this.children.buttonBlock = this.buttonBlock;
        this.emit(EVENTS.FLOW_CDU);
    };

    _handleSubmit = (values: IFormValues) => {
        console.log(values);
    };

    _changeData = () => {
        (this.children.form as IEventBus).emit('edit');
        (this.children.avatar as IEventBus).emit('edit');
        this.children.buttonBlock = new SubmitButton({
            label: 'Сохранить',
            onClick: () => {
                this._saveData();
            }
        }) as unknown as IBlock;
        this.emit(EVENTS.FLOW_CDU);
    };

    componentDidUpdate() {
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            form: this.children.form as IBlock,
            backButton: this.children.backButton as IBlock,
            buttonBlock: this.children.buttonBlock as IBlock,
            avatar: this.children.avatar as IBlock,
            title: user.display_name
        });
    }
}
