import { INewChatProps } from './types.ts';
import { template } from './template.ts';
import { Block } from '@shared/components';
import { AddButton } from '@components/NewChat/AddButton.ts';
import { NewChatModal } from '@components/NewChat/NewChatModal.ts';

export class NewChat extends Block<INewChatProps> {
    constructor(props: INewChatProps) {
        const onClick = () => {
            this.onAdd();
        };

        const addButton = new AddButton({ onClick });

        super('div', {
            ...props,
            addButton
        });
    }
    onAdd = () => {
        this.children.modal = new NewChatModal({
            newProps: 'newProps',
            onClose: (e?: Event) => {
                if (!e) {
                    this.children.modal = [];
                    return;
                }
                const formEl = (e.target as HTMLElement)?.closest('#addForm');
                if (formEl) return;
                this.children.modal = [];
            }
        });
    };

    render() {
        return this.compile(template, {
            ...this.props,
            addButton: this.children.addButton,
            modal: this.children.modal
        });
    }
}
