import { IMessageProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        console.log({ props });
        super('div', { ...props, className: styles.mainInfo });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
