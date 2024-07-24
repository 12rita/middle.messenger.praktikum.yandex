import { IChatPreviewProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';

export class ChatPreview extends Block<IChatPreviewProps> {
    constructor(props: IChatPreviewProps) {
        super('li', { ...props, className: styles.wrapper });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
