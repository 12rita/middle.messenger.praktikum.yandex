import {
    IForm,
    IFormCompileProps,
    IFormProps,
    THandleChange
} from './types.ts';
import { Block, IBlock, IFormValues, IValues } from '../../shared';
import { template } from './template.ts';
import { Input } from '../Input';
import { TextButton } from '../TextButton';
import { SubmitButton } from '../SubmitButton';
import styles from './styles.module.css';

export class Form
    extends Block<IFormProps, IFormCompileProps>
    implements IForm
{
    _values: IFormValues = {};

    _setValues(args: IValues) {
        const { name, value } = args;
        this._values[name] = value;
    }

    get values() {
        return this._values;
    }

    constructor(props: IFormProps) {
        const inputs = props.formFields.map(field => {
            return new Input({
                placeholder: field.title,
                type: field.type || 'text',
                name: field.value,
                events: {
                    change: e => {
                        handleChange({
                            value: (e.target as HTMLInputElement)?.value,
                            name: field.value
                        });
                    }
                }
            });
        });

        const textButton = new TextButton({
            label: props.textButtonLabel,
            id: props.id,
            onClick: props.onTextClick
        });

        const submitButton = new SubmitButton({
            label: props.submitButtonLabel,
            onClick: props.onSubmitClick
        });
        super('div', {
            ...props,
            inputs,
            textButton,
            submitButton,
            className: [styles.formWrapper, styles[props.size]]
        });
        const handleChange: THandleChange = ({ value, name }) => {
            this._setValues({ name, value });
            console.log(this.values);
        };
    }

    render() {
        return this.compile(template, {
            ...this.props,
            inputs: this.children.inputs as IBlock[],
            textButton: this.children.textButton as IBlock,
            submitButton: this.children.submitButton as IBlock
        });
    }
}
