import { BaseAPI } from './BaseApi.ts';
import { api } from './HTTPTransport.ts';

import store, { StoreEvents } from '@shared/stores/Store.ts';
import { ROUTES } from '@api/routes.ts';
import { user } from '@shared/stores/User.ts';

export enum CHAT_ROUTES {
    chats = 'chats/',
    addUsers = 'chats/users/'
}

export enum CHAT_PATHS {
    chats = 'chats.preview.data',
    activeChat = 'chats.activeChat.data'
}

class ChatAPIClass extends BaseAPI {
    getChats(title: string = '') {
        api.get(CHAT_ROUTES.chats, { ...(title && { data: { title } }) }).then(
            data => {
                store.set('chats.preview.data', data);
            }
        );
    }

    createNewChat({
        title,
        users,
        onClose
    }: {
        title: string;
        users: number[];
        onClose?: TVoid;
    }) {
        api.post(CHAT_ROUTES.chats, {
            data: JSON.stringify({
                title
            })
        }).then(data => {
            const addUsersData = {
                users,
                chatId: (data as { id: number }).id
            };
            api.put(CHAT_ROUTES.addUsers, {
                data: JSON.stringify(addUsersData)
            }).then(() => {
                // store.set('chats.data', data);
                store.emit(StoreEvents.chatsUpdated);
                // eventEmitter.emit(GLOBAL_EVENTS.chatsUpdate);
                console.log(onClose);
                onClose && onClose();
            });
        });
    }

    getToken(id: number) {
        api.post(`${ROUTES.chatToken}${id}`).then(data => {
            const { token } = data as { token: string };
            const socket = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${user?.data?.id}/${id}/${token}`
            );
            socket.addEventListener('open', () => {
                console.log('Соединение установлено');

                // socket.send(
                //     JSON.stringify({
                //         content: 'Моё первое сообщение миру!',
                //         type: 'message'
                //     })
                // );

                socket.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old'
                    })
                );
            });

            socket.addEventListener('close', event => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            socket.addEventListener('message', event => {
                console.log('Получены данные', event);
                try {
                    const res = JSON.parse(event.data);
                    if (Array.isArray(res)) {
                        store.set('chats.messages', res);
                        console.log({ res, store });
                    } else {
                        store.set('chats.lastMessage', res);
                    }
                } catch {
                    // store.set('chats.messages', event.data);
                }
            });

            socket.addEventListener('error', event => {
                console.log(
                    'Ошибка',
                    (event as unknown as { message: string }).message
                );
            });
        });
    }

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return api.get('/full');
    }
}

export const chatApi = new ChatAPIClass();
