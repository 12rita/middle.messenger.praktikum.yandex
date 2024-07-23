import { Block } from '../Block';
import { template } from './template.ts';
import { IPlugProps } from './types.ts';
import styles from './styles.module.css';

export class Plug extends Block<IPlugProps> {
    constructor(props: IPlugProps) {
        super('div', { ...props, className: styles.plug });
    }

    render() {
        return this.compile(template, {
            label: this.props.label ?? 'Выберите чат, чтобы отправить сообщение'
        });
    }
}
