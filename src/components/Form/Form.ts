import './styles.css';
import { IFormCompileProps, IFormProps } from './types.ts';
import { Block, IBlock } from '../Block';
import { template } from './template.ts';
import { Input } from '../Input';
import { TextButton } from '../TextButton';

export class Form extends Block<IFormProps, IFormCompileProps> {
    values = {};

    _setValues(args) {
        const { name, value } = args;
        this.values[name] = value;
    }
    constructor(props: IFormProps) {
        const inputs = props.formFields.map(field => {
            return new Input({
                placeholder: field.title,
                type: field.type || 'text',
                name: field.value
            });
        });

        console.log(inputs);

        const textButton = new TextButton({
            label: props.label,
            id: props.id,
            events: {
                ...(props.onClick && { click: props.onClick })
            }
        });

        const submitButton = new TextButton({
            label: 'Submit',
            id: props.id,
            events: {
                click: () => console.log(this.values)
            }
        });
        super('div', { ...props, inputs, textButton, submitButton });
        this.on('inputChange', this._setValues.bind(this));
        // inputs.forEach(input => {
        //     input._parent = this;
        // });
    }

    render() {
        return this.compile(template, {
            id: this.props.id,
            name: this.props.name,
            title: this.props.title,
            inputs: this.children.inputs as IBlock[],
            textButton: this.children.textButton as IBlock,
            submitButton: this.children.submitButton as IBlock
        });
    }
}
