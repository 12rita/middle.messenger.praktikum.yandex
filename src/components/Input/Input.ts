import { Block, EVENTS, isValidField } from '../../shared';
import { template } from './template.ts';
import { IInputProps } from './types.ts';
import { InnerInput } from './InnerInput.ts';
import styles from './styles.module.css';

export class Input extends Block<IInputProps> {
    value: string = '';

    constructor(props: IInputProps) {
        const input = new InnerInput({
            ...props,
            onBlur: e => {
                checkIsValid(e);
            }
        });
        super('div', {
            ...props,
            input
        });

        const checkIsValid = (e: Event) => {
            const { message } = isValidField({
                name: props.name,
                value: (e.target as HTMLInputElement)?.value
            });
            this.props.error = message;
            this.props.hasError = message ? 'errorVisible' : '';
            this.emit(EVENTS.FLOW_CDU);
        };
    }

    render() {
        return this.compile(template, {
            input: this.children.input,
            placeholder: this.props.placeholder,
            name: this.props.name,
            error: this.props.error,
            hasError: this.props.hasError ? styles.errorVisible : '',
            type: this.props.type ?? 'text'
        });
    }
}
