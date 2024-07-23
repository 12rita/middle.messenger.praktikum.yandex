import { IChatProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
