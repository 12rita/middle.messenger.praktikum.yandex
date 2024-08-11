import { IChatListProps } from './types.ts';

import { template } from './template.ts';
import styles from './styles.module.css';
import { Block, IBlock } from '@shared/components';
import { ChatPreview } from '@components';
import { isEqual } from '@shared/utils';

export class ChatList extends Block<IChatListProps> {
    constructor(props: IChatListProps) {
        const chats =
            props.chatsData.map(item => {
                return new ChatPreview({
                    ...item,
                    events: {
                        click: () => {
                            props.onChatClick(item.id);
                        }
                    }
                }) as unknown as IBlock;
            }) ?? [];
        super('ul', { ...props, chats, className: styles.chatList });
    }

    componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps) {
        // console.log(oldProps, newProps);
        if (!isEqual(oldProps.chatsData, newProps.chatsData)) {
            this.children.chats =
                newProps.chatsData.map(item => {
                    return new ChatPreview({
                        ...item,
                        events: {
                            click: () => {
                                this.props.onChatClick(item.id);
                            }
                        }
                    }) as unknown as IBlock;
                }) ?? [];
            return true;
        }
        return false;
    }

    render() {
        return this.compile(template, {
            ...this.props,
            chats: this.children.chats
        });
    }
}
