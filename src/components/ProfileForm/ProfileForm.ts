import { IProfileFormProps } from './types.ts';
import { Block, IBlock } from '../Block';
import { template } from './template.ts';
import { ProfileField } from '../ProfileField';

export class ProfileForm extends Block<IProfileFormProps> {
    _values = {};

    _setValues(args) {
        const { name, value } = args;
        this._values[name] = value;
    }
    get values() {
        return this._values;
    }
    constructor(props: IProfileFormProps) {
        const inputs = props.formFields.map(field => {
            return new ProfileField({
                ...field,
                disabled: field.disabled !== undefined ? field.disabled : true,
                key: field.name,
                type: 'text',
                events: {
                    change: e => {
                        handleChange(e.target.value, field.name);
                    }
                }
            });
        });

        super('div', {
            ...props,
            inputs
        });

        const handleChange = (value, name) => {
            this._setValues({ name, value });
        };

        // this.on('inputChange', this._setValues.bind(this));
        this.on('edit', this._setEditable.bind(this));
        this.on('save', this._unsetEditable.bind(this));
    }

    _setEditable() {
        (this.children.inputs as IBlock[]).forEach(input => {
            input.setProps({ disabled: false });
        });
    }

    _unsetEditable() {
        (this.children.inputs as IBlock[]).forEach(input => {
            input.setProps({ disabled: true });
        });
    }

    componentDidUpdate() {
        return true;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            inputs: this.children.inputs as IBlock[]
        });
    }
}
