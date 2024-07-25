import { IChatProps } from './types.ts';
import { Block, IBlock } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';
import { Message } from '../Message';

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        const messagesBlock = props.messages.map(
            message => new Message({ ...message })
        );
        super('div', {
            ...props,
            className: styles.chatFieldWrapper,
            messagesBlock
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            messages: this.children.messagesBlock as IBlock[]
        });
    }
}
