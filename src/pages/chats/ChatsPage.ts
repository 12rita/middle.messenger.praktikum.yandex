import { TextButton, Plug, NewChat, ChatList, Input, Chat } from '@components';
import arrowRight from '../../static/arrowRight.svg';
import styles from './styles.module.css';
import { template } from './template.ts';
import { Block, EVENTS, IBlock, IPage, PAGES } from '@shared/components';
import { chatApi } from '@api';
import { connect } from '@shared/stores';
import { isEqual } from '@shared/utils';
import store, { StoreEvents } from '@shared/stores/Store.ts';

import { IState } from './types.ts';
import { IChatPreview } from '@shared/types.ts';

const arrowIcon = `<span> Профиль
                <img class="${styles.profileButton}" src="${arrowRight}" alt="arrow">
            </span>`;

export class ChatsPageBase extends Block {
    activeChatId: number = -1;
    chats: IChatPreview[] = [];

    constructor({ history }: IPage) {
        const plug = new Plug({
            label: 'Выберите чат, чтобы отправить сообщение'
        });

        const input = new Input({
            type: 'text',
            name: 'search',
            className: styles.search,
            placeholder: '🔍 Поиск',
            onChange: e => {
                this.onSearch(e);
            }
        });

        const newChat = new NewChat({});

        const profileButton = new TextButton({
            children: arrowIcon,
            type: 'gray',
            onClick: () => {
                history && history.go(PAGES.profile);
            }
        });

        const chatsList = new ChatList({
            chatsData: [],
            onChatClick: id => {
                this._onChatClick(id);
            }
        });

        super('div', {
            activeChat: plug,
            input,
            chatsList,
            profileButton,
            newChat
        });
        this.escapeEvent();

        store.on(StoreEvents.chatsUpdated, this.init.bind(this));
        this.init();
    }

    onSearch = (e: Event) => {
        setTimeout(() => {
            chatApi.getChats((e.target as HTMLInputElement)?.value);
        }, 300); //debounce
    };

    init = () => {
        chatApi.getChats();
    };

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

    _onChatClick(id: number) {
        if (this.activeChatId === id) return;

        const activeChat = this.chats.find(item => item.id === id);

        if (activeChat) {
            this.setProps({
                activeChat: new Chat({
                    messages: [],
                    ...activeChat
                }) as unknown as IBlock
            });
        }
    }

    componentDidUpdate(
        oldProps: { chats: IChatPreview[] },
        newProps: { chats: IChatPreview[] }
    ) {
        if (!isEqual(oldProps?.chats, newProps?.chats)) {
            (this.children.chatsList as IBlock).setProps({
                chatsData: newProps.chats
            });
            this.chats = newProps.chats;

            return true;
        }
        if (
            !isEqual(
                (this.children.activeChat as unknown as Chat).props.id,
                this.activeChatId
            )
        ) {
            this.activeChatId = (
                this.children.activeChat as unknown as Chat
            ).props.id;
            return true;
        }
        return false;
    }

    render() {
        return this.compile(template, { ...this.children });
    }
}
const withStore = connect(state => ({
    chats: (state as unknown as IState)?.chatsPreview
}));
export const ChatsPage = withStore(ChatsPageBase);
