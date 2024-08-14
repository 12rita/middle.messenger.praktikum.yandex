import { IChatPreviewProps } from './types.ts';
import { template } from './template.ts';
import styles from './styles.module.css';
import global from '@/globalStyles.module.css';
import { Block } from '@shared/components';
import { getTime } from '@shared/utils';
import { Avatar } from '@/components';

const indicatorBlock = (indicator: number) =>
    `<div class="${styles.indicator} ${global.body3}">${indicator}</div>`;

export class ChatPreview extends Block<IChatPreviewProps> {
    constructor(props: IChatPreviewProps) {
        const avatarBlock = new Avatar({
            src: props.avatar,
            wrapperClassname: styles.avatar,
            imageClassname: styles.avatar
        });
        super('li', {
            ...props,
            className: styles.wrapper,
            avatarBlock
        });
    }

    render() {
        const { time = '', content } = this.props.last_message ?? {};
        return this.compile(template, {
            ...this.props,
            ...this.children,
            indicator: this.props.unread_count
                ? indicatorBlock(this.props.unread_count)
                : '',
            time: getTime(time),
            message: content
        });
    }
}
