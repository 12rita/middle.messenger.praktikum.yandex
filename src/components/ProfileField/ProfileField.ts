import { IProfileFieldProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';

export class ProfileField extends Block<IProfileFieldProps> {
    constructor(props: IProfileFieldProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            ...this.props
        });
    }
}
