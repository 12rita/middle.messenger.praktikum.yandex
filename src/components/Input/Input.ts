import { Block } from '../Block';
import { template } from './template.ts';
import { IInputProps } from './types.ts';

export class Input extends Block<IInputProps> {
    value: string = '';
    constructor(props: IInputProps) {
        const handleChange = e => {
            this.value = e.target.value;
            console.log(this);
            this._parent.emit('inputChange', {
                name: props.name,
                value: e.target.value
            });
        };

        super('div', {
            ...props,
            events: {
                change: handleChange
            }
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
