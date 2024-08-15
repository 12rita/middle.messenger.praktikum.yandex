import { IProfileButtonBlockProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { TextButton } from '@/components';
import { Block } from '@shared/components';

export class ProfileButtonBlock extends Block<IProfileButtonBlockProps> {
    constructor(props: IProfileButtonBlockProps) {
        const textButtonChangePassword = new TextButton({
            label: 'Изменить пароль',
            onClick: props.onChangePasswordClick
        });
        const textButtonExit = new TextButton({
            label: 'Выйти',
            type: 'danger',
            onClick: props.onExitClick
        });

        const textButtonChangeData = new TextButton({
            label: 'Изменить данные',
            onClick: props.onChangeDataClick
        });
        super('div', {
            ...props,
            className: styles.buttonBlock,
            textButtonChangePassword,
            textButtonExit,
            textButtonChangeData
        });
    }

    render() {
        return this.compile(template, {
            ...this.props,
            ...this.children
        });
    }
}
