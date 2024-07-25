import { IChatProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';
import { Message } from '../Message';
import { Input } from '../Input';
import sendIcon from '../../static/sendButton.svg';
import { SubmitButton } from '../SubmitButton';

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        const messagesBlock = props.messages.map(
            message => new Message({ ...message })
        );

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
            isValid && props.onSend(input.value);
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

    componentDidUpdate(newProps: IChatProps | string) {
        const { messages: newMessages } = newProps as IChatProps;
        (this.children.messagesBlock as unknown as Message[]).push(
            new Message({ ...newMessages[newMessages.length - 1] })
        );
        (this.children.input as unknown as Input).emit('clear');
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            messages: this.children.messagesBlock,
            input: this.children.input,
            sendButton: this.children.sendButton
        });
    }
}
