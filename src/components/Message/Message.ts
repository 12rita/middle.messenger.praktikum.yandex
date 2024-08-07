import { IMessageProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        super('div', { ...props, className: styles.mainInfo });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
