import { template } from './template.ts';
import { IFormInputProps } from './types.ts';
import { Input } from '../Input';
import styles from './styles.module.css';
import { isValidField } from '@shared/utils';
import { Block, EVENTS } from '@shared/components';
import { TFieldName } from '@shared/types.ts';

export class FormInput extends Block<IFormInputProps> {
    value: string = '';

    constructor(props: IFormInputProps) {
        const input = new Input({
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
                name: props.name as TFieldName,
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
