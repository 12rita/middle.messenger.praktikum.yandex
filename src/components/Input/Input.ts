import { Block } from '../../shared';
import { IInputProps } from './types.ts';
import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export class Input extends Block<IInputProps> {
    _value: string = '';

    get value() {
        return this._value;
    }

    constructor(props: IInputProps) {
        super('input', {
            ...props,
            className: props.className
                ? props.className
                : [styles.input, global.body1],
            attributes: [
                { value: 'input', name: 'id' },
                {
                    value: props.type,
                    name: 'type'
                },
                {
                    name: 'name',
                    value: props.name
                },
                ...(props.placeholder
                    ? [
                          {
                              name: 'placeholder',
                              value: props.placeholder
                          }
                      ]
                    : []),
                ...(props.value
                    ? [
                          {
                              name: 'value',
                              value: props.value
                          }
                      ]
                    : []),
                ...(props.disabled ? [{ name: 'disabled', value: 'true' }] : [])
            ],

            events: {
                ...(props.onBlur && { blur: props.onBlur }),
                input: e => {
                    handleChange(e);
                }
            }
        });
        this._value = props.value ?? '';
        const handleChange = (e: Event) => {
            this._value = (e.target as HTMLInputElement)?.value;
        };

        this.on('validate', this._validate);
        this.on('clear', this._clear);
    }
    _validate = () => {
        if (!this.value) {
            this.props.errorClassName &&
                this.element.classList.add(this.props.errorClassName);
        } else
            this.props.errorClassName &&
                this.element.classList.remove(this.props.errorClassName);
    };

    _clear = () => {
        this._value = '';
        (this.element as HTMLInputElement).value = this._value;
    };

    render() {
        return this.compile('', {
            placeholder: this.props.placeholder,
            name: this.props.name,
            type: this.props.type ?? 'text'
        });
    }
}
