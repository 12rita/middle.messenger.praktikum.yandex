import { INewChatProps } from './types.ts';
import { modalTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';

export class NewChatModal extends Block<INewChatProps> {
    constructor(props: INewChatProps) {
        super('div', {
            ...props,
            className: styles.modal,
            events: {
                ...(props.onClick && { click: props.onClick })
            }
        });
    }

    render() {
        return this.compile(modalTemplate, {
            ...this.props
        });
    }
}
