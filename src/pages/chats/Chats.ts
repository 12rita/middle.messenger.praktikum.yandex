import { chatPreview } from '../../shared';

import { data } from './data.ts';
import { plug } from '../../shared';
import { chat } from '../../shared';

document.addEventListener('DOMContentLoaded', () => {
    const chatField = document.querySelector('#chatField');
    const chatList = document.querySelector('#chatList');

    if (chatField) chatField.innerHTML = plug({});

    if (chatList) {
        data.map(item => {
            chatList.innerHTML += chatPreview({
                ...item
            });
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && chatField) chatField.innerHTML = plug({});
    });

    const chats = document.querySelectorAll(`[id^="chat-"]`);

    const handleChatClick = (id: string) => {
        const activeChat = data.find(item => item.id === id);
        if (chatField) chatField.innerHTML = chat({ ...activeChat });
    };

    chats.forEach(item => {
        item.addEventListener('click', () => {
            const [, id] = item.id.split('-');
            handleChatClick(id);
        });
    });
});
