import { IInnerInput, IProfileFieldProps } from './types.ts';
import { Block, EVENTS, IBlock, isValidField } from '../../shared';
import { template } from './template.ts';
import { InnerInput } from './InnerInput.ts';
import styles from './styles.module.css';

export class ProfileField extends Block<IProfileFieldProps> {
    constructor(props: IProfileFieldProps) {
        const input = new InnerInput({
            ...props,
            disabled: props.disabled,
            onBlur: e => {
                checkIsValid(e);
            }
        });
        super('div', { ...props, input });
        const checkIsValid = (e: Event) => {
            this._checkIsValid(e);
        };
    }

    _checkIsValid = (e: Event) => {
        const { message } = isValidField({
            name: this.props.name,
            value: (e.target as HTMLInputElement)?.value
        });
        this.props.error = message;
        this.props.hasError = message ? 'errorVisible' : '';
        this.emit(EVENTS.FLOW_CDU);
    };

    componentDidUpdate() {
        this.children.input = new InnerInput({
            ...this.props,
            value: (this.children.input as unknown as IInnerInput).value,
            disabled: this.props.disabled,
            onBlur: e => {
                this._checkIsValid(e);
            }
        }) as unknown as IBlock;
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            error: this.props.error,
            hasError: this.props.hasError ? styles.errorVisible : '',
            input: this.children.input
        });
    }
}
