import { IErrorProps } from './types.ts';
import { template } from './template.ts';
import { TextButton } from '@/components';
import { Block } from '@shared/components';

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
