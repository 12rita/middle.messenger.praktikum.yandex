import { IChatPreviewProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';

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
