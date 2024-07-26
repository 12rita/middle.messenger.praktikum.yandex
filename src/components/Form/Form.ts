import {
    IForm,
    IFormCompileProps,
    IFormProps,
    THandleChange
} from './types.ts';
import { Block, IBlock, IFormValues, IValues } from '../../shared';
import { template } from './template.ts';
import { FormInput } from '../FormInput';
import { TextButton } from '../TextButton';
import { SubmitButton } from '../SubmitButton';
import styles from './styles.module.css';

export class Form
    extends Block<IFormProps, IFormCompileProps>
    implements IForm
{
    _values: IFormValues = {};

    _setValues({ name, value }: IValues) {
        console.log({ name, value });
        this._values[name] = value;
    }

    get values() {
        return this._values;
    }

    constructor(props: IFormProps) {
        const inputs = props.formFields.map(field => {
            return new FormInput({
                placeholder: field.title,
                type: field.type || 'text',
                name: field.name,
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

        const textButton = new TextButton({
            label: props.textButtonLabel,
            id: props.id,
            onClick: props.onTextClick
        });

        const submitButton = new SubmitButton({
            label: props.submitButtonLabel,
            onClick: () => {
                handleSubmit();
            }
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
        };

        const handleSubmit = () => {
            props.onSubmitClick(this.values);
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
