import { ITextButtonProps } from './types.ts';
import { Block } from '../Block';

import { template } from './template.ts';

export class TextButton extends Block<ITextButtonProps> {
    constructor(props: ITextButtonProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            label: this.props.label
        });
    }
}
