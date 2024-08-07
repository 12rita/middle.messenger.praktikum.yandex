import { IToasterProps } from './types.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';
import { template } from './template.ts';

export class Toaster extends Block<IToasterProps> {
    constructor(props: IToasterProps) {
        super('div', { ...props, className: styles.error });
        this.on('error', this.onError.bind(this));
    }
    onError = error => {
        console.log({ error });
        this.setProps({ text: error });
        // setTimeout(() => {
        //     this.setProps({ label: '' });
        // }, 3000);
    };

    render() {
        const block = this.compile(template, {
            type: this.props.type,
            text: this.props.text
        });
        console.log(this.props);

        const errorBlock = document.getElementById('error');
        if (errorBlock) errorBlock.appendChild(this.getContent());
        return block;
    }
}

const toaster = new Toaster({ type: 'error', text: 'shsnjkahnjkhkj' });
export const setError = error => {
    toaster.emit('error', error);
};
