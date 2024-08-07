import { Error } from '@components';
import { template } from './template.ts';
import { IPage404 } from './types.ts';
import styles from './styles.module.css';
import { Block, IBlock, IPage, PAGES } from '@shared/components';

export class Page_404 extends Block<IPage, IPage404> {
    constructor(props: IPage) {
        const handleClick = () => {
            props.history.go(PAGES.signIn);
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
