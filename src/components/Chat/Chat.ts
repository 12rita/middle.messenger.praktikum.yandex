import { IChatProps, IRenderProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Message } from '../Message';
import { Input } from '../Input';
import sendIcon from '../../static/sendButton.svg';
import { Avatar, SubmitButton } from '@/components';
import { Block } from '@shared/components';
import { connect } from '@shared/stores';
import { chatApi } from '@api';
import { isEqual } from '@shared/utils';
import { NewChatModal } from '@components/NewChat/NewChatModal.ts';

export class ChatBase extends Block<IChatProps> {
    constructor(props: IChatProps) {
        const messagesBlock = [] as Message[];

        const avatarBlock = new Avatar({
            src: props.avatar,
            wrapperClassname: styles.chatAvatar,
            imageClassname: styles.chatAvatar,
            events: {
                click: () => {
                    this._onChatClick();
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
            messagesBlock,
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
        this.init();
    }
    init = () => {
        chatApi.getOldMessages(this.props.id).then(() => {
            chatApi.getChats(); //to mark read
        });
    };

    _onChatClick = () => {
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

    componentDidUpdate(oldProps: IRenderProps, newProps: IRenderProps) {
        if (!isEqual(oldProps, newProps)) {
            if (
                !isEqual(oldProps.lastMessage, newProps.lastMessage) &&
                newProps.lastMessage
            ) {
                (this.children.messagesBlock as unknown as Message[]).push(
                    new Message({ ...newProps.lastMessage })
                );
            }
            if (!isEqual(oldProps.messages, newProps.messages)) {
                const { messages = [] } = newProps as IChatProps;

                (this.children.messagesBlock as unknown as Message[]) = messages
                    ?.map(message => {
                        return new Message({
                            ...message
                        });
                    })
                    .reverse();

                (this.children.input as unknown as Input).emit('clear');
            }

            return true;
        }

        return false;
    }

    render() {
        const block = this.compile(template, {
            ...this.props,
            messagesBlock: this.children.messagesBlock,
            input: this.children.input,
            sendButton: this.children.sendButton
        });
        const messages = document.getElementById('messages');

        if (messages) {
            messages.scrollTop = messages.scrollHeight;
            // console.log(messages.scrollHeight, messages.scrollTop);
        }
        return block;
    }
}

const withStore = connect(state => ({
    messages: (state?.chats as IRenderProps)?.messages,
    lastMessage: (state?.chats as IRenderProps)?.lastMessage
}));

export const Chat = withStore(ChatBase);
