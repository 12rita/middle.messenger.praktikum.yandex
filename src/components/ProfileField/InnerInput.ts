import { Block } from '../../shared';
import { IInnerInput, IInnerInputProps } from './types.ts';
import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export class InnerInput extends Block<IInnerInputProps> implements IInnerInput {
    _value: string = '';

    get value() {
        return this._value;
    }
    constructor(props: IInnerInputProps) {
        super('input', {
            ...props,
            className: [styles.fieldValue, global.grayText, global.body1],
            attributes: [
                {
                    value: props.type,
                    name: 'type'
                },
                {
                    name: 'name',
                    value: props.name
                },
                {
                    name: 'value',
                    value: props.value
                },
                ...(props.disabled ? [{ name: 'disabled', value: 'true' }] : [])
            ],

            events: {
                blur: props.onBlur,
                change: e => {
                    handleChange(e);
                }
            }
        });
        this._value = props.value;
        const handleChange = (e: Event) => {
            this._value = (e.target as HTMLInputElement)?.value;
        };
    }

    render() {
        return this.compile('', {
            placeholder: this.props.placeholder,
            name: this.props.name,
            type: this.props.type ?? 'text'
        });
    }
}
