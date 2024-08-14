import { IBackButtonProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';

export class BackButton extends Block<IBackButtonProps> {
    constructor(props: IBackButtonProps) {
        super('button', {
            ...props,
            className: styles.back,
            events: { click: props.onClick }
        });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
