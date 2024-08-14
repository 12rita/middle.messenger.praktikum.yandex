import { IChatProps } from './types.ts';
import { template } from './template.ts';
import styles from './styles.module.css';
import { Input } from '../Input';
import sendIcon from '../../static/sendButton.svg';
import { Avatar, MessagesList, SubmitButton } from '@/components';
import { Block } from '@shared/components';

import { chatApi } from '@api';

import { NewChatModal } from '@components/NewChat/NewChatModal.ts';

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        const messagesList = new MessagesList({ id: props.id });

        const avatarBlock = new Avatar({
            src: props.avatar,
            wrapperClassname: styles.chatAvatar,
            imageClassname: styles.chatAvatar,
            events: {
                click: () => {
                    this._onHeaderClick();
                }
            }
        });

        const input = new Input({
            ...props,
            className: styles.messageInput,
            errorClassName: styles.error,
            type: 'text',
            id: 'message',
            name: 'message',
            placeholder: 'Сообщение',
            onBlur: () => {}
        });

        const sendButton = new SubmitButton({
            className: styles.sendMessage,
            children: `<img alt="attach" src="${sendIcon}">`,
            onClick: () => {
                onSend();
            }
        });
        super('div', {
            ...props,
            className: styles.chatFieldWrapper,
            messagesList,
            sendButton,
            avatarBlock,
            input
        });

        const onSend = () => {
            const isValid = validateMessage();
            isValid && chatApi.sendMessage(input.value);
            (this.children.input as unknown as Input).emit('clear');
        };

        const validateMessage = () => {
            const input = this.children.input as unknown as Input;
            input.emit('validate');
            return input.value;
        };

        const sendEvent = () => {
            document.addEventListener('keydown', event => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    onSend();
                }
            });
        };

        sendEvent();
    }

    _onHeaderClick = () => {
        this.setProps({
            modal: new NewChatModal({
                edit: true,
                title: this.props.title,
                chatId: this.props.id,
                onClose: (e?: Event) => {
                    if (!e) {
                        this.setChildren({ modal: [] });
                        return;
                    }
                    const formEl = (e.target as HTMLElement)?.closest(
                        '#addForm'
                    );

                    if (formEl) return;

                    this.setChildren({ modal: [] });
                }
            })
        });
    };

    render() {
        return this.compile(template, {
            ...this.props,
            messagesList: this.children.messagesList,
            input: this.children.input,
            sendButton: this.children.sendButton
        });
    }
}
