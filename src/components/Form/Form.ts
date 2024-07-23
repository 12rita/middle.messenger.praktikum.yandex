import { IFormCompileProps, IFormProps } from './types.ts';
import { Block, IBlock } from '../Block';
import { template } from './template.ts';
import { Input } from '../Input';
import { TextButton } from '../TextButton';
import { SubmitButton } from '../SubmitButton';

export class Form extends Block<IFormProps, IFormCompileProps> {
    values = {};

    _setValues(args) {
        const { name, value } = args;
        this.values[name] = value;
    }

    _handleClick = e => {
        e.preventDefault();
        console.log(this.values);
    };

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
                ...(props.onClick && { click: props.onClick })
            }
        });

        const submitButton = new SubmitButton({
            label: props.submitButtonLabel,
            formId: props.id,
            href: props.href,
            events: {
                click: e => this._handleClick(e)
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
