import { IChatProps, IRenderProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Message } from '../Message';
import { Input } from '../Input';
import sendIcon from '../../static/sendButton.svg';
import { SubmitButton } from '@/components';
import { Block } from '@shared/components';
import { connect } from '@shared/stores';

import { IMessage } from '@shared/types.ts';
import { chatApi } from '@api';
import { isEqual } from '@shared/utils';

export class ChatBase extends Block<IChatProps> {
    constructor(props: IChatProps) {
        const messagesBlock = [] as Message[];

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
        void chatApi.getOldMessages(this.props.id);
    };

    componentDidUpdate(oldProps: IRenderProps, newProps: IRenderProps) {
        console.log(oldProps, newProps);
        if (!isEqual(oldProps, newProps)) {
            if (!isEqual(oldProps.lastMessage, newProps.lastMessage)) {
                (this.children.messagesBlock as unknown as Message[]).push(
                    new Message({ ...newProps.lastMessage })
                );
            }
            if (!isEqual(oldProps.messages, newProps.messages)) {
                const { messages = [] } = newProps as IChatProps;

                const newMessages = messages
                    ?.map(message => {
                        return new Message({ ...message });
                    })
                    .reverse();

                (this.children.messagesBlock as unknown as Message[]) =
                    newMessages;

                (this.children.input as unknown as Input).emit('clear');
            }
            // this.children.messagesBlock.

            const messages = document.getElementById('messages');
            if (messages) {
                messages.scrollTo({ top: messages.scrollHeight });
            }
            console.log(this.children.messagesBlock);
            return true;
        }

        return false;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            messagesBlock: this.children.messagesBlock,
            input: this.children.input,
            sendButton: this.children.sendButton
        });
    }
}

const withStore = connect(state => ({
    messages: (state?.chats as { messages: IMessage[] })?.messages,
    lastMessage: state?.chats?.lastMessage
}));

export const Chat = withStore(ChatBase);
