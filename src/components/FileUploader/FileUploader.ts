import { IFileUploaderProps } from './types.ts';
import { template } from './template.ts';
import noPicture from '../../static/noPicture.svg';
import { Block } from '@shared/components';
import { Input } from '@/components';
import styles from './styles.module.css';

export class FileUploader extends Block<IFileUploaderProps> {
    constructor(props: IFileUploaderProps) {
        const input = new Input({
            name: 'avatar',
            type: 'file',
            id: 'uploadInput',
            accept: 'image/*',
            className: [styles.inputFile]
        });

        super('div', {
            ...props,
            input,
            src: noPicture
        });
    }

    render() {
        return this.compile(template, {
            label: this.props.label ?? 'Поменять аватар',
            input: this.children.input
        });
    }
}
