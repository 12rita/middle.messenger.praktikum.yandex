import { IBackButtonProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';
import styles from './styles.module.css';

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
