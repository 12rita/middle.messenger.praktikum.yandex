import { IChatProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super('div', { ...props, className: styles.chatFieldWrapper });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
