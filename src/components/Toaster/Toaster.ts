import { IToasterProps } from './types.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { template } from './template.ts';

export class Toaster extends Block<IToasterProps> {
    constructor(props: IToasterProps) {
        super('div', { ...props, className: styles.error });
        this.on('error', this.onError.bind(this));
    }
    onError = (error: IToasterProps) => {
        const { title, text } = error;
        console.log({ title, text });
        this.setProps({ title, text });
        setTimeout(() => {
            this.setProps({ text: '' });
        }, 3000);
    };

    render() {
        const block = this.compile(template, {
            type: this.props.title ?? this.props.type ?? 'Error',
            text: this.props.text
        });

        const errorBlock = document.getElementById('error');
        if (errorBlock) {
            if (this.props.text) errorBlock.appendChild(this.getContent());
            else if (errorBlock.hasChildNodes())
                errorBlock.removeChild(this.getContent());
        }
        return block;
    }
}

const toaster = new Toaster({ type: 'Error', text: '' });
export const setError = (error: IToasterProps) => {
    toaster.emit('error', error);
};
