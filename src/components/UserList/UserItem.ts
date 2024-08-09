import { IUserItemProps } from './types.ts';
import noPicture from '../../static/icons8-user-40.png';
import { itemTemplate } from './template.ts';
import styles from './styles.module.css';
import { Block } from '@shared/components';

export class UserItem extends Block<IUserItemProps> {
    constructor(props: IUserItemProps) {
        super('li', {
            ...props,
            className: styles.item,
            events: {
                click: () => {
                    this.element.classList.toggle(styles.active);

                    props.onClick();
                }
            }
        });
    }

    render() {
        const { display_name, avatar } = this.props.user;

        return this.compile(itemTemplate, {
            ...this.props,
            name: display_name ?? 'No name',
            avatar: avatar ?? noPicture
        });
    }
}
