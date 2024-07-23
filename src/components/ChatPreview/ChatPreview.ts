import { IChatPreviewProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';

export class ChatPreview extends Block<IChatPreviewProps> {
    constructor(props: IChatPreviewProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
