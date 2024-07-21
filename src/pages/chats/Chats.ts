import { chatPreview } from '../../components';

import { data } from './data.ts';
import { Plug } from '../../components';
import { chat } from '../../components';

document.addEventListener('DOMContentLoaded', () => {
    const chatField = document.querySelector('#chatField');
    const chatList = document.querySelector('#chatList');
    const plug = new Plug({});
    if (chatField) chatField.innerHTML = plug.render()({});

    if (chatList) {
        data.map(item => {
            chatList.innerHTML += chatPreview({
                ...item
            });
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && chatField)
            chatField.innerHTML = plug.render()({});
    });

    const chats = document.querySelectorAll(`[id^="chat-"]`);

    const handleChatClick = (id: string) => {
        const activeChat = data.find(item => item.id === id);
        if (chatField && activeChat)
            chatField.innerHTML = chat({ ...activeChat });
    };

    chats.forEach(item => {
        item.addEventListener('click', () => {
            const [, id] = item.id.split('-');
            handleChatClick(id);
        });
    });
});
