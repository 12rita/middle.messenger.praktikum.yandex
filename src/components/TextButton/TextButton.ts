import { ITextButtonProps } from './types.ts';
import { Block } from '../Block';
import styles from './styles.module.css';
import { template } from './template.ts';

export class TextButton extends Block<ITextButtonProps> {
    constructor(props: ITextButtonProps) {
        super('button', {
            ...props,
            className: [
                styles.textButton,
                props.type ? styles[props.type] : styles.classic
            ],
            events: { ...(props.onClick && { click: props.onClick }) }
        });
    }

    render() {
        return this.compile(template, {
            children: this.props.label ?? this.props.children
        });
    }
}
