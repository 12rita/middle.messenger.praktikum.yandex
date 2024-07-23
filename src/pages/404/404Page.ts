import { Block, Error } from '../../components';
import { template } from './template.ts';
import { IPage404 } from './types.ts';
import { IHistory } from '../../components/EventBus/types.ts';

export class Page_404 extends Block<IPage404> {
    constructor(props: { history: IHistory }) {
        const handleClick = () => {
            // console.log('Click');
            // const link = document.createElement('a');
            // link.href = '../chats/Chats.html';
            // link.click();
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
        super('div', { error });
    }

    render() {
        return this.compile(template, { error: this.children.error });
    }
}

export const page404 = new Page_404();
