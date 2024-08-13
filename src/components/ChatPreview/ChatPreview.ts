import { IChatPreviewProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { getTime } from '@shared/utils';

export class ChatPreview extends Block<IChatPreviewProps> {
    constructor(props: IChatPreviewProps) {
        super('li', { ...props, className: styles.wrapper });
    }

    render() {
        const { time, content } = this.props.last_message ?? {};
        return this.compile(template, {
            ...this.props,
            indicator: this.props.unread_count,
            time: getTime(time),
            message: content
        });
    }
}
