import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store, { StoreEvents } from '@shared/stores/Store.ts';
import { IUser } from '@shared/types.ts';
import { setError } from '@components/Toaster';

export enum CHAT_ROUTES {
    chats = 'chats?',
    chatsUsers = 'chats/users/',
    chatToken = 'chats/token/',
    avatar = 'chats/avatar/'
}

class ChatAPIClass extends BaseAPI {
    _socket: WebSocket | null = null;

    getChats(title: string = '') {
        api.get(CHAT_ROUTES.chats, {
            ...(title && { data: { title } }),
            onError: setError
        }).then(data => {
            store.set('chatsPreview', data);
        });
    }

    deleteChatUsers = ({ users, id }: { users: number[]; id: number }) => {
        return api.delete(CHAT_ROUTES.chatsUsers, {
            data: JSON.stringify({ users, chatId: id }),
            onError: setError
        });
    };

    updateChat = ({
        users,
        avatar,
        id
    }: {
        users: number[];
        avatar?: FormData;
        id: number;
    }) => {
        const addUsersData = {
            users,
            chatId: id
        };
        return api
            .put(CHAT_ROUTES.chatsUsers, {
                data: JSON.stringify(addUsersData),
                onError: setError
            })
            .then(() => {
                if (avatar) {
                    avatar.append('chatId', id.toString());
                    api.put(CHAT_ROUTES.avatar, {
                        data: avatar,
                        onError: setError,
                        headers: {}
                    }).then(() => {
                        store.emit(StoreEvents.chatsUpdated);
                    });
                } else {
                    store.emit(StoreEvents.chatsUpdated);
                }
            });
    };

    createNewChat({
        title,
        users,
        avatar
    }: {
        title: string;
        users: number[];
        avatar: FormData;
    }) {
        return api
            .post(CHAT_ROUTES.chats, {
                data: JSON.stringify({
                    title
                }),
                onError: setError
            })
            .then(data => {
                const id = (data as { id: number }).id;

                this.updateChat({ users, avatar, id });
            });
    }

    getOldMessages = async (id: number) => {
        await this.getToken(id).then(() => {
            this._socket &&
                this._socket.addEventListener('open', () => {
                    store.set('chats.messages', []);
                    store.set('chats.lastMessage', {});
                    this._socket?.send(
                        JSON.stringify({
                            content: '0',
                            type: 'get old'
                        })
                    );
                });
        });
    };

    deleteChat = (id: number) => {
        return api
            .delete(CHAT_ROUTES.chats, {
                data: JSON.stringify({ chatId: id }),
                onError: setError
            })
            .then(() => {
                store.emit(StoreEvents.chatsUpdated);
            });
    };

    getChatUsers = (id: number) => {
        return api.get(`chats/${id}/users/`, { onError: setError });
    };

    sendMessage(content: string) {
        if (this._socket && this._socket.readyState === WebSocket.OPEN)
            this._socket.send(
                JSON.stringify({
                    content,
                    type: 'message'
                })
            );
    }

    openSocket = ({ id, token }: { id: number; token: string }) => {
        const user = store.getState().user as IUser;
        const socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${user?.id}/${id}/${token}`
        );
        this._socket = socket;

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            if (event.type === 'message') {
                try {
                    const res = JSON.parse(event.data);
                    if (Array.isArray(res)) {
                        store.set(`chats.messages`, res);
                    } else {
                        store.set(`chats.lastMessage`, res);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });

        socket.addEventListener('error', event => {
            console.log(
                'Ошибка',
                (event as unknown as { message: string }).message
            );
        });
    };

    async getToken(id: number) {
        const data = await api.post(`${CHAT_ROUTES.chatToken}${id}`, {
            onError: setError
        });
        const { token } = data as { token: string };
        this.openSocket({ id, token });
    }
}

export const chatApi = new ChatAPIClass();
