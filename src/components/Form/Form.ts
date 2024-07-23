import { IFormCompileProps, IFormProps } from './types.ts';
import { Block, IBlock } from '../Block';
import { template } from './template.ts';
import { Input } from '../Input';
import { TextButton } from '../TextButton';
import { SubmitButton } from '../SubmitButton';

export class Form extends Block<IFormProps, IFormCompileProps> {
    _values: { [key: string]: string | number } = {};

    _setValues(args) {
        const { name, value } = args;
        this._values[name] = value;
    }

    _handleClick = e => {
        e.preventDefault();
        console.log(this.values);
    };

    get values() {
        return this.values;
    }

    constructor(props: IFormProps) {
        const inputs = props.formFields.map(field => {
            return new Input({
                placeholder: field.title,
                type: field.type || 'text',
                name: field.value
            });
        });

        const textButton = new TextButton({
            label: props.textButtonLabel,
            id: props.id,
            events: {
                ...(props.onTextClick && { click: props.onTextClick })
            }
        });

        const submitButton = new SubmitButton({
            label: props.submitButtonLabel,
            formId: props.id,
            href: props.href,
            events: {
                ...(props.onSubmitClick && { click: props.onSubmitClick })
            }
        });
        super('div', { ...props, inputs, textButton, submitButton });
        this.on('inputChange', this._setValues.bind(this));
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
