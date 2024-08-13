import { IMessageProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { getTime } from '@shared/utils';
import { user } from '@shared/stores/User.ts';

export class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps) {
        super('div', {
            ...props,
            className: [
                styles.mainInfo,
                props.user_id === user.data?.id
                    ? styles.myMessage
                    : styles.othersMessage
            ]
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            time: getTime(this.props.time)
        });
    }
}
