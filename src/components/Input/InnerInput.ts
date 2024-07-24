import { Block } from '../../shared';
import { IInnerInputProps } from './types.ts';
import styles from './styles.module.css';
import global from '../../globalStyles.module.css';

export class InnerInput extends Block<IInnerInputProps> {
    value: string = '';
    constructor(props: IInnerInputProps) {
        super('input', {
            ...props,
            className: [styles.input, global.body1],
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
                    name: 'placeholder',
                    value: 'props.placeholder'
                }
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
