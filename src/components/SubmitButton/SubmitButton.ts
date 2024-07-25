import styles from './styles.module.css';
import { ISubmitButtonProps } from './types.ts';
import { Block } from '../../shared';
import { template } from './template.ts';

export class SubmitButton extends Block<ISubmitButtonProps> {
    constructor(props: ISubmitButtonProps) {
        super('button', {
            ...props,
            className: props.className ?? styles.submitButton,
            events: { click: props.onClick }
        });
    }

    render() {
        return this.compile(template, {
            children: this.props.label ?? this.props.children
        });
    }
}
