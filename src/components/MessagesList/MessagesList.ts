import { IMessagesListProps, IRenderProps } from './types.ts';
import { template } from './template.ts';
import styles from './styles.module.css';
import { Message } from '../Message';
import { Block } from '@shared/components';
import { connect } from '@shared/stores';
import { chatApi } from '@api';
import { isEqual } from '@shared/utils';

export class MessagesListBase extends Block<IMessagesListProps> {
    constructor(props: IMessagesListProps) {
        const messagesBlock = [] as Message[];

        super('div', {
            ...props,
            className: styles.messages,
            messagesBlock
        });

        this.init();
    }

    init = () => {
        chatApi.getOldMessages(this.props.id).then(() => {
            chatApi.getChats(); //to mark read
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
                const { messages = [] } = newProps as IMessagesListProps;

                (this.children.messagesBlock as unknown as Message[]) = messages
                    ?.map(message => {
                        return new Message({
                            ...message
                        });
                    })
                    .reverse();
            }

            return true;
        }

        return false;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            messagesBlock: this.children.messagesBlock
        });
    }
}

const withStore = connect(state => ({
    messages: (state?.chats as IRenderProps)?.messages,
    lastMessage: (state?.chats as IRenderProps)?.lastMessage
}));

export const MessagesList = withStore(MessagesListBase);
