import {
    Block,
    IBlock,
    IProps,
    ProfileForm,
    BackButton,
    FileUploader,
    type IFormField,
    EVENTS,
    ProfileButtonBlock,
    SubmitButton
} from '../../components';
import { user } from '../../const.ts';
import { template } from './template.ts';
import { IProfileProps } from './types.ts';
import { IPage, PAGES } from '../types.ts';
import styles from './styles.module.css';
import { IEventBus } from '../../components/EventBus/types.ts';

const formFields: IFormField[] = [
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

export class Profile extends Block<IProps, IProfileProps> {
    buttonBlock: IBlock;
    constructor({ history }: IPage) {
        const formId = 'changeDataForm';
        const form = new ProfileForm({
            id: formId,
            formFields,
            name: formId
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
        this.buttonBlock = buttonBlock;

        const handleChangeData = () => {
            this._changeData();
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
    _changeData = () => {
        (this.children.form as IEventBus).emit('edit');
        (this.children.avatar as IEventBus).emit('edit');
        this.children.buttonBlock = new SubmitButton({
            label: 'Сохранить',
            onClick: () => {
                this._saveData();
            }
        }) as IBlock;
        this.emit(EVENTS.FLOW_CDU);
    };

    componentDidUpdate() {
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.children,
            ...this.props,
            title: user.display_name
        });
    }
}
