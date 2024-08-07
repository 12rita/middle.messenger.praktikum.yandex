import { Error } from '@components';
import { template } from './template.ts';
import { IPage500 } from './types.ts';
import styles from './styles.module.css';
import { Block, IBlock, IPage, PAGES } from '@shared/components';

export class Page_500 extends Block<IPage, IPage500> {
    constructor(props: IPage) {
        const handleClick = () => {
            props.history.go(PAGES.signIn);
        };
        const error = new Error({
            errorCode: 500,
            errorText: 'Мы уже фиксим',
            label: 'Назад к чатам',
            id: 'buttonError500',
            name: 'buttonError500',
            onClick: handleClick
        });
        super('div', { ...props, className: styles.layout, error });
    }

    render() {
        return this.compile(template, { error: this.children.error as IBlock });
    }
}
