import { IFileUploaderProps } from './types.ts';
import { Block } from '../Block';
import { template } from './template.ts';

export class FileUploader extends Block<IFileUploaderProps> {
    constructor(props: IFileUploaderProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, {
            label: this.props.label ?? 'Поменять аватар'
        });
    }
}
