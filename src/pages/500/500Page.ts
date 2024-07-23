import { Block, Error } from '../../components';
import { template } from '../404/template.ts';
import { IPage500 } from './types.ts';

export class Page_500 extends Block<IPage500> {
    constructor() {
        const handleClick = () => {
            console.log('Click');
            const link = document.createElement('a');
            link.href = '../chats/Chats.html';
            link.click();
        };
        const error = new Error({
            errorCode: 500,
            errorText: 'Мы уже фиксим',
            label: 'Назад к чатам',
            id: 'buttonError500',
            name: 'buttonError500',
            onClick: handleClick
        });
        super('div', { error });
    }

    render() {
        return this.compile(template, { error: this.children.error });
    }
}

export const page500 = new Page_500();
