import { TextButton, Plug, NewChat, ChatList, Input } from '@components';
import arrowRight from '../../static/arrowRight.svg';
import styles from './styles.module.css';
import { template } from './template.ts';
import { Block, EVENTS, IBlock, IPage, PAGES } from '@shared/components';
import { chatApi } from '@api';
import { connect } from '@shared/stores';
import { isEqual } from '@shared/utils';
import store, { StoreEvents } from '@shared/stores/Store.ts';

import { IApiData, IState } from './types.ts';

const arrowIcon = `<span> Профиль
                <img class="${styles.profileButton}" src="${arrowRight}" alt="arrow">
            </span>`;

export class ChatsPageBase extends Block {
    activeChatId: number = -1;

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
        if (this.activeChatId === id) return false;

        chatApi.getToken(id);

        // const activeChat = data.find(item => item.id === id);

        // if (activeChat) {
        //     this.children.activeChat = new Chat({
        //         ...activeChat,
        //         onSend: (value: string) => {
        //             console.log({ message: value });
        //             const currentTime = new Date(Date.now()).toLocaleTimeString(
        //                 'en-US',
        //                 {
        //                     hour: '2-digit',
        //                     minute: '2-digit'
        //                 }
        //             );
        //             const newMessage = {
        //                 message: value,
        //                 time: currentTime,
        //                 id: makeUUID()
        //             };
        //             activeChat.messages.push(newMessage);
        //
        //             (this.children.activeChat as unknown as Chat).setProps({
        //                 messages: activeChat.messages
        //             });
        //         }
        //     }) as unknown as IBlock;
        //     this.activeChatId = id;
        //     this.emit(EVENTS.FLOW_CDU);
        // }
        return false;
    }

    componentDidUpdate(oldProps: IState, newProps: IState) {
        if (!isEqual(oldProps, newProps)) {
            (this.children.chatsList as IBlock).setProps({
                chatsData: newProps.chats
            });

            return true;
        }
        return false;
    }

    render() {
        return this.compile(template, { ...this.children });
    }
}
const withStore = connect(state => ({
    chats: (state?.chats as IApiData)?.data
}));
export const ChatsPage = withStore(ChatsPageBase);
