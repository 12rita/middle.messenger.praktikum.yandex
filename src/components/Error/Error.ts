import './styles.css';

import { IErrorProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';
import { TextButton } from '../TextButton';

export class Error extends Block<IErrorProps> {
    constructor(props: IErrorProps) {
        const textButton = new TextButton({
            label: props.label,
            id: props.id,
            events: {
                ...(props.onClick && { click: props.onClick })
            }
        });
        super('div', { ...props, textButton });
    }

    render() {
        return this.compile(template, {
            errorCode: this.props.errorCode,
            errorText: this.props.errorText,
            label: this.props.label,
            id: this.props.id,
            textButton: this.children.textButton
        });
    }
}
// export default Handlebars.compile<IErrorProps>(
//     `<div class="layoutError">
//   <h1 class="bigText errorCode">{{errorCode}}</h1>
//   <h2 class="bigSubtext errorText">{{errorText}}</h2>
//
//   ${textButton({ label: '{{label}}', id: '{{id}}' })}
// </div>`
// );
