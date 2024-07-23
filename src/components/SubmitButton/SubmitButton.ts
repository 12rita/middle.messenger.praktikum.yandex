import styles from './styles.module.css';
import { ISubmitButtonProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';

export class SubmitButton extends Block<ISubmitButtonProps> {
    constructor(props: ISubmitButtonProps) {
        super('div', { ...props, className: styles.wrapper });
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
