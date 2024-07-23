import { Block, Error } from '../../components';
import { template } from './template.ts';
import { IPage404 } from './types.ts';
import { IPage } from '../types.ts';

export class Page_404 extends Block<IPage404> {
    constructor({ history }: IPage) {
        const handleClick = () => {
            history.emit('push', '/signIn');
        };
        const error = new Error({
            errorCode: 404,
            errorText: 'Не туда попали',
            label: 'Назад к чатам',
            id: 'buttonError404',
            name: 'buttonError404',
            onClick: handleClick
        });
        super('div', { error });
    }

    render() {
        return this.compile(template, { error: this.children.error });
    }
}
