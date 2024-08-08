import { INewChatProps } from './types.ts';
import { template } from './template.ts';
import { Block } from '@shared/components';
import { AddButton } from '@components/NewChat/AddButton.ts';
import { NewChatModal } from '@components/NewChat/NewChatModal.ts';
import styles from './styles.module.css';

export class NewChat extends Block<INewChatProps> {
    constructor(props: INewChatProps) {
        const onClick = () => {
            this.onAdd();
        };

        const addButton = new AddButton({ onClick });

        super('div', {
            ...props,
            addButton,
            className: styles.wrapper
        });
    }
    onAdd = () => {
        this.children.modal = new NewChatModal({
            onClick: () => {
                this.children.modal = [];
            }
        });
    };

    render() {
        console.log(this.children);
        return this.compile(template, {
            ...this.props,
            addButton: this.children.addButton,
            modal: this.children.modal
        });
    }
}
