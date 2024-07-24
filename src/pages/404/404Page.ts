import { Block, Error, IBlock } from '../../components';
import { template } from './template.ts';
import { IPage404 } from './types.ts';
import styles from './styles.module.css';
import { IPage } from '../../shared';

export class Page_404 extends Block<IPage, IPage404> {
    constructor(props: IPage) {
        const handleClick = () => {
            props.history.emit('push', '/signIn');
        };
        const error = new Error({
            errorCode: 404,
            errorText: 'Не туда попали',
            label: 'Назад к чатам',
            id: 'buttonError404',
            name: 'buttonError404',
            onClick: handleClick
        });
        super('main', { ...props, className: styles.layout, error });
    }

    render() {
        return this.compile(template, { error: this.children.error as IBlock });
    }
}
