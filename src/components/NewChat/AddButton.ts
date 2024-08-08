import styles from './styles.module.css';
import { IAddButtonProps } from './types.ts';

import { Block } from '@shared/components';

export class AddButton extends Block<IAddButtonProps> {
    constructor(props: IAddButtonProps) {
        super('button', {
            ...props,
            className: styles.addButton,
            events: { click: props.onClick }
        });
    }

    render() {
        return this.compile(`{{{children}}}`, { children: '+' });
    }
}
