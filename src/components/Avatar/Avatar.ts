import { IFileUploaderProps } from './types.ts';
import styles from './styles.module.css';
import noPicture from '../../static/noPicture.svg';
import { Block } from '@shared/components';
import { getPictureUrl } from '@shared/utils';
import { template } from './template.ts';

export class Avatar extends Block<IFileUploaderProps> {
    constructor(props: IFileUploaderProps) {
        super('div', {
            ...props,
            className: [styles.profilePicture]
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            src: this.props.src ? getPictureUrl(this.props.src) : noPicture,
            styles: this.props.src ? styles.backgroundImg : ''
        });
    }
}
