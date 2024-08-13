import { IFileUploaderProps } from './types.ts';
import styles from './styles.module.css';

import { Block } from '@shared/components';
import { getPictureUrl } from '@shared/utils';
import { template } from './template.ts';

export class Avatar extends Block<IFileUploaderProps> {
    constructor(props: IFileUploaderProps) {
        super('div', {
            ...props,
            className: props.wrapperClassname ?? [styles.profilePicture]
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,

            src: this.props.src ? getPictureUrl(this.props.src) : '',
            styles: this.props.src
                ? (this.props.imageClassname ?? styles.backgroundImg)
                : styles.hidden
        });
    }
}
