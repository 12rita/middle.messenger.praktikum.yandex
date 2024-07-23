import { IProfileFormProps } from './types.ts';
import { Block, IBlock } from '../Block';
import { template } from './template.ts';
import { ProfileField } from '../ProfileField';

export class ProfileForm extends Block<IProfileFormProps> {
    values = {};

    _setValues(args) {
        const { name, value } = args;
        this.values[name] = value;
    }
    constructor(props: IProfileFormProps) {
        const inputs = props.formFields.map(field => {
            return new ProfileField({
                ...field,
                disabled: true,
                key: field.name,
                type: 'text'
            });
        });

        super('div', { ...props, inputs });
        this.on('inputChange', this._setValues.bind(this));
    }

    render() {
        return this.compile(template, {
            ...this.props,
            inputs: this.children.inputs as IBlock[]
        });
    }
}
