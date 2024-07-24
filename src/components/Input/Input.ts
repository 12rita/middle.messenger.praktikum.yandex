import { Block } from '../../shared';
import { template } from './template.ts';
import { IInputProps } from './types.ts';
import styles from './styles.module.css';

export class Input extends Block<IInputProps> {
    value: string = '';
    constructor(props: IInputProps) {
        super('div', {
            ...props,
            className: styles.inputWrapper
        });
    }

    render() {
        return this.compile(template, {
            placeholder: this.props.placeholder,
            name: this.props.name,
            type: this.props.type ?? 'text'
        });
    }
}
