import { IProfileForm, IProfileFormProps, THandleChange } from './types.ts';
import { template } from './template.ts';
import { ProfileField } from '@/components';
import { IFormValues, IValues } from '@shared/types.ts';
import { Block, IBlock } from '@shared/components';
export class ProfileForm
    extends Block<IProfileFormProps>
    implements IProfileForm
{
    _values: IFormValues = {};

    _setValues(args: IValues) {
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
                key: props.key,
                type: 'text',
                events: {
                    change: e => {
                        handleChange({
                            value: (e.target as HTMLInputElement)?.value,
                            name: field.name
                        });
                    }
                }
            });
        });

        super('div', {
            ...props,
            inputs
        });

        props.formFields.forEach(field => {
            this._setValues({ name: field.name, value: field.value });
        });
        const handleChange: THandleChange = ({ value, name }) => {
            this._setValues({ name, value });
        };

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

        this.props.handleSubmit(this.values);
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
