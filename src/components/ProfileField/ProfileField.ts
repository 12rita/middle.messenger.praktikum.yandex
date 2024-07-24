import { IProfileFieldProps } from './types.ts';
import { Block, EVENTS, isValidField } from '../../shared';
import { template } from './template.ts';
import { InnerInput } from './InnerInput.ts';

export class ProfileField extends Block<IProfileFieldProps> {
    constructor(props: IProfileFieldProps) {
        const input = new InnerInput({
            ...props,
            onBlur: e => {
                checkIsValid(e);
            }
        });
        super('div', { ...props, input });
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
            ...this.props,
            input: this.children.input,
            disabled: this.props.disabled ? 'disabled' : ''
        });
    }
}
