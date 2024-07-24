import { Block } from '../../shared';
import { IInnerInputProps } from './types.ts';
import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

// <input name="{{name}}" class="${styles.fieldValue} ${global.grayText} ${global.body1}" type="{{type}}" value="{{value}}" {{disabled}}>
export class InnerInput extends Block<IInnerInputProps> {
    value: string = '';
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
                blur: props.onBlur
            }
        });
    }

    render() {
        return this.compile('', {
            placeholder: this.props.placeholder,
            name: this.props.name,
            type: this.props.type ?? 'text'
        });
    }
}
