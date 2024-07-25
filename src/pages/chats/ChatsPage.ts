import {
    Block,
    Chat,
    ChatPreview,
    EVENTS,
    IBlock,
    TextButton
} from '../../components';
import arrowRight from '../../static/arrowRight.svg';
import { data } from './data.ts';
import { Plug } from '../../components';
import styles from './styles.module.css';
import { template } from './template.ts';
import { PAGES, IPage } from '../../shared';

export class ChatsPage extends Block {
    activeChatId: string = '';

    constructor({ history }: IPage) {
        const plug = new Plug({
            label: 'Выберите чат, чтобы отправить сообщение'
        });

        const profileButton = new TextButton({
            children: `<span> Профиль
                <img class="${styles.profileButton}" src="${arrowRight}" alt="arrow">
            </span>`,
            type: 'gray',
            onClick: () => {
                history.emit('push', PAGES.profile);
            }
        });

        const chats = data.map(item => {
            return new ChatPreview({
                ...item,
                ...item.messages[0],
                events: {
                    click: () => {
                        onChatClick(item.id);
                    }
                }
            });
        });

        super('div', { activeChat: plug, chats, profileButton });
        this.escapeEvent();
        const onChatClick = (id: string) => {
            this._onChatClick(id);
        };
    }

    escapeEvent() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.children.activeChat = new Plug({
                    label: 'Выберите чат, чтобы отправить сообщение'
                }) as unknown as IBlock;
                this.emit(EVENTS.FLOW_CDU);
            }
        });
    }

    _onChatClick(id: string) {
        if (this.activeChatId === id) return false;
        const activeChat = data.find(item => item.id === id);

        if (activeChat) {
            this.children.activeChat = new Chat({
                ...activeChat
            }) as unknown as IBlock;
            this.activeChatId = id;
            this.emit(EVENTS.FLOW_CDU);
        }
        return false;
    }

    componentDidUpdate(): boolean {
        return true;
    }

    render() {
        return this.compile(template, { ...this.children });
    }
}
